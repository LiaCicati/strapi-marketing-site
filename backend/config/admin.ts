import type { Core } from '@strapi/strapi';

/**
 * Build the frontend preview pathname for a given content type and document.
 */
function getPreviewPathname(
  uid: string,
  { document }: { locale?: string; document: { slug?: string } }
): string | null {
  const { slug } = document;

  switch (uid) {
    case 'api::page.page':
      if (!slug) return null;
      return slug === 'home' ? '/' : `/${slug}`;

    case 'api::blog-post.blog-post':
      if (!slug) return null;
      return `/blog/${slug}`;

    default:
      return null;
  }
}

const config = ({ env }: Core.Config.Shared.ConfigParams): Core.Config.Admin => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  transfer: {
    token: {
      salt: env('TRANSFER_TOKEN_SALT'),
    },
  },
  secrets: {
    encryptionKey: env('ENCRYPTION_KEY'),
  },
  flags: {
    nps: env.bool('FLAG_NPS', true),
    promoteEE: env.bool('FLAG_PROMOTE_EE', true),
  },
  preview: {
    enabled: true,
    config: {
      allowedOrigins: [env('CLIENT_URL', 'http://localhost:3000')],
      async handler(uid, { documentId, locale, status }) {
        const document = await strapi.documents(uid as any).findOne({ documentId });

        if (!document) {
          return null;
        }

        const pathname = getPreviewPathname(uid, { locale, document: document as any });

        if (!pathname) {
          return null;
        }

        // Build the preview URL with query params for the frontend API route
        const urlSearchParams = new URLSearchParams({
          url: pathname,
          secret: env('PREVIEW_SECRET', ''),
          status: status ?? 'draft',
        });

        return `${env('CLIENT_URL', 'http://localhost:3000')}/api/preview?${urlSearchParams}`;
      },
    },
  },
});

export default config;
