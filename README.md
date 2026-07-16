# saithsfuff.com

Personal website for **saithsfuff** — a content creator and Twitch streamer. A whimsical hub for social links, embedded streams, a Minecraft SMP page, and a media kit for brand partnerships.

## Tech Stack

- **Next.js 14** (App Router) with React 18 and TypeScript
- **Tailwind CSS 3.4** — custom pastel theme with light/dark mode
- **PostgreSQL** via Prisma ORM (v7) with `@prisma/adapter-pg`
- **Jest 30** + React Testing Library for unit tests

## Pages

| Route | Description |
|-------|-------------|
| `/` | Homepage — hero, embedded Twitch player, Instagram & TikTok feeds (Curator.io) |
| `/links` | Link-in-bio page — social profiles and partner/sponsor discount codes |
| `/portfolio` | Media kit — platform stats, audience demographics, brand collaborations, contact CTA |
| `/smp` | Minecraft SMP — server info, Java & Bedrock connection guides, whitelist form |

All pages are protected behind a client-side password gate (splash screen).

## Project Structure

```
app/                    # Next.js App Router pages
├── layout.tsx          # Root layout (fonts, metadata, theme script)
├── page.tsx            # Homepage
├── globals.css         # Tailwind layers + custom classes
├── links/page.tsx      # Links page
├── portfolio/page.tsx  # Media Kit page
└── smp/page.tsx        # SMP page

components/             # React components by page/feature
├── shared/             # NavBar, ThemeToggle, DecorativeStars, PasswordGate
├── home/               # HomeHero, TwitchSection, InstagramFeed, TikTokFeed
├── links/              # LinksHero, LinkCard, SocialLinksSection, PartnersSection
├── media-kit/          # MediaKitHero, PlatformStats, AudienceDemographics, etc.
├── smp/                # SmpHero, ServerIpDisplay, JavaSection, BedrockSection, WhitelistSection
└── splash/             # SplashPage, PasswordForm

lib/                    # Utilities and static data
├── auth.ts             # Password gate logic (sessionStorage-based)
├── constants.ts        # BASE_PATH for assets
├── links-data.ts       # Social/partner link data
├── media-kit-data.ts   # Media kit content
└── smp-data.ts         # SMP page content

prisma/                 # Database schema and migrations
public/images/          # Static assets (logos, icons, partner images)
__tests__/              # Tests mirroring components/ structure
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (for the `SiteConfig` table)

### Setup

```bash
# Install dependencies
npm install

# Create a .env.local with your values (see Environment Variables below)

# Run database migrations
npx prisma migrate dev

# Start dev server
npm run dev
```

The site runs at [http://localhost:3000](http://localhost:3000).

## Environment Variables

Create a `.env.local` file in the project root:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SITE_PASSWORD` | Password for the client-side splash gate |
| `DATABASE_URL` | PostgreSQL connection string |

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Start development server |
| `npm run build` | Production build |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |
| `npm test` | Run Jest tests |
| `npx prisma migrate dev` | Run database migrations |
| `npx prisma generate` | Regenerate Prisma client |

## Social Feeds

The Instagram and TikTok feeds on the homepage are powered by [Curator.io](https://curator.io) embeds. No API tokens are needed — feeds load via client-side scripts configured in Curator's dashboard.

## Deployment

The site is configured for static export and deployed via GitHub Pages. See `.github/workflows/nextjs.yml` for the CI/CD pipeline.
