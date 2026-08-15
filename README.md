# Fluidly Website

Marketing site and blog for Fluidly, the Process Intelligence Operating System for work. Built with Next.js App Router, React 19, and Sanity for the blog, deployed on Vercel.

## Stack

- Next.js 16 (App Router, Turbopack)
- React 19, TypeScript
- Bun (package manager and runtime)
- Motion for animation, hand-authored CSS with design tokens (no Tailwind)
- next-themes for light/dark
- Sanity (embedded Studio) for the blog
- Resend for the demo-request form

## Local setup

```bash
bun install
cp .env.local.example .env.local   # fill in the values below
bun run dev                        # http://localhost:3000
```

Studio for blog authoring runs at `/studio` on the same dev server.

## Environment variables

Set these in `.env.local` locally and in the Vercel project for production.

| Variable | Required | Purpose |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | yes | Sanity project id (`cmaa3p5c`) |
| `NEXT_PUBLIC_SANITY_DATASET` | yes | Sanity dataset (`production`) |
| `SANITY_API_READ_TOKEN` | yes | Viewer token. The dataset is private, so blog reads need it. Server-only, never exposed to the browser. |
| `SANITY_REVALIDATE_SECRET` | for instant publish | Shared secret for the publish webhook that revalidates blog pages |
| `RESEND_API_KEY` | for email delivery | Sends demo-request leads. Without it the form still works and logs leads to the server console. |
| `DEMO_TO_EMAIL` | for email delivery | Where leads are sent (`contact@fluidly.ai`) |

## Scripts

```bash
bun run dev       # dev server
bun run build     # production build
bun run start     # serve the production build
bun run lint      # ESLint
bun run typegen   # regenerate Sanity types after schema or query changes
```

## Structure

```
app/
  page.tsx              # marketing homepage
  blog/                 # blog index + post pages
  studio/               # embedded Sanity Studio at /studio
  api/demo/             # demo-request form handler
  api/revalidate/       # Sanity publish webhook -> on-demand revalidation
  sitemap.ts, robots.ts # SEO
components/
  sections/             # homepage narrative sections
  blog/                 # blog cards + portable text rendering
  layout/               # nav, footer, theme toggle
  fx/                   # particle field, scroll scenes
  ui/                   # buttons, reveal, counters
sanity/                 # client, queries, schema, Studio config
lib/logger.ts           # leveled colored server logger
```

## Blog authoring

Maintainers write posts in the Studio at `/studio` (sign in with a Sanity account added to the project). Publishing triggers the revalidation webhook, so posts appear on the site within seconds without a redeploy.

To wire the webhook: in Sanity manage, add a GROQ webhook pointing at `https://<domain>/api/revalidate`, filter `_type in ["post","author"]`, projection `{ "tags": [_type, _type + ":" + slug.current] }`, secret set to `SANITY_REVALIDATE_SECRET`.

## Deploy

Vercel, connected to this repo. Set the environment variables above in the project settings. Add the production domain to Sanity CORS:

```bash
npx sanity cors add https://<your-domain> --credentials
```
