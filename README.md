# saithsfuff.com

Personal website for the streamer **saithsfuff** — a whimsical landing page featuring social media feeds, an about section, and a cute pastel aesthetic.

## Tech Stack

- **Frontend:** React + Next.js (App Router, Server Components)
- **Styling:** Tailwind CSS with custom whimsical theme (pastels, rounded corners, sparkles)
- **Database:** PostgreSQL via Prisma ORM
- **APIs:** Curator.io (Instagram & TikTok feeds), TikTok oEmbed API

## Project Structure

```
app/
  layout.tsx          # Root layout (fonts, metadata, theme script)
  page.tsx            # Homepage (hero, Twitch embed, Instagram & TikTok feeds)
  globals.css         # Tailwind layers + custom component/utility classes
  links/page.tsx      # Links page (link-in-bio with socials & partners)
  smp/page.tsx        # SMP page (Minecraft server info & connection guide)
  portfolio/page.tsx  # Portfolio & Media Kit page (stats, collabs, contact CTA)
  api/
    refresh-feeds/    # Cron-triggered feed cache refresh endpoint

components/
  shared/             # Cross-page components
    NavBar.tsx        # Sticky responsive nav with hamburger menu & theme toggle
    DecorativeStars.tsx  # Fixed-position animated sparkle background
    ThemeToggle.tsx   # Light/dark mode toggle (localStorage)
  home/               # Homepage sections
    HomeHero.tsx      # Profile image, headline, tagline
    TwitchSection.tsx # Embedded Twitch player with error/loading states
    InstagramFeed.tsx # Instagram post grid
    TikTokFeed.tsx    # TikTok video thumbnail grid
  links/              # Links page components
    LinksHero.tsx     # Page title and tagline
    LinkCard.tsx      # Reusable external link card (icon, name, description)
    SocialLinksSection.tsx  # Social media links list
    PartnersSection.tsx     # Partner & sponsor links list
  smp/                # SMP page components
    SmpHero.tsx       # Page hero with server name and tagline
    ServerIpDisplay.tsx  # Client component — copy-to-clipboard IP display
    JavaSection.tsx   # Java Edition connection instructions
    BedrockSection.tsx   # Bedrock Edition connection instructions
  media-kit/          # Portfolio/media kit page components
    MediaKitHero.tsx
    PlatformStats.tsx
    AudienceDemographics.tsx
    BrandCollaborations.tsx
    ContentExamples.tsx
    ContactCTA.tsx

lib/                  # Shared utilities, data, and helpers
  constants.ts        # BASE_PATH for asset URLs
  links-data.ts       # Static link/partner data (LinkItem interface)
  media-kit-data.ts   # Media kit static data
  smp-data.ts         # SMP page static data (SmpPageData, SmpHeroData, SmpConnectionSection)

prisma/               # Database schema and migrations
  schema.prisma
  migrations/

public/images/        # Static assets (logos, icons, partner images)

__tests__/            # Test files mirroring components/ structure
  components/
    home/
    links/
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
| `REFRESH_API_KEY` | Secret key for the feed refresh endpoint |

## Feed Refresh

Social media posts are cached in the database. To refresh them:

```bash
curl -X POST http://localhost:3000/api/refresh-feeds \
  -H "Authorization: Bearer YOUR_REFRESH_API_KEY"
```

In production, set up a cron job (Vercel Cron, GitHub Actions, etc.) to call this every 30 minutes.

## Social Feeds (Curator.io)

Both the Instagram and TikTok feeds on the homepage are powered by [Curator.io](https://curator.io) embeds. No API tokens are needed — the feeds load via client-side scripts managed in Curator's dashboard.

## TikTok Videos

TikTok doesn't provide a public feed API. Videos are stored manually in the `tiktok_videos` table. The refresh endpoint fetches updated thumbnails/titles via oEmbed for any stored URLs.

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest test suite |
| `npx prisma migrate dev` | Run database migrations |
| `npx prisma generate` | Regenerate Prisma client |
