import type { LucideIcon } from "lucide-react";
import {
  AppWindowIcon,
  GaugeIcon,
  GlobeIcon,
  HandshakeIcon,
  LayoutTemplateIcon,
  LifeBuoyIcon,
  PuzzleIcon,
  ShoppingBagIcon,
  TrendingUpIcon,
} from "lucide-react";

/** Which 3D illustration a service shows. */
export type ServiceKind = "cart" | "window" | "dashboard" | "laptop";

export type Service = {
  id: string;
  kind: ServiceKind;
  title: string;
  description: string;
  items: string[];
  /** Short hint shown over the 3D illustration. */
  hint: string;
  accent: string;
};

export const SERVICES: Service[] = [
  {
    id: "shopify",
    kind: "cart",
    title: "Shopify Development",
    description: "Professional Shopify eCommerce development, theme customization, and optimization.",
    hint: "Click the cart to add to it",
    accent: "#95bf47",
    items: [
      "Shopify Store Development",
      "Shopify Theme Customization",
      "Shopify Plus Development",
      "Custom Liquid Sections",
      "Custom Templates",
      "Metafields and Metaobjects",
      "App Integrations",
      "Performance Optimization",
      "Conversion Rate Optimization",
      "Store Maintenance",
    ],
  },
  {
    id: "wordpress",
    kind: "window",
    title: "WordPress Development",
    description: "Flexible and professional WordPress websites tailored to business requirements.",
    hint: "Click the window to see its layers",
    accent: "#3a7bd5",
    items: [
      "Custom WordPress Websites",
      "Custom WordPress Themes",
      "Custom Plugin Development",
      "WooCommerce Development",
      "Elementor and Divi",
      "Website Maintenance",
      "Speed Optimization",
      "Bug Fixing",
    ],
  },
  {
    id: "webapp",
    kind: "dashboard",
    title: "Web Application Development",
    description: "Modern web applications using contemporary technologies.",
    hint: "Click the dashboard to refresh it",
    accent: "#38d3ea",
    items: [
      "React Development",
      "Next.js Development",
      "JavaScript and TypeScript",
      "API Integration",
      "Dashboard Development",
      "Custom Business Applications",
      "Database Integration",
    ],
  },
  {
    id: "landing",
    kind: "laptop",
    title: "Landing Page and Front-End Development",
    description: "Visually engaging, responsive, and user-friendly digital experiences.",
    hint: "Click the laptop to close and open it",
    accent: "#a58bff",
    items: [
      "Custom Landing Pages",
      "Figma to Code",
      "Responsive Web Design",
      "Front-End Development",
      "UI Implementation",
      "Interactive Animations",
      "Email Template Development",
    ],
  },
];

export type ExperienceArea = { title: string; description: string; Icon: LucideIcon };

/** Areas of experience. Deliberately no employers or dates. */

export const EXPERIENCE_AREAS: ExperienceArea[] = [
  {
    title: "Front-End Development",
    Icon: AppWindowIcon,
    description: "Building responsive, user-friendly interfaces with modern front-end technologies, clean code, and a strong focus on usability."
  },
  {
    title: "Shopify eCommerce Development",
    Icon: ShoppingBagIcon,
    description: "Customizing Shopify themes, developing storefront features, and creating seamless shopping experiences that support business growth."
  },
  {
    title: "WordPress Development",
    Icon: GlobeIcon,
    description: "Developing and extending WordPress websites with custom functionality, flexible content management, and tailored solutions."
  },
  {
    title: "Website and Theme Customization",
    Icon: LayoutTemplateIcon,
    description: "Transforming existing websites and themes to match design requirements, improve usability, and deliver the right functionality."
  },
  {
    title: "Custom Theme and Plugin Development",
    Icon: PuzzleIcon,
    description: "Building tailored themes, plugins, and reusable components that extend platform capabilities and meet specific project needs."
  },
  {
    title: "Website Performance Optimization",
    Icon: GaugeIcon,
    description: "Improving loading speed, responsiveness, and front-end efficiency for faster, smoother website experiences."
  },
  {
    title: "Conversion Rate Optimization",
    Icon: TrendingUpIcon,
    description: "Enhancing user journeys, product pages, layouts, and interactions to reduce friction and encourage meaningful conversions."
  },
  {
    title: "Agency and International Client Collaboration",
    Icon: HandshakeIcon,
    description: "Partnering with agencies, developers, and international clients to deliver projects, coordinate workflows, and meet shared goals across time zones."
  },
  {
    title: "Website Maintenance and Technical Support",
    Icon: LifeBuoyIcon,
    description: "Maintaining website reliability through ongoing updates, troubleshooting, technical improvements, and proactive support."
  },
];


export type ProcessStage = {
  id: "discover" | "plan" | "design" | "develop" | "test" | "launch";
  title: string;
  description: string;
  color: string;
};

export const PROCESS_STAGES: ProcessStage[] = [
  { id: "discover", title: "Discover", description: "Understand the requirements and business goals.", color: "#38d3ea" },
  { id: "plan", title: "Plan", description: "Define the structure and technical approach.", color: "#4f8dff" },
  { id: "design", title: "Design", description: "Transform concepts into a user-friendly experience.", color: "#ff8fc6" },
  { id: "develop", title: "Develop", description: "Build functional, responsive, and maintainable solutions.", color: "#7c5cff" },
  { id: "test", title: "Test", description: "Validate functionality, performance, and compatibility.", color: "#5fcf9c" },
  { id: "launch", title: "Launch", description: "Deliver the finished solution.", color: "#ffd36e" },
];
