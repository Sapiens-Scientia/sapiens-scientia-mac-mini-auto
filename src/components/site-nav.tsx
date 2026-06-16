"use client";

import Link from "next/link";
import { useTheme } from "@/lib/use-theme";

type SiteNavLink = {
  href: string;
  label: string;
};

type SiteNavProps = {
  links?: SiteNavLink[];
};

const primaryLinks: SiteNavLink[] = [
  { href: "/", label: "Home" },
  { href: "/scales", label: "Scales" },
  { href: "/chronos", label: "Chronos" },
  { href: "/vitals", label: "Vital Signs" },
  { href: "/platforms", label: "Platforms" },
  { href: "/projects", label: "Projects" },
];

export function SiteNav({ links = primaryLinks }: SiteNavProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav
      aria-label="Primary navigation"
      className="mb-10 flex flex-wrap items-center justify-between gap-x-6 gap-y-2 text-sm font-medium text-slate-300 sm:mb-14"
    >
      <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
        {links.map((link) => (
          <Link
            key={`${link.href}-${link.label}`}
            href={link.href}
            className="transition-colors hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-sky-300"
          >
            {link.label}
          </Link>
        ))}
      </div>

      <button
        onClick={toggleTheme}
        className="theme-toggle-btn pointer-events-auto rounded border border-white/10 bg-white/[0.03] px-3 py-1 text-xs font-semibold tracking-wide text-slate-300 transition-all hover:bg-white/[0.08] hover:text-white cursor-pointer"
        aria-label={`Switch to ${theme === "dark" ? "light" : "dark"} theme`}
      >
        {theme === "dark" ? "☀ Light Mode" : "☾ Dark Mode"}
      </button>
    </nav>
  );
}

