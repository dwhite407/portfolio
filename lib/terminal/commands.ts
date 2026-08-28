import { getNode, resolveFsPath, toDisplayPath } from "@/lib/fs/helpers";
import { pathToRoute } from "@/lib/fs/routes";
import { getProject, projects } from "@/lib/data/projects";
import { shortBio } from "@/lib/data/about";
import { profile } from "@/lib/data/profile";
import type { SkillGroup } from "@/lib/data/skills";
import { tokenize } from "./parser";
import type { CommandContext, CommandDef, CommandOutcome, OutputBlock } from "./types";

function errorOutcome(...lines: string[]): CommandOutcome {
  return { blocks: [{ kind: "text", lines, tone: "error" }] };
}

function muted(...lines: string[]): OutputBlock {
  return { kind: "text", lines, tone: "muted" };
}

const help: CommandDef = {
  usage: "help",
  description: "list available commands",
  run: () => {
    const width = Math.max(...visibleCommandNames().map((n) => n.length));
    const lines = visibleCommandNames().map((name) => {
      const def = commands[name];
      return `  ${name.padEnd(width + 2)}${def.description}`;
    });
    return {
      blocks: [
        {
          kind: "text",
          lines: [
            "Available commands:",
            ...lines,
            "",
            "Tip: press Tab to autocomplete, Up/Down to browse history, `man <cmd>` for details.",
          ],
        },
      ],
    };
  },
};

const man: CommandDef = {
  usage: "man <command>",
  description: "show detailed usage for a command",
  run: ({ args }) => {
    if (!args[0]) return errorOutcome("man: missing command name", "Usage: man <command>");
    const key = args[0].toLowerCase();
    const def = commands[key];
    if (!def) return errorOutcome(`man: no manual entry for ${args[0]}`);
    return {
      blocks: [
        {
          kind: "text",
          lines: [
            "NAME",
            `    ${key} — ${def.description || "no description available"}`,
            "",
            "USAGE",
            `    ${def.usage}`,
          ],
        },
      ],
    };
  },
};

const ls: CommandDef = {
  usage: "ls [path]",
  description: "list a directory's contents",
  run: ({ cwd, args }) => {
    const target = args[0] ? resolveFsPath(cwd, args[0]) : cwd;
    const node = getNode(target);
    if (!node) return errorOutcome(`ls: cannot access '${args[0]}': No such file or directory`);
    if (node.type === "file") return { blocks: [{ kind: "text", lines: [node.name] }] };
    const entries = node.children
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => ({
        name: c.type === "dir" ? `${c.name}/` : c.name,
        route: pathToRoute(c.path),
        isDir: c.type === "dir",
      }));
    if (entries.length === 0) return { blocks: [{ kind: "text", lines: ["(empty)"] }] };
    return { blocks: [{ kind: "listing", entries }] };
  },
};

const cd: CommandDef = {
  usage: "cd [path]",
  description: "change the current directory",
  run: ({ cwd, args }) => {
    const target = args[0] ? resolveFsPath(cwd, args[0]) : "/";
    const node = getNode(target);
    if (!node) return errorOutcome(`cd: no such file or directory: ${args[0]}`);
    if (node.type !== "dir") {
      const hint =
        node.name === "resume.pdf"
          ? "It's a file — try `resume` to open it, or click it in the explorer."
          : node.path === "/contact.md"
          ? "It's a file — try `contact`, or click it in the explorer."
          : `It's a file — try \`cat ${node.name}\`, or click it in the explorer.`;
      return errorOutcome(`cd: not a directory: ${args[0]}`, hint);
    }
    const route = pathToRoute(target);
    return { blocks: [], cwd: target, route: route ?? undefined };
  },
};

const pwd: CommandDef = {
  usage: "pwd",
  description: "print the current directory",
  run: ({ cwd }) => ({ blocks: [{ kind: "text", lines: [toDisplayPath(cwd)] }] }),
};

