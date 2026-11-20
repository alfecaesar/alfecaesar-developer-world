import { GithubIcon, GlobeIcon, LinkedinIcon } from "@/components/brand-icons.tsx";
import { PROFILE } from "@/lib/profile.ts";

const LINKS = [
  { label: "Portfolio", href: PROFILE.links.portfolio, Icon: GlobeIcon },
  { label: "GitHub", href: PROFILE.links.github, Icon: GithubIcon },
  { label: "LinkedIn", href: PROFILE.links.linkedin, Icon: LinkedinIcon },
];

export default function SiteFooter() {
  return (
    <footer className="border-t px-5 py-10 md:px-8">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>
          &copy; {new Date().getFullYear()} {PROFILE.name}
        </p>
        <ul className="flex items-center gap-2">
          {LINKS.map(({ label, href, Icon }) => (
            <li key={label}>
              <a
                href={href}
                target="_blank"
                rel="noreferrer noopener"
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full transition-colors hover:bg-muted hover:text-foreground cursor-pointer"
              >
                <Icon className="size-5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  );
}
