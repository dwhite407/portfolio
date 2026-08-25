# Portfolio — living codebase / terminal

A portfolio site styled as a fake, typeable filesystem. Explore it by typing commands
(`ls`, `cd projects`, `cat about.md`, `open blokus-board-game`, ...) in the built-in terminal,
or use the persistent sidebar nav — both stay in sync with the URL.

This project was hand-authored (Node.js wasn't available in the environment that
generated it), so dependencies have **not** been installed and the dev server has
**not** been run or verified yet. Do that first:

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

## Where to edit content

Everything the terminal and pages show comes from plain TypeScript data — no CMS,
no real filesystem access:

- `lib/data/projects.ts` — the 3 placeholder projects (problem/constraints/decisions/
  retrospective/stack). This is the single source of truth for both the fake
  `projects/<slug>/README.md` + `stack.json` files and the real `/projects/<slug>` pages.
- `lib/data/about.ts` — `whoami` bio + the longer `about.md` markdown.
- `lib/data/skills.ts` — `skills.json` content (grouped badges).
- `lib/data/contact.ts` — `contact.md` content + links.
- `public/resume.pdf` — replace with your real resume (the placeholder is a minimal
  valid PDF so the file works end-to-end before you swap it).

## How it's organized

```
lib/fs/          fake filesystem: types, tree builder, path resolution, route mapping
lib/data/         the actual editable content (projects, about, skills, contact)
lib/terminal/     command registry + dispatcher, tokenizer, tab-completion
components/terminal/   the Terminal UI (input, history, output rendering)
components/layout/      Sidebar nav + AppShell (sidebar + content + terminal)
components/renderers/   MarkdownPanel, badge lists, project cards, case study, contact card
app/              real Next.js routes: /, /projects, /projects/[slug], /about, /contact, /resume
```

### Command → route mapping

The terminal and the sidebar drive the same URLs:

| Terminal command         | Route                | Notes |
|---------------------------|-----------------------|-------|
| `cd projects`              | `/projects`           | directory listing |
| `open <slug>` / `cd projects/<slug>` | `/projects/<slug>` | case study |
| `cat about.md`              | `/about`               | |
| `contact`                   | `/contact`             | |
| `resume`                     | `/resume.pdf` (new tab) | `/resume` also exists and redirects, for crawlers/deep links |
| `cat skills.json`, `cat projects/<slug>/stack.json` | *(none — renders inline in the terminal as badges)* | |

`ls`, `pwd`, `whoami`, `help`, `clear` never navigate — they print directly in the terminal.

Extending the command set: add an entry to the `commands` registry in
`lib/terminal/commands.ts` (it's a plain lookup table keyed by the first token —
no shell grammar to fight). A couple of hidden easter eggs are already in there.

## Dependencies

Next.js, TypeScript, Tailwind CSS, plus `react-markdown` + `remark-gfm` for rendering
markdown content. Nothing else — badges/cards are hand-built with Tailwind rather than
pulling in extra UI libraries.
