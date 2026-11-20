import { PALETTE } from "@/components/three/palette.ts";

/** Shapes the 3D toolkit can render for a skill. */
export type SkillShape =
  | "bag"
  | "disc"
  | "code"
  | "atom"
  | "gear"
  | "cube"
  | "database"
  | "hash"
  | "gem"
  | "knot"
  | "bolt"
  | "browser"
  | "branch"
  | "ring";

export type Skill = {
  name: string;
  summary: string;
  shape: SkillShape;
  color: string;
};

export type SkillCategory = {
  id: "shopify" | "wordpress" | "frontend" | "backend";
  label: string;
  tagline: string;
  color: string;
  skills: Skill[];
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "shopify",
    label: "Shopify Development",
    tagline: "Storefronts, themes and eCommerce workflows.",
    color: PALETTE.shopify,
    skills: [
      { name: "Shopify", shape: "bag", color: PALETTE.shopify, summary: "Building, customizing and maintaining Shopify stores from the theme layer up." },
      { name: "Shopify Plus", shape: "gem", color: "#5e8e3e", summary: "Working within Shopify Plus stores and their extended checkout and automation features." },
      { name: "Liquid", shape: "ring", color: PALETTE.cyan, summary: "Writing Liquid templates, sections and snippets to render dynamic storefront content." },
      { name: "Shopify CLI", shape: "code", color: PALETTE.shopify, summary: "Running local theme development, previews and deployments from the command line." },
      { name: "Online Store 2.0", shape: "browser", color: PALETTE.shopify, summary: "Creating JSON templates and reusable sections that merchants can edit in the theme editor." },
      { name: "Metafields", shape: "database", color: PALETTE.violet, summary: "Storing and displaying custom product, collection and page data beyond the defaults." },
      { name: "Metaobjects", shape: "cube", color: PALETTE.violet, summary: "Modeling structured custom content types that merchants can manage themselves." },
      { name: "Theme App Extensions", shape: "branch", color: PALETTE.blue, summary: "Integrating app blocks into themes so features plug in without editing theme code." },
      { name: "AJAX Cart", shape: "bag", color: PALETTE.pink, summary: "Building slide-out and inline carts that update instantly without page reloads." },
      { name: "Shopify APIs", shape: "gear", color: PALETTE.shopify, summary: "Connecting storefronts and tools to Shopify data through its Storefront and Admin APIs." },
      { name: "Klaviyo", shape: "knot", color: PALETTE.yellow, summary: "Integrating email and SMS sign-up forms and tracking with Shopify stores." },
      { name: "Shopify Flow", shape: "branch", color: PALETTE.cyan, summary: "Setting up automated store workflows for tagging, notifications and operations." },
      { name: "Conversion Rate Optimization", shape: "bolt", color: PALETTE.yellow, summary: "Refining layouts, product pages and carts to make buying smoother for shoppers." },
    ],
  },
  {
    id: "wordpress",
    label: "WordPress Development",
    tagline: "Custom themes, plugins and content-driven sites.",
    color: PALETTE.wordpress,
    skills: [
      { name: "WordPress", shape: "disc", color: PALETTE.wordpress, summary: "Building and maintaining WordPress websites tailored to each business." },
      { name: "PHP", shape: "gem", color: "#7a86b8", summary: "Writing the PHP behind custom themes, plugins and site functionality." },
      { name: "WooCommerce", shape: "bag", color: "#7f54b3", summary: "Setting up and customizing WooCommerce stores, templates and checkout flows." },
      { name: "Custom Themes", shape: "browser", color: PALETTE.wordpress, summary: "Developing themes from scratch that match a design exactly and stay easy to edit." },
      { name: "Custom Plugins", shape: "gear", color: PALETTE.violet, summary: "Packaging site-specific features into maintainable, self-contained plugins." },
      { name: "Custom Post Types", shape: "database", color: PALETTE.blue, summary: "Structuring content like listings or team members with their own types and fields." },
      { name: "WordPress REST API", shape: "branch", color: PALETTE.cyan, summary: "Exposing and consuming WordPress content for headless and integrated setups." },
      { name: "Gutenberg", shape: "cube", color: PALETTE.wordpress, summary: "Building block-based layouts and custom blocks for the WordPress editor." },
      { name: "Elementor", shape: "ring", color: PALETTE.pink, summary: "Creating and customizing page layouts and widgets with Elementor." },
      { name: "Divi", shape: "knot", color: PALETTE.violet, summary: "Building and extending Divi-powered sites and modules." },
    ],
  },
  {
    id: "frontend",
    label: "Front-End Development",
    tagline: "Interfaces, interactions and animation.",
    color: PALETTE.purple,
    skills: [
      { name: "HTML5", shape: "code", color: "#e8673c", summary: "Writing semantic, accessible markup as the foundation of every interface." },
      { name: "CSS3", shape: "hash", color: PALETTE.blue, summary: "Crafting responsive layouts, styles and transitions that work across browsers." },
      { name: "JavaScript", shape: "cube", color: PALETTE.yellow, summary: "Adding interactivity, dynamic content and logic to websites and apps." },
      { name: "TypeScript", shape: "cube", color: "#3178c6", summary: "Adding types to JavaScript for safer, more maintainable codebases." },
      { name: "React.js", shape: "atom", color: PALETTE.cyan, summary: "Building component-based user interfaces and web applications." },
      { name: "Next.js", shape: "browser", color: PALETTE.frame, summary: "Building React applications with routing and server rendering." },
      { name: "Tailwind CSS", shape: "knot", color: PALETTE.cyan, summary: "Styling interfaces quickly and consistently with utility classes." },
      { name: "GSAP", shape: "bolt", color: PALETTE.shopify, summary: "Creating timeline-based, scroll-driven and high-performance animations." },
      { name: "Framer Motion", shape: "ring", color: PALETTE.pink, summary: "Adding smooth component transitions and micro-interactions in React." },
    ],
  },
  {
    id: "backend",
    label: "Back-End and Tools",
    tagline: "The services and tools behind the build.",
    color: PALETTE.cyan,
    skills: [
      { name: "Node.js", shape: "gem", color: PALETTE.node, summary: "Running JavaScript on the server for tooling, scripts and APIs." },
      { name: "Supabase", shape: "database", color: "#3ecf8e", summary: "Using a hosted database with auth and APIs to power web applications." },
      { name: "REST APIs", shape: "gear", color: PALETTE.blue, summary: "Connecting front ends to third-party services and custom back ends." },
      { name: "Git", shape: "branch", color: "#f05032", summary: "Versioning code, branching features and keeping work organized." },
      { name: "GitHub", shape: "branch", color: PALETTE.violet, summary: "Hosting repositories, reviewing changes and collaborating with teams." },
      { name: "Figma", shape: "knot", color: "#a259ff", summary: "Reading designs and specs to turn them into pixel-accurate code." },
      { name: "VS Code", shape: "code", color: "#2f80ed", summary: "My everyday editor for writing and debugging code." },
      { name: "Cursor", shape: "code", color: PALETTE.purple, summary: "An AI-assisted editor I use to speed up development workflows." },
      { name: "Vite", shape: "bolt", color: PALETTE.violet, summary: "Fast local development and builds for modern front-end projects." },
    ],
  },
];
