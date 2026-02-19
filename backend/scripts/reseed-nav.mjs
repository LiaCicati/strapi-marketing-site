/**
 * Re-seeds just the SiteConfig with nested navigation.
 * Run after the backend is redeployed with the new schema.
 * Usage: STRAPI_URL=https://... STRAPI_TOKEN=... node scripts/reseed-nav.mjs
 */

const STRAPI_URL = process.env.STRAPI_URL;
const STRAPI_TOKEN = process.env.STRAPI_TOKEN;

if (!STRAPI_URL || !STRAPI_TOKEN) {
  console.error('Set STRAPI_URL and STRAPI_TOKEN environment variables');
  process.exit(1);
}

const headers = {
  'Content-Type': 'application/json',
  Authorization: `Bearer ${STRAPI_TOKEN}`,
};

async function api(method, path, body) {
  const url = `${STRAPI_URL}/api${path}`;
  const opts = { method, headers };
  if (body) opts.body = JSON.stringify(body);
  const res = await fetch(url, opts);
  const json = await res.json();
  if (!res.ok) {
    console.error(`${method} ${path} failed (${res.status}):`, JSON.stringify(json, null, 2));
    throw new Error(`API error ${res.status}`);
  }
  return json;
}

async function seed() {
  console.log('Updating Site Config with nested navigation...');
  await api('PUT', '/site-config', {
    data: {
      site_name: 'Velocity',
      copyright_text: '© 2026 Velocity Inc. All rights reserved.',
      header_navigation: [
        {
          __component: 'layout.navigation-item',
          label: 'Home',
          url: '/',
          open_in_new_tab: false,
        },
        {
          __component: 'layout.navigation-dropdown',
          label: 'Services',
          children: [
            { label: 'All Services', url: '/services', open_in_new_tab: false },
            { label: 'Web Development', url: '/services#web', open_in_new_tab: false },
            { label: 'Cloud Infrastructure', url: '/services#cloud', open_in_new_tab: false },
            { label: 'API Development', url: '/services#api', open_in_new_tab: false },
            { label: 'Pricing', url: '/services#pricing', open_in_new_tab: false },
          ],
        },
        {
          __component: 'layout.navigation-dropdown',
          label: 'Company',
          children: [
            { label: 'About Us', url: '/about', open_in_new_tab: false },
            { label: 'Blog', url: '/blog', open_in_new_tab: false },
            { label: 'Careers', url: '/about#careers', open_in_new_tab: false },
          ],
        },
        {
          __component: 'layout.navigation-item',
          label: 'Blog',
          url: '/blog',
          open_in_new_tab: false,
        },
        {
          __component: 'layout.navigation-item',
          label: 'Contact',
          url: '/contact',
          open_in_new_tab: false,
        },
      ],
      footer_columns: [
        {
          title: 'Product',
          links: [
            { label: 'Features', url: '/services', open_in_new_tab: false },
            { label: 'Pricing', url: '/services#pricing', open_in_new_tab: false },
            { label: 'Integrations', url: '/services', open_in_new_tab: false },
          ],
        },
        {
          title: 'Company',
          links: [
            { label: 'About Us', url: '/about', open_in_new_tab: false },
            { label: 'Blog', url: '/blog', open_in_new_tab: false },
            { label: 'Careers', url: '/about', open_in_new_tab: false },
          ],
        },
        {
          title: 'Support',
          links: [
            { label: 'Contact', url: '/contact', open_in_new_tab: false },
            { label: 'FAQ', url: '/contact#faq', open_in_new_tab: false },
            { label: 'Documentation', url: '/', open_in_new_tab: false },
          ],
        },
      ],
      social_links: [
        { platform: 'twitter', url: 'https://twitter.com/velocity' },
        { platform: 'linkedin', url: 'https://linkedin.com/company/velocity' },
        { platform: 'github', url: 'https://github.com/velocity' },
      ],
    },
  });

  console.log('✅ Site Config updated with nested navigation!');
  console.log('   - Home (flat link)');
  console.log('   - Services (dropdown: All Services, Web Dev, Cloud, API, Pricing)');
  console.log('   - Company (dropdown: About Us, Blog, Careers)');
  console.log('   - Blog (flat link)');
  console.log('   - Contact (flat link)');
}

seed().catch((err) => {
  console.error('Failed:', err);
  process.exit(1);
});
