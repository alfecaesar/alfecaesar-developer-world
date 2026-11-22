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
  
    excerpt:
      "",
  
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
