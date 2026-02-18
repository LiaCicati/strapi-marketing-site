# Strapi Marketing Site

A modern marketing website built with **Next.js 15** and **Strapi 5** as a headless CMS. Features dynamic pages with modular content blocks, a blog, draft preview mode, and full TypeScript support.

## Architecture

```
strapi-marketing-site/
├── frontend/          Next.js 15 (App Router, TypeScript, Tailwind CSS 4)
│   ├── src/
│   │   ├── app/           Pages and API routes
│   │   ├── components/    Block + layout components
│   │   └── lib/           Strapi client, types, utilities
│   └── ...
├── backend/           Strapi 5 (TypeScript, SQLite/PostgreSQL)
│   ├── src/
│   │   ├── api/           Content type definitions
│   │   ├── components/    Reusable component schemas
│   │   └── index.ts       Bootstrap (public permissions)
│   └── scripts/
│       └── seed.ts        Demo content seed script
└── README.md
```

### Content Architecture

**Collection Types:**
- **Page** — Dynamic pages with a `body` dynamic zone containing modular blocks
- **BlogPost** — Blog articles with rich text content

**Single Type:**
- **SiteConfig** — Global navigation, footer, social links

**Dynamic Zone Blocks:**
Hero, Feature Grid, Text With Image, Testimonials, Call To Action, Pricing Table, Contact Form, Logo Cloud, FAQ, Rich Text

## Local Development

### Prerequisites

- Node.js 20+
- npm 6+

### 1. Clone and Install

```bash
git clone https://github.com/LiaCicati/strapi-marketing-site.git
cd strapi-marketing-site

# Install backend dependencies
cd backend && npm install

# Install frontend dependencies
cd ../frontend && npm install
```

### 2. Configure Environment

**Backend** — copy `.env.example` to `.env` (generated on first `npm run develop`):
```bash
cd backend
cp .env.example .env
# Edit .env with your own secrets (or use defaults for local dev)
```

**Frontend** — copy `.env.example` to `.env.local`:
```bash
cd frontend
cp .env.example .env.local
```

### 3. Start Strapi

```bash
cd backend
npm run develop
```

Strapi will start at `http://localhost:1337`. On first run:
1. Create an admin account at `http://localhost:1337/admin`
2. The bootstrap script automatically configures public API permissions

### 4. Run the Seed Script

```bash
cd backend
npm run seed
```

This creates demo pages (Home, Services, About, Contact) and blog posts.

### 5. Create an API Token (optional for local dev)

1. Go to Strapi Admin > Settings > API Tokens
2. Create a new token with "Full access"
3. Add it to `frontend/.env.local` as `STRAPI_API_TOKEN`

### 6. Start Next.js

```bash
cd frontend
npm run dev
```

The site will be available at `http://localhost:3000`.

## Preview / Draft Mode

### Setup

1. Set `STRAPI_PREVIEW_SECRET` in `frontend/.env.local`
2. Enable draft mode by visiting:
   ```
   http://localhost:3000/api/draft?secret=YOUR_SECRET&slug=/
   ```
3. When draft mode is active, unpublished Strapi content is shown
4. Disable at: `http://localhost:3000/api/disable-draft`

## Deploying Strapi to Railway/Render

### Railway

1. Create a new Railway project
2. Add a PostgreSQL database
3. Create a new service from the GitHub repo
4. Set the root directory to `backend`
5. Set build command: `npm run build`
6. Set start command: `npm run start`
7. Add environment variables:

| Variable | Value |
|---|---|
| `DATABASE_CLIENT` | `postgres` |
| `DATABASE_URL` | (from Railway PostgreSQL addon) |
| `DATABASE_SSL` | `true` |
| `APP_KEYS` | (generate random keys) |
| `API_TOKEN_SALT` | (generate random string) |
| `ADMIN_JWT_SECRET` | (generate random string) |
| `JWT_SECRET` | (generate random string) |
| `TRANSFER_TOKEN_SALT` | (generate random string) |
| `ENCRYPTION_KEY` | (generate random string) |
| `NODE_ENV` | `production` |

### Render

1. Create a new Web Service from the GitHub repo
2. Set root directory to `backend`
3. Set build command: `npm install && npm run build`
4. Set start command: `npm run start`
5. Add a PostgreSQL database from Render dashboard
6. Set the same environment variables as above

After deploying, create an admin account and an API token.

## Deploying Frontend to Vercel

```bash
cd frontend
vercel
```

Set these environment variables on Vercel:

| Variable | Value |
|---|---|
| `NEXT_PUBLIC_STRAPI_URL` | `https://your-strapi-url.railway.app` (no trailing slash) |
| `STRAPI_API_TOKEN` | (token from Strapi admin) |
| `STRAPI_PREVIEW_SECRET` | (your preview secret) |

Set the root directory to `frontend` in Vercel project settings.

## Environment Variable Reference

### Backend (Strapi)

| Variable | Required | Description |
|---|---|---|
| `HOST` | No | Server host (default: `0.0.0.0`) |
| `PORT` | No | Server port (default: `1337`) |
| `DATABASE_CLIENT` | No | `sqlite` or `postgres` (default: `sqlite`) |
| `DATABASE_URL` | Prod | PostgreSQL connection string |
| `DATABASE_SSL` | Prod | Enable SSL for database |
| `APP_KEYS` | Yes | Comma-separated encryption keys |
| `API_TOKEN_SALT` | Yes | Salt for API tokens |
| `ADMIN_JWT_SECRET` | Yes | Secret for admin JWT |
| `JWT_SECRET` | Yes | Secret for user JWT |
| `TRANSFER_TOKEN_SALT` | Yes | Salt for transfer tokens |
| `ENCRYPTION_KEY` | Yes | Encryption key |

### Frontend (Next.js)

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_STRAPI_URL` | Yes | Strapi backend URL |
| `STRAPI_API_TOKEN` | Prod | API token for server-side fetching |
| `STRAPI_PREVIEW_SECRET` | No | Secret for draft/preview mode |

## Tech Stack

- **Frontend:** Next.js 15, React 19, TypeScript, Tailwind CSS 4
- **Backend:** Strapi 5, TypeScript
- **Database:** SQLite (dev) / PostgreSQL (prod)
