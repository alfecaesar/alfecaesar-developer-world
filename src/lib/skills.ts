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
      { name: "Shopify", shape: "bag", color: PALETTE.shopify, summary: "Developing, customizing, and optimizing Shopify storefronts through Liquid, custom themes, reusable sections, templates, and third-party integrations." },
      { name: "Shopify Plus", shape: "gem", color: "#5e8e3e", summary: "Working with Shopify Plus stores, implementing advanced checkout capabilities, Shopify Flow automation, and integrations for complex eCommerce operations." },
      { name: "Liquid", shape: "ring", color: PALETTE.cyan, summary: "Developing dynamic storefront experiences using Liquid templates, reusable sections, snippets, and Shopify objects." },
      { name: "Shopify CLI", shape: "code", color: PALETTE.shopify, summary: "Managing local theme development, running development previews, and deploying theme updates using Shopify CLI." },
      { name: "Online Store 2.0", shape: "browser", color: PALETTE.shopify, summary: "Building flexible JSON templates and reusable, configurable sections that merchants can manage through the Shopify theme editor." },
      { name: "Metafields", shape: "database", color: PALETTE.violet, summary: "Extending Shopify's standard data structures with custom fields for products, collections, pages, and other store resources." },
      { name: "Metaobjects", shape: "cube", color: PALETTE.violet, summary: "Creating structured content models and reusable data entries that merchants can manage and display across storefronts." },
      { name: "Theme App Extensions", shape: "branch", color: PALETTE.blue, summary: "Integrating app blocks and theme app extensions to add storefront functionality while keeping theme customizations modular and maintainable." },
      { name: "AJAX Cart", shape: "bag", color: PALETTE.pink, summary: "Implementing dynamic cart interactions, slide-out drawers, and asynchronous cart updates without requiring full-page reloads." },
      { name: "Shopify APIs", shape: "gear", color: PALETTE.shopify, summary: "Integrating Shopify storefronts and external services with the Storefront API and Admin API, using GraphQL queries and mutations to retrieve and manage store data." },
      { name: "Klaviyo", shape: "knot", color: PALETTE.yellow, summary: "Integrating Klaviyo with Shopify for email and SMS sign-up forms, customer data synchronization, and event tracking." },
      { name: "Shopify Flow", shape: "branch", color: PALETTE.cyan, summary: "Automating store operations through workflows for customer and order tagging, notifications, and routine eCommerce processes." },
      { name: "Conversion Rate Optimization", shape: "bolt", color: PALETTE.yellow, summary: "Improving conversion opportunities by refining storefront layouts, product page experiences, navigation, and cart interactions." },
    ],
  },
  {
    id: "wordpress",
    label: "WordPress Development",
    tagline: "Custom themes, plugins and content-driven sites.",
    color: PALETTE.wordpress,
    skills: [
      { name: "WordPress", shape: "disc", color: PALETTE.wordpress, summary: "Developing, customizing, and maintaining WordPress websites using custom themes, plugins, and established page builders." },
      { name: "PHP", shape: "gem", color: "#7a86b8", summary: "Developing custom functionality, theme components, and plugins using PHP and WordPress APIs." },
      { name: "WooCommerce", shape: "bag", color: "#7f54b3", summary: "Customizing WooCommerce stores, product layouts, shopping experiences, and checkout functionality." },
      { name: "Custom Themes", shape: "browser", color: PALETTE.wordpress, summary: "Developing custom WordPress themes that translate design requirements into responsive, maintainable, and easy-to-manage websites." },
      { name: "Custom Plugins", shape: "gear", color: PALETTE.violet, summary: "Building site-specific WordPress plugins to extend functionality while keeping custom features organized and maintainable." },
      { name: "Custom Post Types", shape: "database", color: PALETTE.blue, summary: "Creating structured content types and custom fields for managing content such as listings, team members, and other specialized data." },
      { name: "WordPress REST API", shape: "branch", color: PALETTE.cyan, summary: "Integrating WordPress content and functionality with external applications through REST API endpoints, including headless and mobile app solutions." },
      { name: "Gutenberg", shape: "cube", color: PALETTE.wordpress, summary: "Building flexible, block-based layouts and custom editor blocks for manageable WordPress content experiences." },
      { name: "Elementor", shape: "ring", color: PALETTE.pink, summary: "Creating and customizing responsive page layouts, reusable components, and widgets using Elementor." },
      { name: "Divi", shape: "knot", color: PALETTE.violet, summary: "Building and customizing Divi-powered websites using its visual builder, layouts, and reusable modules." },
    ],
  },
  {
    id: "frontend",
    label: "Front-End Development",
    tagline: "Interfaces, interactions and animation.",
    color: PALETTE.purple,
    skills: [
      { name: "HTML5", shape: "code", color: "#e8673c", summary: "Writing semantic, accessible HTML structures that provide a solid foundation for responsive and well-organized interfaces." },
      { name: "CSS3", shape: "hash", color: PALETTE.blue, summary: "Creating responsive layouts, custom styling, animations, and transitions that deliver consistent experiences across browsers and devices." },
      { name: "JavaScript", shape: "cube", color: PALETTE.yellow, summary: "Developing interactive functionality, dynamic interfaces, and client-side logic for websites and web applications." },
      { name: "TypeScript", shape: "cube", color: "#3178c6", summary: "Writing type-safe JavaScript with structured types and interfaces to improve code reliability and maintainability." },
      { name: "React.js", shape: "atom", color: PALETTE.cyan, summary: "Building reusable components, interactive user interfaces, and scalable front-end applications using React." },
      { name: "Next.js", shape: "browser", color: PALETTE.frame, summary: "Developing React applications with file-based routing, server-side rendering, and modern rendering capabilities." },
      { name: "Tailwind CSS", shape: "knot", color: PALETTE.cyan, summary: "Building consistent, responsive interfaces efficiently using utility-first styling and reusable design patterns." },
      { name: "GSAP", shape: "bolt", color: PALETTE.shopify, summary: "Creating fluid, timeline-based animations, scroll-driven interactions, and high-performance motion effects." },
      { name: "Framer Motion", shape: "ring", color: PALETTE.pink, summary: "Implementing smooth React animations, component transitions, and interactive micro-interactions to enhance user experiences." },
    ],
  },
  {
    id: "backend",
    label: "Back-End and Tools",
    tagline: "The services and tools behind the build.",
    color: PALETTE.cyan,
    skills: [
      { name: "Node.js", shape: "gem", color: PALETTE.node, summary: "Using JavaScript on the server for development tooling, automation scripts, and backend functionality." },
      { name: "Supabase", shape: "database", color: "#3ecf8e", summary: "Integrating hosted databases, authentication, and APIs to support data-driven web applications." },
      { name: "REST APIs", shape: "gear", color: PALETTE.blue, summary: "Connecting front-end applications with external services and custom backends through API integrations." },
      { name: "Git", shape: "branch", color: "#f05032", summary: "Managing source code, branching strategies, commits, and version history throughout development." },
      { name: "GitHub", shape: "branch", color: PALETTE.violet, summary: "Managing code repositories, collaborating through pull requests, and tracking changes across development projects." },
      { name: "Figma", shape: "knot", color: "#a259ff", summary: "Interpreting design systems, layouts, and prototypes to translate visual specifications into accurate, responsive interfaces." },
      { name: "VS Code", shape: "code", color: "#2f80ed", summary: "Writing, debugging, and managing code using extensions, integrated tools, and a customizable development environment." },
      { name: "Cursor", shape: "code", color: PALETTE.purple, summary: "Using AI-assisted coding, codebase understanding, and automated suggestions to streamline development workflows." },
      { name: "Vite", shape: "bolt", color: PALETTE.violet, summary: "Configuring fast development environments, optimized builds, and modern front-end project workflows." },
    ],
  },
];
