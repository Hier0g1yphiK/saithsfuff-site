# Implementation Plan: Download Media Kit PDF

## Overview

Implement a client-side PDF generation feature on the portfolio page. A branded "Download Media Kit" button triggers jsPDF to build a multi-section PDF (intro, platform stats, demographics, collaborations, content examples, contact) styled with the site's pastel aesthetic, then downloads it as `saithsfuff-media-kit.pdf`. The architecture uses a client component wrapper, a custom hook for lifecycle management, and a pure generation module loaded via dynamic import.

## Tasks

- [x] 1. Install dependencies and set up project structure
  - [x] 1.1 Install jsPDF, jspdf-autotable, and fast-check
    - Run `npm install jspdf jspdf-autotable` and `npm install -D fast-check`
    - Verify packages appear in `package.json`
    - _Requirements: 10.1, 10.2_

  - [x] 1.2 Create PDF configuration constants module
    - Create `lib/pdf-config.ts` with `PDF_CONFIG` object containing page size (letter), orientation (portrait), margins (36pt all sides), font settings (Helvetica heading 18pt, subheading 14pt, body 11pt), color palette (pink [244,180,195], lavender [180,170,220], mint [170,220,200], textDark [40,40,40], textMuted [100,100,120]), borderRadius (8), maxLocations (5), maxInterests (10), maxTitleLength (80)
    - Export `MediaKitPdfInput` interface aggregating all data fields (creatorName, tagline, platformStats, ageBreakdown, genderDistribution, topLocations, audienceInterests, brandCollaborations, contentExamples, contactInfo)
    - _Requirements: 9.1, 9.2, 9.3, 9.4_

- [x] 2. Implement the PDF generator module
  - [x] 2.1 Create the core `generateMediaKitPdf` function
    - Create `lib/pdf-generator.ts` exporting an async function `generateMediaKitPdf(input: MediaKitPdfInput): Promise<Blob>`
    - Initialize jsPDF with letter size, portrait orientation, 36pt margins
    - Implement helper functions for drawing rounded rectangles, section headers (lavender accent), and dividers (pink)
    - Use Helvetica font family (heading bold 18pt, subheading bold 14pt, body normal 11pt)
    - Return the PDF as a Blob via `doc.output('blob')`
    - _Requirements: 9.1, 9.2, 9.3, 9.4, 9.5, 10.1, 10.2_

  - [x] 2.2 Implement Introduction section rendering
    - Render creator name ("saithsfuff") as the main heading
    - Render tagline text below (max 280 chars from input)
    - Render platform follower counts (Twitch, Instagram, TikTok) using pre-formatted strings from platformStats
    - Omit individual elements if missing/empty without breaking the section
    - _Requirements: 3.1, 3.2, 3.3, 3.4_

  - [x] 2.3 Implement Platform Statistics section rendering
    - Render each platform entry as a distinct card with alternating pastel backgrounds (pink, lavender, mint) so no two adjacent share the same color
    - Display platform name, follower count, and average views as pre-formatted strings
    - Omit entire section if platformStats array is empty
    - _Requirements: 4.1, 4.2, 4.3, 4.4_

  - [x] 2.4 Implement Audience Demographics section rendering
    - Render four subsections with visible headings: Age Range, Gender Distribution, Top Locations, Audience Interests
    - Format percentages as whole integer + "%" symbol
    - Limit locations to 5 entries, interests to 10 entries, both in source order
    - Omit any subsection whose data array is empty
    - _Requirements: 5.1, 5.2, 5.3, 5.4, 5.5, 5.6_

  - [x] 2.5 Implement Brand Collaborations section rendering
    - Render heading "Brands I've Worked With"
    - Display logoPlaceholder, brand name, and category for each entry in source order
    - Omit entire section if brandCollaborations array is empty
    - _Requirements: 6.1, 6.2, 6.3_

  - [x] 2.6 Implement Content Examples section rendering
    - Render "Content Examples" heading
    - Display title (truncated to 80 chars with "…" if exceeded), platform name, view count, and a colored placeholder block using thumbnailColor
    - Render entries in source-array order
    - Omit entire section if contentExamples array is empty
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 2.7 Implement Contact section rendering
    - Render as the last section with a visible contact heading
    - Render email as a clickable mailto hyperlink
    - Render all socialLinks as clickable hyperlinks with platform name and label, in source order
    - _Requirements: 8.1, 8.2, 8.3_

