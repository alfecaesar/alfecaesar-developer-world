/**
 * Portfolio project data
 *
 * Keep project content here and render it through your portfolio components.
 * Replace the placeholder values with real project details as you add projects.
 */

export type PortfolioCategory =
  | "shopify"
  | "wordpress"
  | "frontend"
  | "web-application"
  | "other";

export type PortfolioLink = {
  label: string;
  url: string;
};

export type PortfolioImage = {
  src: string;
  alt: string;
  caption?: string;
  /** Optional image role for filtering or choosing a display layout. */
  type?: "cover" | "screenshot" | "gallery" | "mobile";
};

export type PortfolioProject = {
  /** Stable identifier used for routing, filtering, and React keys. */
  id: string;
  slug: string;

  /** Main project information. */
  title: string;
  subtitle: string;
  category: PortfolioCategory;
  client: string;
  year: string;
  status: "published" | "in-progress" | "confidential";

  /** Short copy for project cards and listing pages. */
  excerpt: string;

  /** Longer content for the project detail page. */
  overview: string;
  challenge: string;
  solution: string;
  outcome: string;

  /** Your involvement in the project. */
  role: string;
  responsibilities: string[];

  /** Technologies and work delivered. */
  tools: string[];
  services: string[];

  /** Project media. Use local paths or full image URLs. */
  images: {
    cover: PortfolioImage;
    gallery: PortfolioImage[];
  };

  /** External destinations. Leave an empty string when unavailable. */
  links: {
    live: string;
    caseStudy: string;
    repository: string;
    figma: string;
    additional: PortfolioLink[];
  };

  /** Optional metadata useful for filtering and presentation. */
  featured: boolean;
  tags: string[];
};

