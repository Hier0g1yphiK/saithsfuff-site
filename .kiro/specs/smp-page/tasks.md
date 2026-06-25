# Implementation Plan: SMP Page

## Overview

Build the `/smp` route that advertises the "saithsfuff SMP" community Minecraft server. Implementation follows the existing page pattern: static data file → components → page shell → NavBar integration → tests. The only client component is `ServerIpDisplay` (copy-to-clipboard interaction); everything else is server-rendered.

## Tasks

- [x] 1. Create static data file and core types
  - [x] 1.1 Create `lib/smp-data.ts` with TypeScript interfaces and exported data
    - Define `SmpHeroData`, `SmpConnectionSection`, and `SmpPageData` interfaces
    - Export the `smpData` constant with hero content, server IP, Java section steps, and Bedrock section steps
    - Use `[string, ...string[]]` tuple type for non-empty step arrays
    - Follow the same export pattern as `lib/links-data.ts`
    - _Requirements: 5.1, 5.2, 5.3, 5.5_

- [x] 2. Implement SMP components
  - [x] 2.1 Create `components/smp/SmpHero.tsx`
    - Server component rendering a `<section>` with `bg-gradient-hero` and `section-container` classes
    - Display server name as `<h1>` with `gradient-text` and `font-display`
    - Display tagline paragraph with `font-body` styling
    - Import all text from `lib/smp-data.ts`
    - Include dark mode variants (`dark:text-gray-200` for body text)
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 5.4_

  - [x] 2.2 Create `components/smp/ServerIpDisplay.tsx` (client component)
    - Add `"use client"` directive
    - Render a `<button>` displaying the server IP at `text-2xl` (≥1.5× body)
    - Implement `navigator.clipboard.writeText()` on click
    - Manage `idle` → `copied` → `idle` state with 2-second timeout
    - Show "Click to copy" label in idle state, "Copied!" in copied state
    - Add `aria-live="polite"` region for screen reader announcement
    - Add `aria-label="Copy server IP address to clipboard"`
    - Implement clipboard unavailability fallback: render selectable `<span>` with `user-select: all`
    - Clean up timeout on unmount via `useEffect` cleanup
    - _Requirements: 3.2, 3.3, 3.4, 3.5, 3.6, 3.7, 8.2, 8.3, 8.4_

  - [x] 2.3 Create `components/smp/JavaSection.tsx`
    - Server component rendering a `<section>` with `<h2>` heading
    - Wrap content in `whimsical-card` class
    - Render `ServerIpDisplay` client component
    - Display step-by-step instructions as an ordered list
    - Import section data from `lib/smp-data.ts`
    - Include dark mode variants for text, background, and border elements
    - _Requirements: 3.1, 3.2, 3.8, 5.4, 8.1_

  - [x] 2.4 Create `components/smp/BedrockSection.tsx`
    - Server component rendering a `<section>` with `<h2>` heading
    - Wrap instructions in `whimsical-card` class
    - Display step-by-step instructions as an ordered list
    - Import section data from `lib/smp-data.ts`
    - Include dark mode variants for text, background, and border elements
    - _Requirements: 4.1, 4.2, 4.3, 4.4, 4.5, 5.4_

- [x] 3. Create the SMP page route
  - [x] 3.1 Create `app/smp/page.tsx`
    - React Server Component (no `"use client"`)
    - Export `Metadata` object with `title: "SMP | saithsfuff"` and description ≤160 chars referencing the Minecraft server
    - Render page shell: `DecorativeStars` → `NavBar` → `<main>` → `<footer>`
    - Include `sparkle-divider` elements between sections
    - Apply `bg-gradient-whimsical` background and `dark:bg-[#1a0e2e]` for dark mode
    - Footer displays "© 2026 saithsfuff. All rights reserved." with `py-8 text-center font-body text-sm text-text-body` classes
    - _Requirements: 1.1, 1.2, 1.3, 6.1, 6.2, 6.3, 6.4, 6.5_

- [x] 4. Integrate SMP link into NavBar
  - [x] 4.1 Update `components/shared/NavBar.tsx` to add SMP navigation link
    - Add `{ label: "SMP", href: "/smp" }` to the `navLinks` array after existing entries
    - No structural changes needed — existing map handles desktop and mobile rendering
    - _Requirements: 7.1, 7.2, 7.3_

- [x] 5. Checkpoint - Verify build and manual review
  - Ensure all tests pass, ask the user if questions arise.

- [ ] 6. Write tests for SMP components
  - [ ]* 6.1 Create `__tests__/components/smp/smp-data.test.ts`
    - Verify `smpData.serverIp` is a non-empty string
    - Verify `smpData.hero.tagline.length <= 150`
    - Verify all steps arrays are non-empty
    - Verify all required fields are populated
    - _Requirements: 5.2, 5.3, 5.5_

  - [ ]* 6.2 Create `__tests__/components/smp/SmpHero.test.tsx`
    - Verify h1 contains server name with `gradient-text` class
    - Verify tagline renders with `font-body` class
    - Verify heading uses `font-display` class
    - Verify section uses `section-container` class
    - _Requirements: 2.1, 2.2, 2.3, 2.5_

  - [ ]* 6.3 Create `__tests__/components/smp/ServerIpDisplay.test.tsx`
    - Verify IP displays at `text-2xl` or larger
    - Verify "Click to copy" label visible in idle state
    - Verify click calls `navigator.clipboard.writeText` with correct IP
    - Verify "Copied!" appears after click then reverts after 2s (use `jest.useFakeTimers`)
    - Verify `aria-live="polite"` region announces copy success
    - Verify button element is keyboard-accessible (Enter/Space)
    - Verify fallback renders selectable text when clipboard API unavailable
    - _Requirements: 3.3, 3.4, 3.5, 3.6, 3.7, 8.2, 8.3, 8.4_

  - [ ]* 6.4 Create `__tests__/components/smp/JavaSection.test.tsx`
    - Verify h2 heading is present
    - Verify `whimsical-card` class applied
    - Verify server IP is rendered via ServerIpDisplay
    - Verify all Java steps render as list items
    - _Requirements: 3.1, 3.2, 3.8_

  - [ ]* 6.5 Create `__tests__/components/smp/BedrockSection.test.tsx`
    - Verify h2 heading is present
    - Verify `whimsical-card` class applied
    - Verify all Bedrock steps render as list items
    - _Requirements: 4.1, 4.2, 4.3, 4.5_

  - [ ]* 6.6 Create `__tests__/components/smp/SmpPage.test.tsx`
    - Verify page renders DecorativeStars, NavBar, main, footer in DOM order
    - Verify sparkle-dividers are present between sections
    - Verify background classes applied
    - _Requirements: 1.1, 1.3, 6.1, 6.4, 6.5_

  - [ ]* 6.7 Extend NavBar tests for SMP link
    - Verify "SMP" link present with `href="/smp"`
    - Verify link appears in both desktop and mobile menu layouts
    - _Requirements: 7.1, 7.2_

- [x] 7. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- The design document has no Correctness Properties section requiring property-based tests — all tests are example-based unit tests using Jest + React Testing Library
- The only client component is `ServerIpDisplay`; all other components are server-rendered
- Follow the existing patterns in `lib/links-data.ts` and `app/links/page.tsx` for consistency

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["2.1", "2.2", "2.4"] },
    { "id": 2, "tasks": ["2.3"] },
    { "id": 3, "tasks": ["3.1", "4.1"] },
    { "id": 4, "tasks": ["6.1", "6.2", "6.3", "6.4", "6.5", "6.6", "6.7"] }
  ]
}
```