const cat: CommandDef = {
  usage: "cat <file>",
  description: "print a file (rendered nicely for markdown/json)",
  run: ({ cwd, args }) => {
    if (!args[0]) return errorOutcome("cat: missing file operand", "Usage: cat <file>");
    const target = resolveFsPath(cwd, args[0]);
    const node = getNode(target);
    if (!node) return errorOutcome(`cat: ${args[0]}: No such file or directory`);
    if (node.type === "dir") return errorOutcome(`cat: ${args[0]}: Is a directory`);

    const { content } = node;
    if (content.kind === "markdown") {
      const route = pathToRoute(node.path);
      return route
        ? { blocks: [muted(`→ opened ${route}`)], route }
        : { blocks: [{ kind: "markdown", body: content.body }] };
    }
    if (content.kind === "json") {
      return { blocks: [{ kind: "skill-badges", groups: content.data as SkillGroup[] }] };
    }
    if (content.kind === "code") {
      const route = pathToRoute(node.path);
      return route
        ? { blocks: [muted(`→ opened ${route}`)], route }
        : { blocks: [{ kind: "code", language: content.language, body: JSON.stringify(content.data, null, 2) }] };
    }
    if (content.kind === "architecture") {
      const route = pathToRoute(node.path);
      return route
        ? { blocks: [muted(`→ opened ${route}`)], route }
        : { blocks: [{ kind: "architecture", steps: content.steps, connections: content.connections }] };
    }
    if (content.kind === "image") {
      const route = pathToRoute(node.path);
      return route
        ? { blocks: [muted(`→ opened ${route}`)], route }
        : { blocks: [muted(`${node.name}: ${content.caption} (placeholder — no real image yet)`)] };
    }
    return { blocks: [muted(`${node.name} is a binary file. Use \`resume\` to open it.`)] };
  },
};

const whoami: CommandDef = {
  usage: "whoami",
  description: "print a short bio",
  run: () => ({ blocks: [{ kind: "text", lines: shortBio.split("\n") }] }),
};

const open: CommandDef = {
  usage: "open <project-name | path>",
  description: "open a project by name, or any file/folder by path",
  run: ({ cwd, args }) => {
    if (!args[0]) return errorOutcome("open: missing name or path", "Usage: open <project-name | path>");

    // Back-compat convenience: a bare project slug still jumps straight there.
    const project = getProject(args[0]);
    if (project) {
      return {
        blocks: [muted(`→ opened /projects/${project.slug}`)],
        cwd: `/projects/${project.slug}`,
        route: `/projects/${project.slug}`,
      };
    }

    // Generic: resolve any fs path and navigate to whatever page renders it.
    const target = resolveFsPath(cwd, args[0]);
    const node = getNode(target);
    if (!node) {
      return errorOutcome(
        `open: no such file or directory: ${args[0]}`,
        `Try one of: ${projects.map((p) => p.slug).join(", ")}`
      );
    }
    const route = pathToRoute(target);
    if (!route) return errorOutcome(`open: ${args[0]} has no page to open`);
    return {
      blocks: [muted(`→ opened ${route}`)],
      cwd: node.type === "dir" ? target : undefined,
      route,
    };
  },
};

const resume: CommandDef = {
  usage: "resume",
  description: "open resume.pdf",
  run: () => ({
    blocks: [muted("→ opened /resume")],
    route: "/resume",
  }),
};

const contact: CommandDef = {
  usage: "contact",
  description: "show contact info",
  run: () => ({ blocks: [muted("→ opened /contact")], route: "/contact" }),
};

const clear: CommandDef = {
  usage: "clear",
  description: "clear the terminal",
  run: () => ({ blocks: [{ kind: "clear" }] }),
};

const history: CommandDef = {
  usage: "history",
  description: "show previously run commands",
  run: ({ history }) => {
    if (history.length === 0) return { blocks: [muted("No commands yet.")] };
    return { blocks: [{ kind: "text", lines: history.map((cmd, i) => `  ${i + 1}  ${cmd}`) }] };
  },
};

const neofetch: CommandDef = {
  usage: "neofetch",
  description: "show a system + personal info summary",
  run: () => {
    const rows: [string, string][] = [
      ["OS", "PortfolioOS"],
      ["Host", "Next.js 14 (App Router)"],
      ["Kernel", "TypeScript"],
      ["Shell", "drewsh"],
      ["UI", "Tailwind CSS"],
      ["Editor", "VS Code"],
      ["Deploy", "Vercel"],
      ["Role", `${profile.role} @ ${profile.company}`],
      ["Location", profile.location],
      ["Languages", profile.languages.join(", ")],
      ["Coffee", "required"],
    ];
    const width = Math.max(...rows.map(([k]) => k.length));
    return {
      blocks: [
        {
          kind: "text",
          lines: ["drew@portfolio", "-".repeat(15), ...rows.map(([k, v]) => `${k.padEnd(width + 2)}${v}`)],
        },
      ],
    };
  },
};