export const PORTFOLIO_PROJECTS: PortfolioProject[] = [
  {
    id: "project-01",
    slug: "bushwrapz-shopify-store",
    title: "Bushwrapz",
    subtitle: "Shopify Store Revamp & Custom eCommerce Development",
    category: "shopify",
    client: "Bushwrapz",
    year: "2026",
    status: "published",

    excerpt: "",

    overview:
      "Bushwrapz is an Australian retailer specializing in vehicle wraps, automotive accessories, and related products. The project involved revamping and customizing its Shopify storefront to support multiple brands, different product requirements, and a more flexible content management experience.",

    challenge:
      "The storefront needed to accommodate multiple brands with different presentation requirements, product page layouts, and purchasing experiences. The theme also needed to remain manageable through Shopify's theme editor while supporting structured product content and essential third-party integrations.",

    solution:
      "Handled the Shopify theme revamp and store implementation as the primary developer. Customized the existing theme with reusable Liquid sections, snippets, and multi-brand conditional logic. Implemented flexible product page layouts, integrated metafields and metaobjects for structured content, and configured Shopify Flow and Klaviyo workflows to support store operations and customer engagement.",

    outcome:
      "Delivered a customized Shopify storefront with flexible multi-brand presentation, tailored product page experiences, reusable theme components, and integrated eCommerce workflows. Completed cross-device testing and functionality checks to ensure the implemented features worked consistently across the storefront.",

    role: "Shopify Developer",

    responsibilities: [
      "Sole developer responsible for the complete Shopify theme revamp, store setup, and front-end implementation.",
      "Customized the Shopify theme with reusable Liquid sections, snippets, and configurable theme editor settings.",
      "Built multi-brand storefront functionality using custom Liquid conditions and theme settings.",
      "Developed multiple product page layouts and tailored add-to-cart experiences.",
      "Implemented metafields and metaobjects for flexible product and brand content management.",
      "Integrated Shopify Flow and Klaviyo to automate store workflows and customer engagement.",
      "Customized Stockist app listings to align with the storefront's design.",
      "Tested storefront functionality across devices and refined the implementation for a consistent user experience.",
    ],

    tools: [
      "Shopify",
      "Shopify Liquid",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Shopify Metafields",
      "Shopify Metaobjects",
      "Shopify Theme Editor",
      "Shopify Flow",
      "Klaviyo",
      "Stockist App",
    ],

    services: [
      "Shopify Theme Customization",
      "Shopify Store Setup",
      "Multi-Brand Storefront Development",
      "Custom Liquid Development",
      "Custom Product Page Development",
      "Metafields & Metaobjects Integration",
      "Third-Party App Integration",
      "eCommerce Workflow Automation",
      "Cross-Device Testing & QA",
    ],

    images: {
      cover: {
        src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/shopify/bushwrapz.png",
        alt: "Bushwrapz Shopify storefront homepage",
        type: "cover",
      },
      gallery: [
        {
          src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/shopify/bushwrapz-2.png",
          alt: "Bushwrapz homepage and storefront layout",
          caption: "Custom Shopify storefront and homepage experience",
          type: "screenshot",
        },
        {
          src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/shopify/bushwrapz-3.png",
          alt: "Bushwrapz customized product page",
          caption: "Custom product page layouts and purchasing experience",
          type: "screenshot",
        },
        {
          src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/shopify/bushwrapz-4.png",
          alt: "Bushwrapz multi-brand storefront presentation",
          caption: "Multi-brand storefront customization",
          type: "screenshot",
        },
        {
          src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/shopify/bushwrapz-8.png",
          alt: "Bushwrapz mobile storefront experience",
          caption: "Responsive storefront across mobile devices",
          type: "mobile",
        },
        {
          src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/shopify/bushwrapz-9.png",
          alt: "Bushwrapz mobile storefront experience",
          caption: "Responsive storefront across mobile devices",
          type: "mobile",
        },
        {
          src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/shopify/bushwrapz-10.png",
          alt: "Bushwrapz mobile storefront experience",
          caption: "Responsive storefront across mobile devices",
          type: "mobile",
        },
      ],
    },

    links: {
      live: "https://www.bushwrapz.com.au/",
      caseStudy: "",
      repository: "",
      figma: "",
      additional: [],
    },

    featured: true,

    tags: [
      "Shopify",
      "Shopify Plus",
      "eCommerce",
      "Liquid",
      "Multi-Brand",
      "Theme Customization",
      "Metafields",
      "Metaobjects",
      "Klaviyo",
      "Shopify Flow",
    ],
  },

  {
    id: "project-02",
    slug: "ray-of-hope-wordpress-website",
    title: "Ray of Hope",
    subtitle: "Custom WordPress Website Built with Divi",
    category: "wordpress",
    client: "Ray of Hope",
    year: "2023", 
    status: "published",

    excerpt:
      "A full WordPress website built with the Divi page builder, featuring a custom Events post type, Jotform-powered forms and payments, and custom plugins for extended site features.",

    overview:
      "Ray of Hope is a WordPress website built from the ground up with the Divi page builder. The project covered the complete site build, from page layouts and content structure to custom functionality, form handling, and payment integration.",

    challenge:
      "The website needed more than standard pages and posts: a structured way to manage and present events, forms that could also accept payments, and custom features beyond what the page builder offers out of the box. It also had to stay responsive and fast across devices.",

    solution:
      "Built the full website in Divi and created a Custom Post Type for Events so event content could be managed and displayed in a structured way. Integrated Jotform for forms and payment collection, developed custom plugins for site-specific features, and added custom PHP and JavaScript to extend functionality where Divi alone wasn't enough.",

    outcome:
      "Delivered a complete, responsive WordPress website with managed event content, integrated forms and payments, and custom-built features. The site was tested across devices and optimized for performance.",

    role: "WordPress Developer",

    responsibilities: [
      "Built the complete website using the Divi page builder.",
      "Created a Custom Post Type for Events to manage and display event content.",
      "Integrated Jotform for site forms and payment processing.",
      "Developed custom plugins to deliver website-specific features.",
      "Wrote custom PHP and JavaScript to extend site functionality.",
      "Ensured the website is fully responsive across desktop, tablet, and mobile devices.",
      "Optimized the website for performance and a smooth user experience.",
    ],

    tools: [
      "WordPress",
      "Divi Page Builder",
      "PHP",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Custom Post Types",
      "Jotform",
      "Custom WordPress Plugins",
      "SCSS",
    ],

    services: [
      "WordPress Website Development",
      "Divi Page Builder Development",
      "Custom Post Type Development",
      "Custom WordPress Plugin Development",
      "Form & Payment Integration",
      "Custom PHP & JavaScript Development",
      "Responsive Design Implementation",
      "Performance Optimization",
    ],

    // TODO: upload your screenshots to the Supabase bucket and update these paths.
    images: {
      cover: {
        src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/wordpress/rayofhope.png",
        alt: "Ray of Hope WordPress website homepage",
        type: "cover",
      },
      gallery: [
        {
          src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/wordpress/rayofhope-2.png",
          alt: "Ray of Hope WordPress",
          caption: "Custom WordPress Website Built with Divi",
          type: "screenshot",
        },
        {
          src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/wordpress/rayofhope-3.png",
          alt: "Ray of Hope WordPress",
          caption: "Custom WordPress Website Built with Divi",
          type: "screenshot",
        },
      ],
    },

    links: {
      live: "https://www.rayofhope.org/",
      caseStudy: "",
      repository: "",
      figma: "",
      additional: [],
    },

    featured: true,

    tags: [
      "WordPress",
      "Divi",
      "Custom Post Types",
      "Jotform",
      "Custom Plugins",
      "PHP",
      "JavaScript",
      "Responsive Design",
    ],
  },

  {
    id: "project-03",
    slug: "great-southern-sunnies-shopify-store",
    title: "Great Southern Sunnies",
    subtitle: "Shopify Theme Development & Theme Migration",
    category: "shopify",
    client: "Great Southern Sunnies",
    year: "2025", 
    status: "published",

    excerpt:
      "Shopify theme development that rebuilt an existing storefront on a new theme with the same design and layout, using metaobjects and metafields for data-driven content, plus optimizations and added functionality.",

    overview:
      "Great Southern Sunnies is an Australian Shopify store. The project involved developing a Shopify theme that carried over the original storefront's design and layout, while moving its content and logic to a cleaner, more maintainable codebase.",

    challenge:
      "The new theme had to look and behave like the original storefront, so the visual result stayed familiar, while the underlying code was refactored. Values that were previously fixed also needed to be manageable as structured, data-driven content rather than hard-coded.",

    solution:
      "Developed the Shopify theme with Liquid, JavaScript, and CSS, and refactored the existing code to support the new theme while keeping the original design and layout. Used metaobjects and metafields to handle data-driven values, then optimized the theme and added further functionality on top of the original features.",

    outcome:
      "Delivered a new Shopify theme that matches the original storefront's look and layout, with data-driven content managed through metaobjects and metafields, cleaner and optimized code, and additional functionality.",

    role: "Shopify Developer",

    responsibilities: [
      "Developed the Shopify theme using Liquid, JavaScript, and CSS.",
      "Refactored existing code to support the new theme while keeping the same design and layout as the original.",
      "Used metaobjects and metafields to handle data-driven values and structured content.",
      "Optimized the theme's code and performance.",
      "Added new functionality beyond the original storefront's features.",
    ],

    tools: [
      "Shopify",
      "Shopify Liquid",
      "JavaScript",
      "HTML5",
      "CSS3",
      "Shopify Metafields",
      "Shopify Metaobjects",
      "Shopify Theme Editor",
    ],

    services: [
      "Shopify Theme Development",
      "Theme Migration & Code Refactoring",
      "Metafields & Metaobjects Integration",
      "Custom Liquid Development",
      "Performance Optimization",
      "Custom Feature Development",
    ],

    // TODO: upload your screenshots to the Supabase bucket and update these paths.
    images: {
      cover: {
        src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/shopify/greatsouthernsunnies.png",
        alt: "Great Southern Sunnies Shopify storefront homepage",
        type: "cover",
      },
      gallery: [
        {
          src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/shopify/greatsouthernsunnies-2.png",
          alt: "Great Southern Sunnies Shopify",
          caption: "Shopify Theme Development & Theme Migration",
          type: "screenshot",
        },
        {
          src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/shopify/greatsouthernsunnies-3.png",
          alt: "Great Southern Sunnies Shopify",
          caption: "Shopify Theme Development & Theme Migration",
          type: "screenshot",
        },
      ],
    },

    links: {
      live: "https://greatsouthernsunnies.com.au/",
      caseStudy: "",
      repository: "",
      figma: "",
      additional: [],
    },

    featured: true,

    tags: [
      "Shopify",
      "eCommerce",
      "Liquid",
      "Theme Development",
      "Theme Migration",
      "Metafields",
      "Metaobjects",
      "Performance Optimization",
    ],
  },

  {
    id: "project-04",
    slug: "wp-api-app-theme",
    title: "WP API App Theme",
    subtitle: "WordPress Backend & REST API for a Mobile App",
    category: "wordpress",
    client: "Mobile App Project", 
    year: "2024", 
    status: "published",

    excerpt:
      "A custom WordPress theme that acts as the data backend for a mobile app, using a Custom Post Type, custom PHP, and the WordPress REST API to deliver content to the app.",

    overview:
      "WP API App Theme is a custom WordPress theme that serves as the database and content backend for a mobile app. WordPress stores and manages the data, and the REST API passes it to the app, where it is rendered. I built the WordPress side, while a separate mobile developer built the app that consumes the API data.",

    challenge:
      "The mobile app needed a reliable, structured source of content that could be managed from the WordPress admin and delivered in a form the app could consume. That meant organizing the data properly in WordPress and exposing it cleanly through the REST API, in coordination with the developer building the app.",

    solution:
      "Built a custom WordPress theme that works as a data layer rather than a visual front end. Registered a Custom Post Type to structure the app's content, wrote custom PHP for the backend functionality, and used the WordPress REST API to pass the data to the mobile app, working alongside the mobile developer who implemented the app side.",

    outcome:
      "A WordPress backend that manages the app's content and serves it through the REST API, which the mobile app consumes and renders. The repository is available on GitHub.",

    role: "WordPress Backend Developer",

    responsibilities: [
      "Developed the WordPress side of the project: a custom theme acting as the app's data backend.",
      "Registered and configured a Custom Post Type to structure and store the app's content.",
      "Exposed the content through the WordPress REST API for consumption by the mobile app.",
      "Wrote custom PHP for backend functionality.",
      "Collaborated with the mobile developer who built the app and consumed the API data.",
    ],

    tools: [
      "WordPress",
      "WordPress REST API",
      "Custom Post Types",
      "PHP",
      "Git",
      "GitHub",
    ],

    services: [
      "WordPress Backend Development",
      "Custom WordPress Theme Development",
      "WordPress REST API Integration",
      "Custom Post Type Development",
      "Custom PHP Development",
      "Mobile App Backend Support",
    ],

    // TODO: upload a screenshot (for example the app or the WordPress admin) and update this path.
    images: {
      cover: {
        src: "https://tenayrdhmsvcgkxkoqhk.supabase.co/storage/v1/object/public/assets/others/vecteezy_wordpress-logo-png-wordpress-icon-transparent-png_20975579.png",
        alt: "WP API App Theme WordPress backend for a mobile app",
        type: "cover",
      },
      gallery: [],
    },

    links: {
      live: "",
      caseStudy: "",
      repository: "https://github.com/alfecaesar/wp-api-app-theme",
      figma: "",
      additional: [],
    },

    featured: false,

    tags: [
      "WordPress",
      "REST API",
      "Headless WordPress",
      "Mobile App Backend",
      "Custom Post Types",
      "Custom Theme",
      "PHP",
    ],
  },

  /*
   * Duplicate the project object above for each additional portfolio entry.
   *
   * Suggested project content:
   * - Use a clear, recognizable project title.
   * - Keep the excerpt concise for project cards.
   * - Describe your own responsibilities, not the entire team's work.
   * - List only tools and technologies you actually used.
   * - Use real screenshots and working URLs where available.
   * - For confidential work, set status to "confidential" and omit private links.
   */
];