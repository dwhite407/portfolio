export interface ContactLink {
  label: string;
  href: string;
  kind: "email" | "github" | "linkedin" | "site" | "other";
}

export const contact = {
  intro: "Based in Indianapolis, IN. Best way to reach me is email — I'm also on GitHub and LinkedIn.",
  links: [
    { label: "Email", href: "mailto:drew.white087@outlook.com", kind: "email" },
    { label: "GitHub", href: "https://github.com/dwhite407", kind: "github" },
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/drew-white1/",
      kind: "linkedin",
    },
    { label: "Website", href: "https://drew-white.site", kind: "site" },
  ] satisfies ContactLink[],
};

export function contactMarkdown(): string {
  const lines = contact.links.map((l) => `- **${l.label}:** ${l.href}`);
  return `# Contact

${contact.intro}

${lines.join("\n")}
`;
}
