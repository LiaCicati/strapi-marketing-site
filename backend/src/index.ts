import type { Core } from '@strapi/strapi';

export default {
  register(/* { strapi }: { strapi: Core.Strapi } */) {},

  async bootstrap({ strapi }: { strapi: Core.Strapi }) {
    // Set up public permissions for Page, BlogPost, and SiteConfig
    const publicRole = await strapi.db
      .query('plugin::users-permissions.role')
      .findOne({ where: { type: 'public' } });

    if (!publicRole) return;

    const permissions = [
      { action: 'api::page.page.find' },
      { action: 'api::page.page.findOne' },
      { action: 'api::blog-post.blog-post.find' },
      { action: 'api::blog-post.blog-post.findOne' },
      { action: 'api::site-config.site-config.find' },
    ];

    for (const perm of permissions) {
      const existing = await strapi.db
        .query('plugin::users-permissions.permission')
        .findOne({
          where: {
            action: perm.action,
            role: publicRole.id,
          },
        });

      if (!existing) {
        await strapi.db
          .query('plugin::users-permissions.permission')
          .create({
            data: {
              action: perm.action,
              role: publicRole.id,
            },
          });
      }
    }
  },
};