- [x] 3. Implement the usePdfGenerator hook
  - [x] 3.1 Create the `usePdfGenerator` custom hook
    - Create `lib/hooks/usePdfGenerator.ts`
    - Manage state: `'idle' | 'generating' | 'error'` with `errorMessage` and `dismissError`
    - On `generate()`: check browser Blob/ArrayBuffer support first (show error if unsupported), dynamically import `lib/pdf-generator.ts`, call `generateMediaKitPdf` with assembled data from `lib/media-kit-data.ts`, trigger download via `URL.createObjectURL` + anchor click with filename `saithsfuff-media-kit.pdf`
    - Guard against double-click: ignore if state is already `'generating'`
    - On success: revoke object URL, return to idle state within 1 second
    - On failure: set error state with plain-language message, return button to idle within 1 second, never trigger a download
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 10.1, 10.2, 10.3, 10.4, 11.2_

- [x] 4. Implement UI components
  - [x] 4.1 Create the `DownloadMediaKitButton` client component
    - Create `components/media-kit/DownloadMediaKitButton.tsx` with `"use client"` directive
    - Render a gradient pill button: `rounded-full bg-gradient-to-r from-pink-400 to-lavender-400 text-white font-display text-sm font-semibold shadow-whimsical hover:shadow-glow hover:scale-105 transition`
    - Include a download icon (SVG downward arrow into tray) before "Download Media Kit" label
    - Dark mode variant: `dark:from-lavender-500 dark:to-pink-500`
    - Minimum tap target 44×44px, accessible name "Download Media Kit" via `aria-label`
    - Show animated spinner and disable button when `state === 'generating'`
    - Use `usePdfGenerator` hook for click handler and state
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.3, 2.6_

  - [x] 4.2 Create the `ErrorToast` component
    - Create `components/media-kit/ErrorToast.tsx` with `"use client"` directive
    - Fixed position at bottom-right, does not obscure main page content
    - Display error message with close button (dismiss handler)
    - Auto-dismiss after 10 seconds (configurable via `autoHideMs` prop)
    - Styled with brand colors: pink border, white background, dark text
    - Accessible: `role="alert"`, `aria-live="assertive"`
    - _Requirements: 11.1, 11.2, 11.3_

  - [x] 4.3 Integrate `DownloadMediaKitButton` into `MediaKitHero`
    - Import and render `DownloadMediaKitButton` in `components/media-kit/MediaKitHero.tsx`
    - Position below the quick stats row with `mt-8` top margin
    - Ensure the button and error toast render correctly in both light and dark modes
    - _Requirements: 1.1_

- [x] 5. Checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Write unit tests
  - [x] 6.1 Write unit tests for `DownloadMediaKitButton`
    - Create `__tests__/components/media-kit/DownloadMediaKitButton.test.tsx`
    - Test: renders with correct label, icon, gradient classes
    - Test: shows loading spinner when generating
    - Test: button is disabled during generation (ignores additional clicks)
    - Test: button re-enables after success
    - Test: button re-enables after failure
    - Test: dark mode gradient classes applied
    - Test: minimum 44×44 tap target and aria-label present
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.3, 2.4, 2.5, 2.6_

  - [x] 6.2 Write unit tests for `ErrorToast`
    - Create `__tests__/components/media-kit/ErrorToast.test.tsx`
    - Test: renders error message text
    - Test: close button triggers onDismiss callback
    - Test: auto-dismisses after 10 seconds (fake timers)
    - Test: has role="alert" and aria-live="assertive"
    - Test: positioned fixed at bottom-right
    - _Requirements: 11.1, 11.2, 11.3_

  - [x] 6.3 Write unit tests for `usePdfGenerator` hook
    - Create `__tests__/lib/hooks/usePdfGenerator.test.ts`
    - Test: initial state is idle with no error
    - Test: transitions to generating on generate() call
    - Test: returns to idle after successful generation
    - Test: sets error state and message on failure
    - Test: dismissError clears error state
    - Test: ignores generate() call when already generating
    - Test: shows browser compatibility error when Blob API unavailable
    - Test: download filename is "saithsfuff-media-kit.pdf"
    - _Requirements: 2.1, 2.2, 2.3, 2.4, 2.5, 2.6, 10.3, 10.4_

  - [x] 6.4 Write unit tests for `generateMediaKitPdf`
    - Create `__tests__/lib/pdf-generator.test.ts`
    - Test: returns a Blob with type "application/pdf"
    - Test: PDF uses letter page size (612×792 points)
    - Test: omits platform stats section when array is empty
    - Test: omits brand collaborations section when array is empty
    - Test: omits content examples section when array is empty
    - Test: truncates content titles exceeding 80 characters
    - Test: uses Helvetica font (system sans-serif fallback)
    - _Requirements: 4.4, 6.3, 7.4, 9.3, 9.4, 9.5_

