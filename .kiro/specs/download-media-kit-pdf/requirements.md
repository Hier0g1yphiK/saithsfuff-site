# Requirements Document

## Introduction

This feature adds a "Download Media Kit" button to the portfolio page (`/portfolio`) that generates a branded PDF media kit from the existing portfolio data and triggers a browser download. The PDF collates platform statistics, audience demographics, brand collaborations, content examples, and contact information into a polished document styled with the site's whimsical pastel aesthetic (soft pinks, lavenders, mints, rounded elements). PDF generation happens entirely client-side to remain compatible with the site's static export deployment on GitHub Pages.

## Glossary

- **PDF_Generator**: The client-side module responsible for constructing and rendering the media kit PDF document from structured data
- **Download_Button**: The interactive UI element on the portfolio page that initiates PDF generation and download
- **Media_Kit_Data**: The structured TypeScript data exported from `lib/media-kit-data.ts` including platform stats, demographics, collaborations, content examples, and contact info
- **Portfolio_Page**: The `/portfolio` route that displays the media kit content and hosts the Download_Button
- **Brand_Theme**: The site's visual identity consisting of pastel pink, lavender, and mint color palette, Fredoka display font, Nunito body font, and rounded/pill-shaped elements

## Requirements

### Requirement 1: Download Button Placement and Appearance

**User Story:** As a content creator, I want a clearly visible download button on my portfolio page, so that brand partners can easily find and download my media kit.

#### Acceptance Criteria

1. THE Portfolio_Page SHALL display a Download_Button within the hero section, positioned directly below the quick stats row with a top margin matching the quick stats top margin (mt-8)
2. THE Download_Button SHALL use the site's gradient pill button styling: rounded-pill shape, bg-gradient-to-r from-pink-400 to-lavender-400, white text, font-display text-sm font-semibold, shadow-whimsical, with hover:shadow-glow and hover:scale-105 transition
3. THE Download_Button SHALL display the label "Download Media Kit" preceded by a download icon (downward arrow into tray)
4. WHILE the page is in dark mode, THE Download_Button SHALL render with a gradient of from-lavender-500 to-pink-500 and maintain white text with shadow-whimsical styling
5. THE Download_Button SHALL have a minimum tap target size of 44×44 CSS pixels and an accessible name of "Download Media Kit"

### Requirement 2: PDF Generation Trigger

**User Story:** As a brand partner visiting the portfolio, I want to click a button and receive a PDF, so that I can review the creator's media kit offline or share it with my team.

#### Acceptance Criteria

1. WHEN a user clicks the Download_Button, THE PDF_Generator SHALL generate a PDF document containing the platform statistics, audience demographics, brand collaborations, content examples, and contact information from the Media_Kit_Data
2. WHEN PDF generation completes, THE PDF_Generator SHALL trigger a browser file download with the filename "saithsfuff-media-kit.pdf"
3. WHILE the PDF_Generator is generating the document, THE Download_Button SHALL display a visible animated indicator and be disabled to prevent additional clicks
4. WHEN PDF generation completes successfully, THE Download_Button SHALL return to its default enabled state within 1 second of download initiation
5. IF PDF generation fails, THEN THE PDF_Generator SHALL display an error message indicating the generation failed and THE Download_Button SHALL return to its default enabled state
6. IF the user clicks the Download_Button while generation is already in progress, THE System SHALL ignore the click and not initiate a second generation

### Requirement 3: PDF Content — Introduction Section

**User Story:** As a brand partner, I want to see who the creator is at a glance, so that I can quickly assess brand alignment.

#### Acceptance Criteria

1. THE PDF_Generator SHALL render the introduction section as the first content section of the PDF, containing the creator name ("saithsfuff"), the tagline (max 280 characters), and the personal brand statement sourced from the Media_Kit_Data
2. THE PDF_Generator SHALL display follower counts for each platform (Twitch, Instagram, TikTok) in the introduction section, using the formatted follower string values from the Media_Kit_Data platformStats array (e.g., "18.4K", "56.6K", "70.5K")
3. THE PDF_Generator SHALL source the introduction content from the Media_Kit_Data module (platformStats, contactInfo) and the MediaKitHero component data (creator name, tagline text)
4. IF any required introduction field (creator name, tagline, or platformStats entry) is missing or empty in the source data, THEN THE PDF_Generator SHALL omit that individual element from the introduction section without preventing the remainder of the section from rendering

### Requirement 4: PDF Content — Platform Statistics

**User Story:** As a brand partner, I want to see detailed platform metrics, so that I can evaluate reach and engagement potential.

#### Acceptance Criteria

1. THE PDF_Generator SHALL include a platform statistics section listing each platform from the Media_Kit_Data in the order they appear in the platformStats array
2. THE PDF_Generator SHALL display the platform icon, platform name, follower count, and average views for each platform entry, rendering follower count and average views as pre-formatted strings (e.g., "18.4K", "3.4K") exactly as provided in the data
3. THE PDF_Generator SHALL render each platform entry as a separate visual card or block, each assigned a distinct background or border color from the Brand_Theme color palette (pink, lavender, or mint) such that no two adjacent entries share the same color
4. IF the platformStats array in Media_Kit_Data is empty, THEN THE PDF_Generator SHALL omit the platform statistics section entirely from the generated PDF

### Requirement 5: PDF Content — Audience Demographics

**User Story:** As a brand partner, I want to understand the audience composition, so that I can determine if the creator's audience matches my target market.

#### Acceptance Criteria

