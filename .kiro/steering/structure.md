# Project Structure

```
app/                    # Next.js App Router pages and layouts
├── layout.tsx          # Root layout (fonts, metadata, theme script)
├── page.tsx            # Homepage
├── globals.css         # Tailwind layers + custom component/utility classes
├── links/page.tsx      # Links page
├── portfolio/page.tsx  # Portfolio / Media Kit page
├── smp/page.tsx        # SMP (Minecraft server) page
└── api/                # API routes

components/             # React components organized by page/feature
├── shared/             # Cross-page components (NavBar, ThemeToggle, DecorativeStars, PasswordGate)
├── home/               # Homepage sections (HomeHero, TwitchSection, InstagramFeed, TikTokFeed)
├── links/              # Links page components (LinkCard, LinksHero, SocialLinksSection, PartnersSection)
├── media-kit/          # Portfolio/Media Kit page components (MediaKitHero, PlatformStats, etc.)
├── smp/                # SMP page components (SmpHero, JavaSection, BedrockSection, etc.)
└── splash/             # Splash/password gate components (SplashPage, PasswordForm)

lib/                    # Shared utilities, data, and helpers
├── auth.ts             # Password gate authentication helpers
├── constants.ts        # Shared constants (BASE_PATH)
├── links-data.ts       # Static link/partner data
├── media-kit-data.ts   # Media kit / portfolio static data
└── smp-data.ts         # SMP page static data

prisma/                 # Database schema and migrations
├── schema.prisma
└── migrations/

public/images/          # Static assets (logos, icons, partner images)

__tests__/              # Test files mirroring components/ structure
└── components/
    ├── home/
    └── links/
```

## Conventions

- **Page structure**: Each page renders `<DecorativeStars />`, `<NavBar />`, a `<main>` with section components, and a `<footer>`.
- **Component files**: One default export per file, named to match the file. Use `"use client"` directive only when client interactivity is needed.
- **Styling**: Use Tailwind utility classes inline. Use the project's custom classes (`whimsical-card`, `section-container`, `gradient-text`, `glass-card`, `sparkle-divider`) for consistent theming.
- **Dark mode**: Always include `dark:` variants for text, backgrounds, and borders.
- **Accessibility**: External links include `target="_blank"`, `rel="noopener noreferrer"`, and a `<span className="sr-only">(opens in new tab)</span>`. Use semantic HTML, proper heading hierarchy, and ARIA attributes where needed.
- **Images**: Use `next/image` with explicit `width`/`height` and descriptive `alt` text.
- **Static data**: Keep static content arrays in `lib/` files with TypeScript interfaces.
- **Tests**: Place test files in `__tests__/` mirroring the component path. Use React Testing Library with `screen` queries. Mock external dependencies (e.g., `next/script`, `next/image`).
- **Path aliases**: Use `@/` to reference the project root (e.g., `@/components/shared/NavBar`).
