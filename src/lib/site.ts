import type { RoutePath } from "@/router.tsx";

type Site = {
  name: string;
  tagline: string;
  nav: Array<{ label: string; to: RoutePath }>;
};

/** Site name and tagline, used for the page title and description. */
export const site: Site = {
  name: "Alfe Caesar Lagas | Senior Front-End Developer",
  tagline:
    "Senior Front-End Developer specializing in Shopify, WordPress, and web application development. Turning ideas into beautiful, functional, and scalable digital experiences.",
  nav: [{ label: "Home", to: "/" }],
};
