# Implementation Plan: saithsfuff-homepage

## Overview

Build the saithsfuff.com home page using Next.js App Router with Server Components. The implementation proceeds from project setup and data layer through component implementation, feed integration, and responsive whimsical theming. Each task builds incrementally so there is no orphaned code.

## Tasks

- [x] 1. Set up Next.js project structure and Tailwind CSS with whimsical theme
  - [x] 1.1 Initialize Next.js project with App Router, TypeScript, and Tailwind CSS
    - Create `app/` directory structure with `layout.tsx` and `page.tsx` stubs
    - Install dependencies: `next`, `react`, `react-dom`, `tailwindcss`, `postcss`, `autoprefixer`
    - Configure `tsconfig.json` and `next.config.js`
    - _Requirements: 7.1, 7.2_

  - [x] 1.2 Configure Tailwind theme with whimsical design tokens
    - Define custom color palette (soft pastels: pinks, lavenders, mints) in `tailwind.config.ts`
    - Set default border-radius to minimum 8px for card/container elements
    - Add playful display font and legible sans-serif body font
    - Configure decorative utility classes for stars/sparkles/gradients
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5_

  - [ ]* 1.3 Write property test for theme color contrast (Property 4)
    - **Property 4: Theme color pairs meet WCAG contrast ratio**
    - Generate all text/background color combinations from the theme config
    - Compute WCAG contrast ratio for each pair
    - Assert: ratio >= 4.5 for all body-text color pairs
    - **Validates: Requirements 5.5**

  - [ ]* 1.4 Write property test for card border-radius (Property 3)
    - **Property 3: Card elements have minimum border-radius**
    - Generate random sets of card/container class names from theme config
    - Resolve each class to its CSS border-radius value
    - Assert: numeric border-radius >= 8px
    - **Validates: Requirements 5.2**

- [x] 2. Set up Prisma ORM and database models
  - [x] 2.1 Install Prisma and configure PostgreSQL connection
    - Install `prisma` and `@prisma/client`
    - Create `prisma/schema.prisma` with datasource and generator
    - Configure `.env` with `DATABASE_URL` placeholder
    - _Requirements: 7.1_

  - [x] 2.2 Define data models for Instagram posts, TikTok videos, and site config
    - Add `InstagramPost` model with fields: id, mediaType, mediaUrl, thumbnailUrl, permalink, caption, postedAt, cachedAt, isActive
    - Add `TikTokVideo` model with fields: id, title, thumbnailUrl, videoUrl, permalink, createdAt, cachedAt, isActive
    - Add `SiteConfig` model with key-value structure
    - Generate Prisma client
    - _Requirements: 3.3, 4.3_

  - [x] 2.3 Create Prisma client singleton utility
    - Create `lib/prisma.ts` with singleton pattern for Prisma Client (avoid multiple instances in development)
    - _Requirements: 7.1_

- [x] 3. Implement service layer for feed data access
  - [x] 3.1 Implement Instagram service (`lib/instagram.ts`)
    - Define `InstagramMedia` interface matching design
    - Implement `fetchInstagramMedia(accessToken: string, limit?: number)` function
    - Call Instagram Graph API `/me/media` endpoint with required fields
    - Handle API errors gracefully and return empty array on failure
    - _Requirements: 3.3, 3.6_

  - [x] 3.2 Implement TikTok service (`lib/tiktok.ts`)
    - Define `TikTokVideo` interface matching design
    - Implement `fetchTikTokOEmbed(videoUrl: string)` function
    - Call TikTok oEmbed endpoint for thumbnail/title data
    - Handle API errors gracefully
    - _Requirements: 4.3, 4.6_

  - [x] 3.3 Implement feeds data layer (`lib/feeds.ts`)
    - Implement `getInstagramPosts()` — query database for cached posts ordered by timestamp desc
    - Implement `getTikTokVideos()` — query database for cached videos ordered by creation date desc
    - Implement `refreshInstagramFeed()` — fetch from API, upsert into database, return count
    - Implement `refreshTikTokFeed()` — fetch from stored URLs via oEmbed, upsert into database, return count
    - _Requirements: 3.3, 3.6, 4.3, 4.6_

  - [ ]* 3.4 Write unit tests for feed service functions
    - Mock Prisma client and test `getInstagramPosts()` returns correctly shaped data
    - Mock Prisma client and test `getTikTokVideos()` returns correctly shaped data
    - Test error handling when database queries fail
    - _Requirements: 3.3, 3.6, 4.3, 4.6_

- [x] 4. Checkpoint - Ensure data layer compiles and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 5. Implement page layout and navigation bar
  - [x] 5.1 Implement root layout (`app/layout.tsx`)
    - Set global metadata: title, description, Open Graph tags
    - Load custom fonts (playful display + sans-serif body)
    - Apply global Tailwind styles and whimsical theme
    - _Requirements: 7.3, 5.3_

  - [x] 5.2 Implement NavBar component (`components/NavBar.tsx`)
    - Add `"use client"` directive for mobile menu toggle state
    - Render sticky navigation bar at viewport top
    - Display clickable logo image linking to `/`
    - Implement responsive behavior: full nav links on desktop, hamburger menu on mobile (<768px)
    - Apply whimsical theme styling (soft background colors, rounded elements)
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 6.4_

  - [ ]* 5.3 Write unit tests for NavBar component
    - Test logo renders as clickable link to `/`
    - Test sticky positioning class is applied
    - Test hamburger menu renders at mobile viewport
    - _Requirements: 1.1, 1.2, 1.4, 6.4_

