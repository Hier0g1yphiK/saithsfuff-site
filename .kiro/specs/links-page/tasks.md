# Implementation Plan: Links Page

## Overview

Implement a Linktree-style links page at `/links` that displays Faith's social media profiles and partner/sponsor links with promotional codes. The page follows the existing page pattern (DecorativeStars → NavBar → main → footer) and uses the whimsical pastel design system. All link data lives in a typed static data file.

## Tasks

- [x] 1. Create data layer and shared interfaces
  - [x] 1.1 Create `lib/links-data.ts` with LinkItem interface and data arrays
    - Define the `LinkItem` interface with `name` (string), `href` (string), and optional `description` (string)
    - Export `socialLinks` array with all 9 social media entries in the specified order (Instagram, TikTok, Twitch, Twitter, BlueSky, YouTube, Threads, Clips TikTok, Discord)
    - Export `partnerLinks` array with all 6 partner entries in the specified order (Throne, Kinetic Hosting, Pin-Ace, Oodie, Divoom, Charlotte Tilbury)
    - Each entry must have the exact URLs and descriptions from the requirements
    - _Requirements: 3.2–3.11, 4.2–4.8_

- [x] 2. Implement LinkCard component
  - [x] 2.1 Create `components/links/LinkCard.tsx`
    - Accept props: `name` (string, required), `href` (string, required), `description` (string, optional)
    - Render as an `<a>` element with `target="_blank"` and `rel="noopener noreferrer"`
    - Apply `whimsical-card` styling with hover transform/shadow transition
    - Truncate name with `truncate` and `max-w-[50ch]`; truncate description with `line-clamp-2`
    - Include visible focus ring (`focus-visible:ring-2 ring-pink-400 dark:ring-lavender-400`)
    - Add external link SVG icon and visually-hidden "(opens in new tab)" text
    - Ensure full-width layout (`w-full`) and minimum height of 44px for touch targets
    - _Requirements: 5.1–5.8, 8.2, 8.3, 3.12, 4.9_

- [x] 3. Implement page sections
  - [x] 3.1 Create `components/links/LinksHero.tsx`
    - Render an h1 heading containing the word "links" with gradient text styling
    - Render a tagline paragraph (≤150 characters) describing the page purpose
    - Use `bg-gradient-hero` for pastel gradient background
    - _Requirements: 2.1–2.3_

  - [x] 3.2 Create `components/links/SocialLinksSection.tsx`
    - Render a `<section>` with an h2 heading (e.g., "Social Media")
    - Import `socialLinks` from `lib/links-data.ts`
    - Map over the array rendering `LinkCard` for each entry
    - Stack cards vertically with appropriate gap
    - _Requirements: 3.1, 3.2–3.12_

  - [x] 3.3 Create `components/links/PartnersSection.tsx`
    - Render a `<section>` with an h2 heading "Partners & Sponsors"
    - Import `partnerLinks` from `lib/links-data.ts`
    - Map over the array rendering `LinkCard` for each entry
    - Ensure partner name is visible as primary label and description as supporting text
    - _Requirements: 4.1, 4.2–4.10_

- [x] 4. Create the page route and integrate NavBar
  - [x] 4.1 Create `app/links/page.tsx`
    - Export metadata with title "Links | saithsfuff" and a description ≤160 characters
    - Compose the page: DecorativeStars → NavBar → main (LinksHero, sparkle-divider, SocialLinksSection, sparkle-divider, PartnersSection) → footer
    - Footer must match homepage footer styling: `py-8 text-center font-body text-sm text-text-body` with "© 2026 saithsfuff. All rights reserved."
    - _Requirements: 1.1, 1.2, 1.4, 1.5, 2.4, 6.5, 6.6_

  - [x] 4.2 Add "Links" entry to NavBar navigation
    - Add `{ label: "Links", href: "/links" }` to the `navLinks` array in `components/NavBar.tsx`
    - Verify it appears in both desktop and mobile menu
    - _Requirements: 1.3_

- [x] 5. Apply responsive and visual styling
  - [x] 5.1 Ensure responsive layout and design consistency
    - Content centered with max-width of 896px (`max-w-3xl`) and horizontal padding ≥16px (`px-4`)
    - Cards stack vertically with 12px gap below 640px viewport
    - Minimum text size of 16px and 44px tap-target height on mobile
    - Ensure no horizontal scroll from 320px to 1920px
    - Verify dark mode styling: lavender-100 headings, gray-100 body text, dark card variants
    - Use Fredoka (font-display) for headings and Nunito (font-body) for body text
    - Apply bg-gradient-whimsical in light mode
    - _Requirements: 6.1–6.6, 7.1–7.4_

- [x] 6. Checkpoint - Verify build and visual correctness
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Write unit tests
  - [x] 7.1 Write unit tests for LinkCard component
    - Test that anchor renders with correct href, target="_blank", rel="noopener noreferrer"
    - Test that name displays and truncates appropriately
    - Test that description renders when provided and is hidden when absent
    - Test that visually-hidden "(opens in new tab)" text is present
    - Test visible focus indicator class is applied
    - _Requirements: 5.1–5.8, 8.2, 8.3_

  - [x] 7.2 Write unit tests for LinksPage
    - Test that all social links render with correct href values
    - Test that all partner links render with correct href values and descriptions
    - Test heading hierarchy (single h1, h2 for each section)
    - Test that NavBar includes "Links" nav item
    - Test semantic landmarks (main, section) are present
    - _Requirements: 1.3, 3.2–3.11, 4.2–4.7, 8.1, 8.5_

- [x] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- The design explicitly states property-based testing does NOT apply to this feature (static UI with no algorithms or data transformations)
- All link data is static — no API calls or database queries
- The page follows the same layout pattern as the existing portfolio page
- Checkpoints ensure incremental validation

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "3.1"] },
    { "id": 1, "tasks": ["2.1", "3.2", "3.3"] },
    { "id": 2, "tasks": ["4.1", "4.2"] },
    { "id": 3, "tasks": ["5.1"] },
    { "id": 4, "tasks": ["7.1", "7.2"] }
  ]
}
```