1. THE PDF_Generator SHALL include an audience demographics section containing four subsections: age range breakdown, gender distribution, top geographic locations, and audience interests, each rendered with a visible heading label
2. THE PDF_Generator SHALL render each age range entry from Media_Kit_Data as the range label paired with its percentage value displayed as a whole integer followed by a "%" symbol, in the same order as the source data
3. THE PDF_Generator SHALL render each gender entry from Media_Kit_Data as the gender label paired with its percentage value displayed as a whole integer followed by a "%" symbol, in the same order as the source data
4. THE PDF_Generator SHALL render the top locations as up to 5 entries from Media_Kit_Data, each displaying the country name paired with its percentage value as a whole integer followed by a "%" symbol, in the same order as the source data
5. THE PDF_Generator SHALL render audience interests as up to 10 category labels from Media_Kit_Data, in the same order as the source data
6. IF the Media_Kit_Data contains no entries for any demographics subsection (age, gender, locations, or interests), THEN THE PDF_Generator SHALL omit that subsection from the audience demographics section

### Requirement 6: PDF Content — Brand Collaborations

**User Story:** As a brand partner, I want to see past collaborations, so that I can assess professionalism and relevance to my industry.

#### Acceptance Criteria

1. THE PDF_Generator SHALL include a brand collaborations section with the heading "Brands I've Worked With" listing each entry from the Media_Kit_Data brandCollaborations array in source order
2. THE PDF_Generator SHALL display the logoPlaceholder, brand name, and category for each collaboration entry
3. IF the brandCollaborations array in Media_Kit_Data is empty, THEN THE PDF_Generator SHALL omit the brand collaborations section from the PDF

### Requirement 7: PDF Content — Content Examples

**User Story:** As a brand partner, I want to see high-performing content, so that I can evaluate content quality and audience engagement.

#### Acceptance Criteria

1. THE PDF_Generator SHALL include a content examples section with a "Content Examples" heading, listing all content entries from the Media_Kit_Data in their defined array order
2. THE PDF_Generator SHALL display for each content example entry: the content title (truncated to 80 characters with ellipsis if exceeded), the platform name, and the view count string as provided in the data
3. THE PDF_Generator SHALL render a colored thumbnail placeholder for each content example using the entry's thumbnailColor value
4. IF the Media_Kit_Data contains zero content example entries, THEN THE PDF_Generator SHALL omit the content examples section entirely from the PDF

### Requirement 8: PDF Content — Contact Information

**User Story:** As a brand partner, I want to know how to reach the creator, so that I can initiate a partnership conversation.

#### Acceptance Criteria

1. THE PDF_Generator SHALL include a contact section as the last section of the PDF, containing the email address from the Media_Kit_Data rendered as a clickable mailto hyperlink
2. THE PDF_Generator SHALL include all social media profile links from the Media_Kit_Data in the contact section, displaying each entry's platform name and label as a clickable hyperlink to the entry's URL, in the order defined by the socialLinks array
3. THE PDF_Generator SHALL render the contact section with a visible heading that identifies it as the contact section

### Requirement 9: PDF Visual Styling

**User Story:** As a content creator, I want my PDF media kit to reflect my brand aesthetic, so that it reinforces my personal brand when shared with partners.

#### Acceptance Criteria

1. THE PDF_Generator SHALL apply the Brand_Theme pastel color palette (pink, lavender, mint) to section headers, dividers, and accent elements, where section headers use lavender as the primary accent, dividers use pink, and background fills use mint
2. THE PDF_Generator SHALL apply a minimum border radius of 8px to all card and container elements within the PDF to maintain the Brand_Theme rounded aesthetic
3. THE PDF_Generator SHALL produce a PDF in portrait orientation sized for US Letter (8.5 × 11 inches) with a minimum margin of 0.5 inches on all sides
4. THE PDF_Generator SHALL render headings using an embedded or system sans-serif display font at a minimum size of 16pt, and body text using a sans-serif font at a minimum size of 10pt and maximum of 12pt, ensuring all fonts are embedded in the PDF or are standard system fonts guaranteed to render without substitution
5. IF the PDF_Generator cannot embed a specified font, THEN THE PDF_Generator SHALL fall back to a system sans-serif font (such as Helvetica or Arial) rather than producing the PDF with missing or substituted glyphs

### Requirement 10: Client-Side Generation Compatibility

**User Story:** As a developer, I want PDF generation to work entirely in the browser, so that the feature is compatible with the static export deployment on GitHub Pages.

#### Acceptance Criteria

1. THE PDF_Generator SHALL execute entirely in the client browser without requiring server-side API calls or external network requests for PDF assembly
2. WHILE the site is deployed as a static export (Next.js `output: 'export'`), THE PDF_Generator SHALL produce a valid downloadable PDF file without depending on server-side rendering, API routes, or Node.js-only modules
3. WHEN the user activates the Download_Button, IF the browser does not support the Blob API or ArrayBuffer API, THEN THE Download_Button SHALL display an error message indicating that PDF download is unavailable in the current browser
4. IF PDF generation fails after the user initiates download, THEN THE PDF_Generator SHALL display an error message indicating the failure and SHALL NOT produce a corrupted or incomplete file download

### Requirement 11: Error Handling

**User Story:** As a user, I want to know if something goes wrong during PDF generation, so that I can try again or use an alternative method to get the media kit.

#### Acceptance Criteria

1. IF PDF generation fails due to a runtime error, THEN THE PDF_Generator SHALL display an error notification as a toast or inline message that describes the failure reason in plain language, does not obscure page content, and remains visible until dismissed by the user or until 10 seconds have elapsed
2. IF PDF generation fails, THEN THE Download_Button SHALL return to its enabled, idle state (matching its appearance before the user initiated generation) within 1 second of the failure, allowing the user to retry
3. IF an error notification is displayed, THEN THE PDF_Generator SHALL allow the user to dismiss the notification by activating a close control within the notification