- [x] 7. Write property-based tests
  - [x] 7.1 Write property test: PDF section completeness
    - **Property 1: PDF section completeness**
    - Generate random valid `MediaKitPdfInput` with all non-empty arrays
    - Assert generated PDF text contains all six section headings in order
    - **Validates: Requirements 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1**

  - [x] 7.2 Write property test: Graceful omission of empty sections
    - **Property 2: Graceful omission of empty sections**
    - Generate inputs with randomly empty arrays
    - Assert PDF is valid (Blob produced) and omits headings for empty sections while retaining headings for non-empty sections
    - **Validates: Requirements 3.4, 4.4, 5.6, 6.3, 7.4**

  - [x] 7.3 Write property test: Platform stats order and field completeness
    - **Property 3: Platform stats order and field completeness**
    - Generate random platformStats arrays
    - Assert each platform name, follower count, and avgViews string appears in the PDF in source-array order
    - **Validates: Requirements 4.1, 4.2**

  - [x] 7.4 Write property test: Demographic percentage formatting
    - **Property 4: Demographic percentage formatting**
    - Generate random age/gender/location entries with integer percentages 0–100
    - Assert each appears in PDF as label + integer + "%" (no decimal)
    - **Validates: Requirements 5.2, 5.3, 5.4**

  - [x] 7.5 Write property test: Bounded list rendering
    - **Property 5: Bounded list rendering**
    - Generate topLocations arrays of varying length (0–20) and audienceInterests arrays (0–20)
    - Assert PDF contains exactly min(N, 5) locations and min(M, 10) interests in source order
    - **Validates: Requirements 5.4, 5.5**

  - [x] 7.6 Write property test: Brand collaborations order and completeness
    - **Property 6: Brand collaborations order and completeness**
    - Generate random brandCollaborations arrays
    - Assert each entry's logoPlaceholder, name, and category appear in PDF in source order
    - **Validates: Requirements 6.1, 6.2**

  - [x] 7.7 Write property test: Content title truncation
    - **Property 7: Content title truncation**
    - Generate content examples with titles of varying length (1–200 chars)
    - Assert titles > 80 chars are truncated to 80 chars + "…" in PDF; titles ≤ 80 appear in full
    - **Validates: Requirements 7.2**

  - [x] 7.8 Write property test: Contact section hyperlinks
    - **Property 8: Contact section hyperlinks**
    - Generate random contactInfo with email and socialLinks arrays
    - Assert email appears as mailto link and all socialLinks URLs appear in source order
    - **Validates: Requirements 8.1, 8.2**

  - [x] 7.9 Write property test: No download on generation failure
    - **Property 9: No download on generation failure**
    - Mock generateMediaKitPdf to throw for various inputs
    - Assert no Blob is passed to download mechanism and error state is set
    - **Validates: Requirements 2.5, 10.4**

  - [x] 7.10 Write property test: Content example ordering preservation
    - **Property 10: Content example ordering preservation**
    - Generate random contentExamples arrays
    - Assert platform name and view count for each entry appear in PDF in source-array order
    - **Validates: Requirements 7.1, 7.2**

- [x] 8. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- jsPDF and jspdf-autotable are dynamically imported on button click to avoid impacting initial page load
- All PDF generation is client-side only — no server APIs needed
- The `MediaKitPdfInput` interface decouples the generator from the data module for testability

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1", "1.2"] },
    { "id": 1, "tasks": ["2.1"] },
    { "id": 2, "tasks": ["2.2", "2.3", "2.4", "2.5", "2.6", "2.7"] },
    { "id": 3, "tasks": ["3.1", "4.2"] },
    { "id": 4, "tasks": ["4.1"] },
    { "id": 5, "tasks": ["4.3"] },
    { "id": 6, "tasks": ["6.1", "6.2", "6.3", "6.4"] },
    { "id": 7, "tasks": ["7.1", "7.2", "7.3", "7.4", "7.5", "7.6", "7.7", "7.8", "7.9", "7.10"] }
  ]
}
```
