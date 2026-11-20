import { GithubLogoIcon, GlobeIcon as PhGlobe, LinkedinLogoIcon } from "@phosphor-icons/react/ssr";

type IconProps = { className?: string };

// Brand logos come from Phosphor because lucide has no brand icons.
export function GithubIcon({ className }: IconProps) {
  return <GithubLogoIcon className={className} weight="fill" aria-hidden />;
}

export function LinkedinIcon({ className }: IconProps) {
  return <LinkedinLogoIcon className={className} weight="fill" aria-hidden />;
}

export function GlobeIcon({ className }: IconProps) {
  return <PhGlobe className={className} weight="bold" aria-hidden />;
}