const sudo: CommandDef = {
  usage: "sudo <command>",
  description: "",
  hidden: true,
  run: ({ args }) => {
    const cmd = args.join(" ");
    if (cmd === "make-coffee") {
      return {
        blocks: [
          {
            kind: "text",
            lines: [
              "Brewing coffee... ☕",
              "[############################] 100%",
              "Coffee is ready. Productivity +100.",
            ],
            tone: "success",
          },
        ],
      };
    }
    if (cmd === "hire drew") {
      return { blocks: [muted("Permission granted. Redirecting to contact...")], route: "/contact" };
    }
    return errorOutcome(
      "sudo: permission denied",
      "You're not in the sudoers file. This incident will be reported (to nobody)."
    );
  },
};

const vim: CommandDef = {
  usage: "vim",
  description: "",
  hidden: true,
  run: () => ({
    blocks: [
      {
        kind: "text",
        lines: [
          '~',
          '~   -- INSERT --',
          '~',
          "Type :q to quit (or :q! if you've \"edited\" anything), :wq to save and quit.",
        ],
      },
    ],
  }),
};

const rm: CommandDef = {
  usage: "rm <file>",
  description: "",
  hidden: true,
  run: ({ args }) => {
    if (args.includes("-rf") && (args.includes("/") || args.includes("~") || args.includes("*"))) {
      return errorOutcome(
        "rm: nice try.",
        "This filesystem is fake, read-only, and mildly indestructible."
      );
    }
    return errorOutcome("rm: permission denied", "Nothing here is actually deletable. Sorry.");
  },
};

const gitEasterEgg: CommandDef = {
  usage: "git <command>",
  description: "",
  hidden: true,
  run: ({ args }) => {
    const cmd = args.join(" ");
    if (cmd === "blame") return { blocks: [muted("Let's not point fingers.")] };
    if (cmd === "log") return { blocks: [muted("Coming soon — real commit history, not fake ones.")] };
    return errorOutcome(
      `git: '${args[0] ?? ""}' is not a git command here.`,
      "This isn't a real git repo — try `git blame`."
    );
  },
};

const touch: CommandDef = {
  usage: "touch <file>",
  description: "",
  hidden: true,
  run: ({ args }) => {
    if (args.join(" ").toLowerCase() === "grass") {
      return {
        blocks: [
          {
            kind: "text",
            lines: ["Opening outside...", "(This terminal cannot actually do that. Please go touch grass responsibly.)"],
            tone: "success",
          },
        ],
      };
    }
    return errorOutcome("touch: nothing here is creatable.", "This filesystem is read-only.");
  },
};

const ping: CommandDef = {
  usage: "ping <host>",
  description: "",
  hidden: true,
  run: ({ args }) => {
    const target = args[0] ?? "";
    if (target.toLowerCase().includes("drew")) {
      return {
        blocks: [
          {
            kind: "text",
            lines: ["drew is online — 0% packet loss", "64 bytes from drew.white: time=<1ms"],
            tone: "success",
          },
        ],
      };
    }
    return errorOutcome(`ping: cannot resolve ${target || "(nothing)"}: this terminal only knows one host.`);
  },
};

const exitCmd: CommandDef = {
  usage: "exit",
  description: "",
  hidden: true,
  run: () => ({ blocks: [muted("You can check out any time you like...")] }),
};

const npmEasterEgg: CommandDef = {
  usage: "npm <command>",
  description: "",
  hidden: true,
  run: ({ args }) => {
    if (args.join(" ") === "install experience") {
      return {
        blocks: [
          { kind: "text", lines: ["Already installed. See `resume`, `about/`, or `me.json`."], tone: "success" },
        ],
      };
    }
    return errorOutcome("npm: this isn't a real package manager, sorry.");
  },
};

export const commands: Record<string, CommandDef> = {
  help,
  man,
  ls,
  cd,
  pwd,
  cat,
  whoami,
  open,
  resume,
  contact,
  clear,
  history,
  neofetch,
  stats: { ...neofetch, hidden: true },
  sudo,
  vim,
  rm,
  git: gitEasterEgg,
  touch,
  ping,
  exit: exitCmd,
  npm: npmEasterEgg,
};

export function visibleCommandNames(): string[] {
  return Object.keys(commands).filter((name) => !commands[name].hidden);
}

export function runCommand(raw: string, cwd: string, history: string[] = []): CommandOutcome {
  const trimmed = raw.trim();
  if (!trimmed) return { blocks: [] };

  const [name, ...args] = tokenize(trimmed);
  const key = name.toLowerCase();
  const def = commands[key];

  if (!def) {
    return errorOutcome(
      `command not found: ${name}`,
      "Type 'help' to see available commands."
    );
  }

  const ctx: CommandContext = { cwd, args, raw: trimmed, history };
  return def.run(ctx);
}
