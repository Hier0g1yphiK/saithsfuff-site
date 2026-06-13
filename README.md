# saithsfuff.com

Personal website for the streamer **saithsfuff** — a whimsical landing page featuring social media feeds, an about section, and a cute pastel aesthetic.

## Tech Stack

- **Frontend:** React + Next.js (App Router, Server Components)
- **Styling:** Tailwind CSS with custom whimsical theme (pastels, rounded corners, sparkles)
- **Database:** PostgreSQL via Prisma ORM
- **APIs:** Instagram Graph API, TikTok oEmbed API

## Project Structure

```
app/
  layout.tsx          # Root layout (fonts, metadata, Open Graph)
  page.tsx            # Home page (SSR, composes all sections)
  api/
    refresh-feeds/    # Cron-triggered feed cache refresh endpoint
components/
  NavBar.tsx          # Sticky responsive nav with hamburger menu
  AboutSection.tsx    # Intro/bio section
  InstagramFeed.tsx   # Instagram post grid
  TikTokFeed.tsx      # TikTok video thumbnail grid
lib/
  prisma.ts           # Prisma client singleton
  instagram.ts        # Instagram Graph API service
  tiktok.ts           # TikTok oEmbed service
  feeds.ts            # Database queries + feed refresh logic
prisma/
  schema.prisma       # Data models (InstagramPost, TikTokVideo, SiteConfig)
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database

### Setup

1. Clone the repo and install dependencies:
   ```bash
   npm install
   ```

2. Copy the environment variables and fill in your values:
   ```bash
   cp .env.example .env
   ```

3. Set up the database:
   ```bash
   npx prisma migrate dev
   ```

4. Add a `logo.png` to the `public/` directory

5. Run the dev server:
   ```bash
   npm run dev
   ```

The site will be available at [http://localhost:3000](http://localhost:3000).

## Environment Variables

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | PostgreSQL connection string |
| `INSTAGRAM_ACCESS_TOKEN` | Long-lived Instagram Graph API token |
| `REFRESH_API_KEY` | Secret key for the feed refresh endpoint |

## Feed Refresh

Social media posts are cached in the database. To refresh them:

```bash
curl -X POST http://localhost:3000/api/refresh-feeds \
  -H "Authorization: Bearer YOUR_REFRESH_API_KEY"
```

In production, set up a cron job (Vercel Cron, GitHub Actions, etc.) to call this every 30 minutes.

## Instagram Token Setup

1. Create a Meta developer app at [developers.facebook.com](https://developers.facebook.com)
2. Add the Instagram Graph API product
3. Connect the Instagram Business/Creator account to a Facebook Page
4. Generate a short-lived token in the Graph API Explorer (`instagram_basic` permission)
5. Exchange for a long-lived token (~60 days):
   ```
   GET https://graph.instagram.com/access_token?grant_type=ig_exchange_token&client_secret={APP_SECRET}&access_token={SHORT_LIVED_TOKEN}
   ```
6. Set as `INSTAGRAM_ACCESS_TOKEN` in `.env`

## TikTok Videos

TikTok doesn't provide a public feed API. Videos are stored manually in the `tiktok_videos` table. The refresh endpoint fetches updated thumbnails/titles via oEmbed for any stored URLs.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
