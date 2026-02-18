import qs from "qs";
import type {
  Page,
  BlogPost,
  SiteConfig,
  StrapiResponse,
  StrapiSingleResponse,
} from "./types";

const STRAPI_URL = process.env.NEXT_PUBLIC_STRAPI_URL || "http://localhost:1337";
const STRAPI_TOKEN = process.env.STRAPI_API_TOKEN;

interface FetchOptions {
  preview?: boolean;
}

async function fetchFromStrapi<T>(
  path: string,
  query: Record<string, unknown> = {},
  options: FetchOptions = {}
): Promise<T> {
  const queryString = qs.stringify(query, { encodeValuesOnly: true });
  const url = `${STRAPI_URL}/api${path}${queryString ? `?${queryString}` : ""}`;

  const headers: Record<string, string> = {
    "Content-Type": "application/json",
  };

  if (STRAPI_TOKEN) {
    headers["Authorization"] = `Bearer ${STRAPI_TOKEN}`;
  }

  let res: Response;
  try {
    res = await fetch(url, {
      headers,
      next: { revalidate: options.preview ? 0 : 60 },
    });
  } catch (error) {
    console.error(`Strapi connection error for ${url}:`, error);
    throw error;
  }

  if (!res.ok) {
    throw new Error(`Strapi fetch error: ${res.status} ${res.statusText} for ${url}`);
  }

  return res.json();
}

// Deep populate helper for dynamic zones
function getPagePopulate() {
  return {
    populate: {
      body: {
        on: {
          "blocks.hero": {
            populate: { background_image: { fields: ["url", "alternativeText", "width", "height", "formats"] } },
          },
          "blocks.feature-grid": {
            populate: {
              features: {
                populate: { icon: { fields: ["url", "alternativeText", "width", "height", "formats"] } },
              },
            },
          },
          "blocks.text-with-image": {
            populate: { image: { fields: ["url", "alternativeText", "width", "height", "formats"] } },
          },
          "blocks.testimonials": {
            populate: {
              testimonials: {
                populate: { avatar: { fields: ["url", "alternativeText", "width", "height", "formats"] } },
              },
            },
          },
          "blocks.call-to-action": { populate: "*" },
          "blocks.pricing-table": {
            populate: { plans: { populate: "*" } },
          },
          "blocks.contact-form": { populate: "*" },
          "blocks.logo-cloud": {
            populate: { logos: { fields: ["url", "alternativeText", "width", "height", "formats"] } },
          },
          "blocks.faq": {
            populate: { items: { populate: "*" } },
          },
          "blocks.rich-text": { populate: "*" },
        },
      },
    },
  };
}

export async function getPage(
  slug: string,
  options: FetchOptions = {}
): Promise<Page | null> {
  const query: Record<string, unknown> = {
    filters: { slug: { $eq: slug } },
    ...getPagePopulate(),
  };

  if (options.preview) {
    query.status = "draft";
  }

  const response = await fetchFromStrapi<StrapiResponse<Page[]>>(
    "/pages",
    query,
    options
  );

  return response.data?.[0] ?? null;
}

export async function getAllPages(): Promise<Page[]> {
  const response = await fetchFromStrapi<StrapiResponse<Page[]>>("/pages", {
    fields: ["title", "slug"],
    pagination: { pageSize: 100 },
  });

  return response.data ?? [];
}

export async function getSiteConfig(): Promise<SiteConfig | null> {
  const response = await fetchFromStrapi<StrapiSingleResponse<SiteConfig>>(
    "/site-config",
    {
      populate: {
        logo: { fields: ["url", "alternativeText", "width", "height", "formats"] },
        header_navigation: { populate: "*" },
        footer_columns: {
          populate: { links: { populate: "*" } },
        },
        social_links: { populate: "*" },
      },
    }
  );

  return response.data ?? null;
}

export async function getBlogPosts(
  options: FetchOptions = {}
): Promise<BlogPost[]> {
  const query: Record<string, unknown> = {
    populate: {
      featured_image: { fields: ["url", "alternativeText", "width", "height", "formats"] },
    },
    sort: ["published_date:desc"],
    pagination: { pageSize: 100 },
  };

  if (options.preview) {
    query.status = "draft";
  }

  const response = await fetchFromStrapi<StrapiResponse<BlogPost[]>>(
    "/blog-posts",
    query,
    options
  );

  return response.data ?? [];
}

export async function getBlogPost(
  slug: string,
  options: FetchOptions = {}
): Promise<BlogPost | null> {
  const query: Record<string, unknown> = {
    filters: { slug: { $eq: slug } },
    populate: {
      featured_image: { fields: ["url", "alternativeText", "width", "height", "formats"] },
    },
  };

  if (options.preview) {
    query.status = "draft";
  }

  const response = await fetchFromStrapi<StrapiResponse<BlogPost[]>>(
    "/blog-posts",
    query,
    options
  );

  return response.data?.[0] ?? null;
}
