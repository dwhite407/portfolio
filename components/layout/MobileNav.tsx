"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils/cn";

const NAV_ITEMS = [
  { label: "Projects", href: "/projects" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/about/contact" },
];

export function MobileNav() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-term-border bg-term-panel lg:hidden">
      <div className="flex items-center justify-between px-4 py-3">
        <Link
          href="/"
          className="flex items-center gap-2 font-mono text-sm text-term-text hover:text-term-accent"
        >
          <span className="text-term-accent">~</span>
          <span className="font-semibold">portfolio</span>
        </Link>
      </div>

      <ul className="flex flex-wrap gap-1.5 px-4 pb-3">
        {NAV_ITEMS.map((item) => {
          const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                className={cn(
                  "block rounded-full px-3 py-1.5 font-sans text-sm transition-colors",
                  active
                    ? "bg-term-panel2 font-medium text-term-accent"
                    : "text-term-text/80 hover:bg-term-panel2 hover:text-term-text"
                )}
              >
                {item.label}
              </Link>
            </li>
          );
        })}
        <li>
          <Link
            href="/resume"
            className={cn(
              "block rounded-full px-3 py-1.5 font-sans text-sm transition-colors",
              pathname === "/resume"
                ? "bg-term-panel2 font-medium text-term-accent"
                : "text-term-text/80 hover:bg-term-panel2 hover:text-term-text"
            )}
          >
            Resume
          </Link>
        </li>
      </ul>
    </nav>
  );
}