- [x] 6. Implement About section
  - [x] 6.1 Implement AboutSection component (`components/AboutSection.tsx`)
    - Render as Server Component (no `"use client"`)
    - Display heading and introductory paragraph about the streamer
    - Apply whimsical typography and decorative accents
    - Ensure responsive text sizing for viewports 320px–1920px
    - _Requirements: 2.1, 2.2, 2.3, 2.4_

  - [ ]* 6.2 Write unit tests for AboutSection component
    - Test heading and paragraph text render correctly
    - Test whimsical styling classes are applied
    - _Requirements: 2.1, 2.2, 2.3_

- [x] 7. Implement Instagram feed component
  - [x] 7.1 Implement InstagramFeed component (`components/InstagramFeed.tsx`)
    - Render as Server Component receiving posts array as props
    - Display "Follow on Instagram" heading
    - Render responsive grid: 1 column on mobile, 2-3 columns on desktop
    - Each image links to original post with `target="_blank"`
    - Include link to saithsfuff Instagram profile
    - Show fallback message if posts array is empty/undefined
    - _Requirements: 3.1, 3.2, 3.3, 3.4, 3.5, 3.6_

  - [ ]* 7.2 Write property test for Instagram feed grid rendering (Property 1)
    - **Property 1: Feed grid renders exactly one item per input entry**
    - Generate random arrays of valid InstagramPost objects (length 1-50)
    - Render InstagramFeed component with generated data
    - Assert: number of grid item elements === input array length
    - **Validates: Requirements 3.3**

  - [ ]* 7.3 Write property test for Instagram feed links (Property 2)
    - **Property 2: Feed items link to their original permalink in a new tab**
    - Generate random InstagramPost items with random permalink URLs
    - Render InstagramFeed component
    - Assert: each rendered link has `href === item.permalink` and `target === "_blank"`
    - **Validates: Requirements 3.5**

- [x] 8. Implement TikTok feed component
  - [x] 8.1 Implement TikTokFeed component (`components/TikTokFeed.tsx`)
    - Render as Server Component receiving videos array as props
    - Display "Follow on TikTok" heading
    - Render responsive grid: 1 column on mobile, 2-3 columns on desktop
    - Each thumbnail links to original video with `target="_blank"`
    - Include link to saithsfuff TikTok channel
    - Show fallback message if videos array is empty/undefined
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 4.6_

  - [ ]* 8.2 Write property test for TikTok feed grid rendering (Property 1)
    - **Property 1: Feed grid renders exactly one item per input entry**
    - Generate random arrays of valid TikTokVideo objects (length 1-50)
    - Render TikTokFeed component with generated data
    - Assert: number of grid item elements === input array length
    - **Validates: Requirements 4.3**

  - [ ]* 8.3 Write property test for TikTok feed links (Property 2)
    - **Property 2: Feed items link to their original permalink in a new tab**
    - Generate random TikTokVideo items with random permalink URLs
    - Render TikTokFeed component
    - Assert: each rendered link has `href === item.permalink` and `target === "_blank"`
    - **Validates: Requirements 4.5**

- [x] 9. Checkpoint - Ensure all components render correctly and tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 10. Implement feed refresh API route
  - [x] 10.1 Implement refresh-feeds API route (`app/api/refresh-feeds/route.ts`)
    - Create POST handler
    - Validate `Authorization` header against stored API key
    - Return 401 for missing/invalid API keys
    - Call `refreshInstagramFeed()` and `refreshTikTokFeed()`
    - Return JSON response with success status, counts, and any errors
    - Handle internal failures with 500 status and non-sensitive error details
    - _Requirements: 3.3, 3.6, 4.3, 4.6_

  - [ ]* 10.2 Write unit tests for refresh-feeds API route
    - Test 401 response for missing/invalid API key
    - Test successful refresh returns counts
    - Test partial failure handling (one feed fails, other succeeds)
    - _Requirements: 3.6, 4.6_

- [x] 11. Wire everything together in the home page
  - [x] 11.1 Compose home page (`app/page.tsx`)
    - Import and call `getInstagramPosts()` and `getTikTokVideos()` server-side
    - Render page sections in order: NavBar → AboutSection → InstagramFeed → TikTokFeed
    - Pass fetched feed data as props to feed components
    - Ensure full SSR with no client-side data fetching for initial content
    - _Requirements: 7.1, 7.2, 7.3, 6.1, 6.2, 6.3_

  - [ ]* 11.2 Write integration tests for SSR rendering
    - Verify HTML response from `/` contains About section content
    - Verify HTML contains meta tags (title, description, Open Graph)
    - Verify HTML contains feed section headings
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 12. Final checkpoint - Ensure all tests pass and application builds
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document using fast-check
- Unit tests validate specific examples and edge cases
- The feed refresh mechanism is designed to be triggered by an external cron job (e.g., Vercel Cron)
