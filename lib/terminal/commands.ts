import { getNode, resolveFsPath, toDisplayPath } from "@/lib/fs/helpers";
import { pathToRoute } from "@/lib/fs/routes";
import { getProject, projects } from "@/lib/data/projects";
import { shortBio } from "@/lib/data/about";
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
            "Tip: press Tab to autocomplete, Up/Down to browse history.",
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
    const lines = node.children
      .slice()
      .sort((a, b) => a.name.localeCompare(b.name))
      .map((c) => (c.type === "dir" ? `${c.name}/` : c.name));
    return { blocks: [{ kind: "text", lines: lines.length ? lines : ["(empty)"] }] };
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
    return { blocks: [muted(`${node.name} is a binary file. Use \`resume\` to open it.`)] };
  },
};

const whoami: CommandDef = {
  usage: "whoami",
  description: "print a short bio",
  run: () => ({ blocks: [{ kind: "text", lines: shortBio.split("\n") }] }),
};

const open: CommandDef = {
  usage: "open <project-name>",
  description: "jump straight to a project's case study",
  run: ({ args }) => {
    if (!args[0]) return errorOutcome("open: missing project name", "Usage: open <project-name>");
    const project = getProject(args[0]);
    if (!project) {
      return errorOutcome(
        `open: no such project: ${args[0]}`,
        `Try one of: ${projects.map((p) => p.slug).join(", ")}`
      );
    }
    return {
      blocks: [muted(`→ opened /projects/${project.slug}`)],
      cwd: `/projects/${project.slug}`,
      route: `/projects/${project.slug}`,
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

const sudo: CommandDef = {
  usage: "sudo <command>",
  description: "",
  hidden: true,
  run: ({ args }) => {
    if (args.join(" ") === "make-coffee") {
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
          "To exit: press Esc, then type :wq and hit Enter.",
          "(This has been the source of countless legends. You're welcome.)",
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

export const commands: Record<string, CommandDef> = {
  help,
  ls,
  cd,
  pwd,
  cat,
  whoami,
  open,
  resume,
  contact,
  clear,
  sudo,
  vim,
  rm,
};

export function visibleCommandNames(): string[] {
  return Object.keys(commands).filter((name) => !commands[name].hidden);
}

export function runCommand(raw: string, cwd: string): CommandOutcome {
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

  const ctx: CommandContext = { cwd, args, raw: trimmed };
  return def.run(ctx);
}
