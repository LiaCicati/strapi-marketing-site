import { createStrapi } from '@strapi/strapi';

async function seed() {
  console.log('Starting Strapi for seeding...');
  const appContext = await createStrapi({ distDir: './dist' }).load();
  const strapi = appContext;

  console.log('Seeding Site Config...');
  // Delete existing site config if any
  const existingConfig = await strapi.documents('api::site-config.site-config').findFirst({});
  if (existingConfig) {
    await strapi.documents('api::site-config.site-config').delete({
      documentId: existingConfig.documentId,
    });
  }

  await strapi.documents('api::site-config.site-config').create({
    data: {
      site_name: 'Velocity',
      copyright_text: '© 2026 Velocity Inc. All rights reserved.',
      header_navigation: [
        { label: 'Home', url: '/', open_in_new_tab: false },
        { label: 'Services', url: '/services', open_in_new_tab: false },
        { label: 'About', url: '/about', open_in_new_tab: false },
        { label: 'Blog', url: '/blog', open_in_new_tab: false },
        { label: 'Contact', url: '/contact', open_in_new_tab: false },
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
  console.log('Site Config created.');

  // Seed Pages
  console.log('Seeding Pages...');

  // Delete existing pages
  const existingPages = await strapi.documents('api::page.page').findMany({});
  for (const page of existingPages) {
    await strapi.documents('api::page.page').delete({ documentId: page.documentId });
  }

  // Home Page
  const homePage = await strapi.documents('api::page.page').create({
    data: {
      title: 'Home',
      slug: 'home',
      meta_description: 'Velocity — Accelerate your business with modern digital solutions. We build fast, scalable, and beautiful web experiences.',
      body: [
        {
          __component: 'blocks.hero',
          headline: 'Accelerate Your Digital Transformation',
          subheadline: 'Build modern, scalable web applications with our cutting-edge platform. Ship faster, iterate smarter, and delight your customers.',
          cta_label: 'Get Started Free',
          cta_url: '/contact',
          variant: 'full-width',
        },
        {
          __component: 'blocks.logo-cloud',
          title: 'Trusted by Industry Leaders',
        },
        {
          __component: 'blocks.feature-grid',
          title: 'Why Choose Velocity?',
          subtitle: 'Everything you need to build exceptional digital experiences, all in one platform.',
          features: [
            {
              title: 'Lightning Fast Performance',
              description: 'Built on cutting-edge infrastructure for sub-second load times. Your users expect speed — we deliver it.',
            },
            {
              title: 'Enterprise Security',
              description: 'SOC 2 compliant with end-to-end encryption. Your data is protected with industry-leading security measures.',
            },
            {
              title: 'Seamless Integrations',
              description: 'Connect with 200+ tools and services. From CRMs to analytics, we integrate with your existing stack.',
            },
          ],
        },
        {
          __component: 'blocks.text-with-image',
          content: '## Built for Modern Teams\n\nVelocity brings together design, development, and deployment in one seamless workflow. Our platform empowers teams to move from idea to production in record time.\n\nWith built-in collaboration tools, version control, and automated deployments, your team can focus on what matters most — building great products.',
          layout: 'image-right',
        },
        {
          __component: 'blocks.testimonials',
          title: 'What Our Customers Say',
          testimonials: [
            {
              quote: 'Velocity transformed how we build products. Our development velocity increased by 3x within the first month.',
              author_name: 'Sarah Chen',
              author_role: 'CTO, TechFlow Inc.',
            },
            {
              quote: 'The platform is incredibly intuitive. We onboarded our entire team in less than a day and started shipping features immediately.',
              author_name: 'Marcus Rodriguez',
              author_role: 'VP Engineering, DataScale',
            },
            {
              quote: 'Security and performance out of the box. Velocity handles the infrastructure so we can focus on our core business.',
              author_name: 'Amara Okafor',
              author_role: 'Founder, CloudNine Solutions',
            },
          ],
        },
        {
          __component: 'blocks.call-to-action',
          headline: 'Ready to Build Something Amazing?',
          body: 'Join thousands of companies that trust Velocity to power their digital experiences. Start your free trial today — no credit card required.',
          button_label: 'Start Free Trial',
          button_url: '/contact',
        },
      ],
    },
    status: 'published',
  });
  console.log(`Home page created (id: ${homePage.documentId})`);

  // Services Page
  const servicesPage = await strapi.documents('api::page.page').create({
    data: {
      title: 'Services',
      slug: 'services',
      meta_description: 'Explore Velocity services — web development, cloud infrastructure, API design, and more. Find the perfect plan for your team.',
      body: [
        {
          __component: 'blocks.hero',
          headline: 'Services & Solutions',
          subheadline: 'From startup MVPs to enterprise-grade platforms, we have the tools and expertise to bring your vision to life.',
          cta_label: 'View Pricing',
          cta_url: '#pricing',
          variant: 'compact',
        },
        {
          __component: 'blocks.feature-grid',
          title: 'Our Services',
          subtitle: 'Comprehensive solutions for every stage of your digital journey.',
          features: [
            {
              title: 'Web Application Development',
              description: 'Full-stack web applications built with modern frameworks. React, Next.js, and Node.js — we use the best tools for the job.',
            },
            {
              title: 'Cloud Infrastructure',
              description: 'Scalable, reliable cloud architecture on AWS, GCP, or Azure. We design and manage infrastructure that grows with you.',
            },
            {
              title: 'API Design & Development',
              description: 'RESTful and GraphQL APIs that are well-documented, performant, and a joy to work with.',
            },
            {
              title: 'Mobile Development',
              description: 'Cross-platform mobile applications with React Native. One codebase, every platform.',
            },
            {
              title: 'DevOps & CI/CD',
              description: 'Automated pipelines, containerization, and monitoring. Ship with confidence, deploy without fear.',
            },
            {
              title: 'Technical Consulting',
              description: 'Expert guidance on architecture decisions, technology choices, and development processes.',
            },
          ],
        },
        {
          __component: 'blocks.pricing-table',
          title: 'Simple, Transparent Pricing',
          subtitle: 'Choose the plan that fits your team. All plans include a 14-day free trial.',
          plans: [
            {
              plan_name: 'Starter',
              price: '$29',
              billing_period: 'per month',
              features: '- Up to 3 team members\n- 5 projects\n- Basic analytics\n- Community support\n- 10 GB storage',
              cta_label: 'Start Free Trial',
              cta_url: '/contact',
              is_popular: false,
            },
            {
              plan_name: 'Professional',
              price: '$99',
              billing_period: 'per month',
              features: '- Up to 15 team members\n- Unlimited projects\n- Advanced analytics\n- Priority support\n- 100 GB storage\n- Custom domains\n- API access',
              cta_label: 'Start Free Trial',
              cta_url: '/contact',
              is_popular: true,
            },
            {
              plan_name: 'Enterprise',
              price: 'Custom',
              billing_period: 'contact us',
              features: '- Unlimited team members\n- Unlimited projects\n- Custom analytics\n- Dedicated support\n- Unlimited storage\n- SSO & SAML\n- SLA guarantee\n- Custom integrations',
              cta_label: 'Contact Sales',
              cta_url: '/contact',
              is_popular: false,
            },
          ],
        },
        {
          __component: 'blocks.call-to-action',
          headline: 'Not Sure Which Plan Is Right?',
          body: 'Talk to our team and we will help you find the perfect solution for your needs.',
          button_label: 'Contact Us',
          button_url: '/contact',
        },
      ],
    },
    status: 'published',
  });
  console.log(`Services page created (id: ${servicesPage.documentId})`);

  // About Page
  const aboutPage = await strapi.documents('api::page.page').create({
    data: {
      title: 'About',
      slug: 'about',
      meta_description: 'Learn about Velocity — our mission, our team, and the values that drive us to build exceptional software.',
      body: [
        {
          __component: 'blocks.hero',
          headline: 'About Velocity',
          subheadline: 'We are a team of engineers, designers, and strategists passionate about building the future of the web.',
          variant: 'compact',
        },
        {
          __component: 'blocks.text-with-image',
          content: '## Our Story\n\nFounded in 2020, Velocity started with a simple idea: building great software should not be complicated. We saw teams struggling with fragmented toolchains, slow deployments, and complex infrastructure.\n\nToday, we serve over 2,000 companies worldwide, from early-stage startups to Fortune 500 enterprises. Our platform has helped teams ship products 3x faster while maintaining the highest standards of quality and security.',
          layout: 'image-left',
        },
        {
          __component: 'blocks.feature-grid',
          title: 'Our Values',
          subtitle: 'The principles that guide everything we do.',
          features: [
            {
              title: 'Ship with Purpose',
              description: 'Every feature we build solves a real problem. We focus on impact over output.',
            },
            {
              title: 'Transparency First',
              description: 'Open communication with our team, our customers, and our community. No surprises.',
            },
            {
              title: 'Continuous Improvement',
              description: 'We are never done learning. We invest in our people and our craft every single day.',
            },
          ],
        },
        {
          __component: 'blocks.testimonials',
          title: 'From Our Partners',
          testimonials: [
            {
              quote: 'Working with Velocity feels like having an extension of our own team. They truly understand our business.',
              author_name: 'Elena Vasquez',
              author_role: 'CEO, BrightPath Analytics',
            },
            {
              quote: 'The level of technical expertise and attention to detail is unmatched. Velocity is our go-to technology partner.',
              author_name: 'James Park',
              author_role: 'Director of Engineering, NovaSoft',
            },
            {
              quote: 'From concept to launch, the Velocity team delivered beyond our expectations. Highly recommended.',
              author_name: 'Priya Sharma',
              author_role: 'Product Manager, GlobalReach',
            },
          ],
        },
      ],
    },
    status: 'published',
  });
  console.log(`About page created (id: ${aboutPage.documentId})`);

  // Contact Page
  const contactPage = await strapi.documents('api::page.page').create({
    data: {
      title: 'Contact',
      slug: 'contact',
      meta_description: 'Get in touch with the Velocity team. We would love to hear about your project and how we can help.',
      body: [
        {
          __component: 'blocks.hero',
          headline: 'Get In Touch',
          subheadline: 'Have a question or want to discuss your project? We are here to help.',
          variant: 'compact',
        },
        {
          __component: 'blocks.contact-form',
          heading: 'Send Us a Message',
          description: 'Fill out the form below and we will get back to you within 24 hours.',
          success_message: 'Thank you for reaching out! We will be in touch soon.',
        },
        {
          __component: 'blocks.faq',
          title: 'Frequently Asked Questions',
          items: [
            {
              question: 'How long does a typical project take?',
              answer: 'Project timelines vary based on scope and complexity. A simple marketing website might take 2-4 weeks, while a complex web application could take 2-6 months. We will provide a detailed timeline during our initial consultation.',
            },
            {
              question: 'Do you offer ongoing maintenance and support?',
              answer: 'Yes! All our plans include ongoing support. We offer various maintenance packages to keep your application running smoothly, including security updates, performance monitoring, and feature enhancements.',
            },
            {
              question: 'Can you work with our existing technology stack?',
              answer: 'Absolutely. While we have our preferred technologies, we are experienced with a wide range of frameworks and platforms. We will work with whatever makes the most sense for your project.',
            },
            {
              question: 'What is your development process like?',
              answer: 'We follow an agile methodology with 2-week sprints. You will have full visibility into our progress through regular standups, sprint demos, and a shared project board. Communication is key to our process.',
            },
            {
              question: 'Do you sign NDAs?',
              answer: 'Yes, we are happy to sign NDAs before any project discussions. We take confidentiality seriously and protect all client information.',
            },
          ],
        },
      ],
    },
    status: 'published',
  });
  console.log(`Contact page created (id: ${contactPage.documentId})`);

  // Seed Blog Posts
  console.log('Seeding Blog Posts...');

  const existingPosts = await strapi.documents('api::blog-post.blog-post').findMany({});
  for (const post of existingPosts) {
    await strapi.documents('api::blog-post.blog-post').delete({ documentId: post.documentId });
  }

  const blogPosts = [
    {
      title: 'The Future of Web Development in 2026',
      slug: 'future-of-web-development-2026',
      excerpt: 'Explore the trends shaping web development this year, from AI-assisted coding to edge computing and beyond.',
      content: '## The Evolving Landscape\n\nWeb development continues to evolve at a rapid pace. In 2026, we are seeing several transformative trends that are reshaping how we build for the web.\n\n### AI-Assisted Development\n\nAI tools have become indispensable for modern development teams. From code generation to automated testing, AI is augmenting developer capabilities in ways we could not have imagined just a few years ago.\n\n### Edge Computing\n\nWith frameworks like Next.js pushing computation closer to users, edge computing has become the default for performance-critical applications. Server components and streaming have changed how we think about rendering.\n\n### Web Components Maturity\n\nThe web components specification has reached full maturity, enabling truly framework-agnostic component libraries that work everywhere.\n\n## Looking Ahead\n\nThe future of web development is bright. As tools become more powerful and accessible, the barrier to building great web experiences continues to lower.',
      published_date: '2026-01-15',
      author: 'Sarah Chen',
    },
    {
      title: 'Building Scalable APIs with Modern Best Practices',
      slug: 'building-scalable-apis',
      excerpt: 'Learn the architectural patterns and best practices for building APIs that can handle millions of requests.',
      content: '## API Design Principles\n\nBuilding a scalable API requires thoughtful design from the very beginning. Here are the key principles we follow at Velocity.\n\n### Resource-Oriented Design\n\nOrganize your API around resources, not actions. Use HTTP methods (GET, POST, PUT, DELETE) to express operations on those resources.\n\n### Pagination and Filtering\n\nAlways implement pagination for list endpoints. Cursor-based pagination scales better than offset-based pagination for large datasets.\n\n### Rate Limiting\n\nProtect your API with sensible rate limits. Use token bucket algorithms for flexible rate limiting that handles burst traffic gracefully.\n\n### Caching Strategy\n\nImplement caching at multiple levels: CDN, application, and database. Use ETags and conditional requests to minimize bandwidth.\n\n## Conclusion\n\nA well-designed API is the foundation of a great developer experience. Invest time in getting it right from the start.',
      published_date: '2026-01-28',
      author: 'Marcus Rodriguez',
    },
    {
      title: 'Why We Chose Next.js for Our Enterprise Platform',
      slug: 'why-we-chose-nextjs',
      excerpt: 'A deep dive into our decision to migrate to Next.js and the results we have seen after six months in production.',
      content: '## The Decision\n\nWhen we set out to rebuild our enterprise platform, we evaluated several frameworks. After extensive prototyping and benchmarking, we chose Next.js. Here is why.\n\n### Server Components\n\nReact Server Components fundamentally changed how we think about data fetching and rendering. By moving data fetching to the server, we reduced our client-side JavaScript bundle by 60%.\n\n### Performance\n\nOut of the box, Next.js gave us excellent Core Web Vitals scores. The automatic code splitting, image optimization, and font optimization made performance optimization almost effortless.\n\n### Developer Experience\n\nThe App Router, TypeScript support, and hot module replacement made our developers significantly more productive. Onboarding new team members became much faster.\n\n## Results After Six Months\n\n- **40% faster page loads** compared to our previous SPA architecture\n- **60% reduction** in client-side JavaScript\n- **2x faster** development velocity for new features\n\nWe could not be happier with the decision.',
      published_date: '2026-02-05',
      author: 'Amara Okafor',
    },
    {
      title: 'Design Systems: From Components to Culture',
      slug: 'design-systems-components-to-culture',
      excerpt: 'How building a design system transformed our product development process and improved consistency across teams.',
      content: '## More Than Components\n\nA design system is often thought of as a component library. While components are a crucial part, a true design system encompasses much more: design tokens, patterns, guidelines, and most importantly, a shared language.\n\n### Starting Small\n\nWe started our design system with just three things: a color palette, typography scale, and spacing system. These foundational tokens informed every component we built afterward.\n\n### Building for Adoption\n\nThe best design system is the one people actually use. We focused on making our components easy to discover, easy to use, and easy to contribute to.\n\n### Measuring Impact\n\nWe track adoption metrics, design consistency scores, and developer satisfaction to measure the impact of our design system.\n\n## Key Takeaways\n\n1. Start with tokens, not components\n2. Prioritize developer experience\n3. Document everything with real examples\n4. Build a contribution model from day one',
      published_date: '2026-02-12',
      author: 'Elena Vasquez',
    },
  ];

  for (const post of blogPosts) {
    const created = await strapi.documents('api::blog-post.blog-post').create({
      data: post,
      status: 'published',
    });
    console.log(`Blog post created: "${post.title}" (id: ${created.documentId})`);
  }

  console.log('\nSeeding complete! All content has been created and published.');
  process.exit(0);
}

seed().catch((err) => {
  console.error('Seeding failed:', err);
  process.exit(1);
});
