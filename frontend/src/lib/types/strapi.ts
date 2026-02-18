// Strapi base types
export interface StrapiImage {
  id: number;
  documentId: string;
  url: string;
  alternativeText: string | null;
  width: number;
  height: number;
  formats: {
    thumbnail?: StrapiImageFormat;
    small?: StrapiImageFormat;
    medium?: StrapiImageFormat;
    large?: StrapiImageFormat;
  } | null;
}

export interface StrapiImageFormat {
  url: string;
  width: number;
  height: number;
}

export interface StrapiPagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

export interface StrapiMeta {
  pagination?: StrapiPagination;
}

export interface StrapiResponse<T> {
  data: T;
  meta: StrapiMeta;
}

export interface StrapiSingleResponse<T> {
  data: T;
  meta: StrapiMeta;
}

// Component types
export interface NavigationItem {
  __component: "layout.navigation-item";
  id: number;
  label: string;
  url: string;
  open_in_new_tab: boolean;
}

export interface NavigationDropdown {
  __component: "layout.navigation-dropdown";
  id: number;
  label: string;
  children: Omit<NavigationItem, "__component">[];
}

export type HeaderNavItem = NavigationItem | NavigationDropdown;

export interface FooterColumn {
  id: number;
  title: string;
  links: NavigationItem[];
}

export interface SocialLink {
  id: number;
  platform: "twitter" | "linkedin" | "github" | "facebook" | "instagram" | "youtube";
  url: string;
}

// Block components
export interface HeroBlock {
  __component: "blocks.hero";
  id: number;
  headline: string;
  subheadline: string | null;
  cta_label: string | null;
  cta_url: string | null;
  background_image: StrapiImage | null;
  variant: "full-width" | "compact";
}

export interface FeatureCard {
  id: number;
  icon: StrapiImage | null;
  title: string;
  description: string | null;
}

export interface FeatureGridBlock {
  __component: "blocks.feature-grid";
  id: number;
  title: string | null;
  subtitle: string | null;
  features: FeatureCard[];
}

export interface TextWithImageBlock {
  __component: "blocks.text-with-image";
  id: number;
  content: string | null;
  image: StrapiImage | null;
  layout: "image-left" | "image-right";
}

export interface TestimonialCard {
  id: number;
  quote: string;
  author_name: string;
  author_role: string | null;
  avatar: StrapiImage | null;
}

export interface TestimonialsBlock {
  __component: "blocks.testimonials";
  id: number;
  title: string | null;
  testimonials: TestimonialCard[];
}

export interface CallToActionBlock {
  __component: "blocks.call-to-action";
  id: number;
  headline: string;
  body: string | null;
  button_label: string | null;
  button_url: string | null;
}

export interface PricingCard {
  id: number;
  plan_name: string;
  price: string;
  billing_period: string | null;
  features: string | null;
  cta_label: string | null;
  cta_url: string | null;
  is_popular: boolean;
}

export interface PricingTableBlock {
  __component: "blocks.pricing-table";
  id: number;
  title: string | null;
  subtitle: string | null;
  plans: PricingCard[];
}

export interface ContactFormBlock {
  __component: "blocks.contact-form";
  id: number;
  heading: string | null;
  description: string | null;
  success_message: string | null;
}

export interface LogoCloudBlock {
  __component: "blocks.logo-cloud";
  id: number;
  title: string | null;
  logos: StrapiImage[];
}

export interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export interface FAQBlock {
  __component: "blocks.faq";
  id: number;
  title: string | null;
  items: FAQItem[];
}

export interface RichTextBlock {
  __component: "blocks.rich-text";
  id: number;
  body: string | null;
}

export type DynamicZoneBlock =
  | HeroBlock
  | FeatureGridBlock
  | TextWithImageBlock
  | TestimonialsBlock
  | CallToActionBlock
  | PricingTableBlock
  | ContactFormBlock
  | LogoCloudBlock
  | FAQBlock
  | RichTextBlock;

// Content types
export interface Page {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  meta_description: string | null;
  body: DynamicZoneBlock[];
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface BlogPost {
  id: number;
  documentId: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string | null;
  featured_image: StrapiImage | null;
  published_date: string | null;
  author: string | null;
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
}

export interface SiteConfig {
  id: number;
  documentId: string;
  site_name: string;
  logo: StrapiImage | null;
  header_navigation: HeaderNavItem[];
  footer_columns: FooterColumn[];
  copyright_text: string | null;
  social_links: SocialLink[];
}
