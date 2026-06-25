# Requirements Document

## Introduction

The SMP Page is a new page on saithsfuff.com that advertises the "saithsfuff SMP," a community Minecraft server. The page provides visitors with details about the server, instructions for joining on both Java Edition and Bedrock Edition, and displays the server IP address prominently. The page follows the site's established whimsical, pastel, playful aesthetic and standard page structure.

## Glossary

- **SMP_Page**: The new page at the `/smp` route that displays information about the saithsfuff SMP Minecraft server.
- **SMP_Hero**: The hero section at the top of the SMP Page containing the server name, tagline, and introductory description.
- **Java_Section**: The section displaying connection details for Minecraft Java Edition players, including the server IP address.
- **Bedrock_Section**: The section displaying connection instructions for Minecraft Bedrock Edition players.
- **Server_IP_Display**: A styled, prominent element that renders the Java Edition server IP address with a copy-to-clipboard interaction.
- **NavBar**: The site-wide sticky navigation bar component shared across all pages.
- **DecorativeStars**: The floating sparkle/star decoration overlay shared across all pages.
- **SMP_Data_File**: A static data file in `lib/` that stores all SMP page content (server IP, descriptions, instructions).

## Requirements

### Requirement 1: Page Route and Metadata

**User Story:** As a visitor, I want to access the SMP page at a dedicated URL with proper metadata, so that I can find it via navigation and search engines display relevant information.

#### Acceptance Criteria

1. WHEN a visitor navigates to the `/smp` route, THE SMP_Page SHALL render a page containing DecorativeStars, NavBar, a `<main>` element, and a footer, confirming the route is accessible and the page mounts without error.
2. THE SMP_Page SHALL export a Next.js `Metadata` object with `title` set to exactly "SMP | saithsfuff" and `description` set to a non-empty string of no more than 160 characters that references the saithsfuff SMP Minecraft server.
3. THE SMP_Page SHALL render DecorativeStars, NavBar, a `<main>` element, and a `<footer>` in that DOM order, where the footer displays "© 2026 saithsfuff. All rights reserved." and uses the same class styling (`py-8 text-center font-body text-sm text-text-body`) as other pages on the site.

### Requirement 2: SMP Hero Section

**User Story:** As a visitor, I want to see an inviting hero section when I land on the SMP page, so that I immediately understand what the saithsfuff SMP is.

#### Acceptance Criteria

1. THE SMP_Hero SHALL display the server name "saithsfuff SMP" as an h1 heading using the gradient-text style.
2. THE SMP_Hero SHALL display a tagline of no more than 150 characters below the heading, describing what the saithsfuff SMP is.
3. THE SMP_Hero SHALL use the section-container layout class for consistent spacing and max-width.
4. THE SMP_Hero SHALL include dark mode variants for text elements (using dark:text-gray-200 for body text) and background elements (using dark:bg-[#1a0e2e] or equivalent dark theme background).
5. THE SMP_Hero SHALL render the heading with the font-display typeface and the tagline with the font-body typeface.

### Requirement 3: Java Edition Connection Details

**User Story:** As a Java Edition Minecraft player, I want to see the server IP address prominently displayed, so that I can easily copy it and connect to the server.

#### Acceptance Criteria

1. THE Java_Section SHALL display a heading (h2 or h3, following the page's heading hierarchy) identifying the section as Java Edition connection information.
2. THE Java_Section SHALL display the server IP address in a styled element using the whimsical-card class, with the IP address rendered at a font size at least 1.5× the body text size.
3. THE Server_IP_Display element SHALL indicate that it is clickable by displaying a cursor pointer and a visible label or tooltip (e.g., "Click to copy") so that visitors know the copy action is available.
4. WHEN a visitor clicks the Server_IP_Display element, THE Server_IP_Display SHALL copy the IP address text to the clipboard.
5. WHEN the IP address is copied to the clipboard, THE Server_IP_Display SHALL display a visible confirmation message (e.g., text change indicating success) for a duration between 1 and 3 seconds, after which it SHALL revert to its default state.
6. WHEN the IP address is copied to the clipboard, THE Server_IP_Display SHALL announce the copy success to assistive technologies via an ARIA live region.
7. IF the clipboard API is unavailable, THEN THE Server_IP_Display SHALL still display the IP address as selectable text so visitors can copy manually.
8. THE Java_Section SHALL include dark mode variants for all text, background, and border elements.

### Requirement 4: Bedrock Edition Connection Instructions

**User Story:** As a Bedrock Edition Minecraft player, I want to see clear instructions for how to join the server, so that I can connect from my platform.

#### Acceptance Criteria

1. THE Bedrock_Section SHALL display a heading identifying the section as Bedrock Edition connection information.
2. THE Bedrock_Section SHALL display step-by-step instructions for Bedrock Edition players to connect to the server.
3. THE Bedrock_Section SHALL use the whimsical-card class for the instructions container.
4. THE Bedrock_Section SHALL include placeholder content that can be easily updated with actual instructions later.
5. THE Bedrock_Section SHALL include dark mode variants for all text, background, and border elements.

### Requirement 5: Static Data Architecture

**User Story:** As a developer, I want SMP page content stored in a static data file, so that content updates do not require modifying component code.

#### Acceptance Criteria

1. THE SMP_Data_File SHALL be located at `lib/smp-data.ts` and export named typed constants for all user-facing SMP page content, following the same export pattern used in `lib/links-data.ts`.
2. THE SMP_Data_File SHALL include one or more exported TypeScript interfaces defining the shape of each data constant, covering at minimum: server IP address (string), hero section description (string), Java section title and instructions (string and string array), and Bedrock section title and instructions (string and string array).
3. THE SMP_Data_File SHALL contain the server IP address, hero description, Java section content (title and step-by-step join instructions), and Bedrock section content (title and step-by-step join instructions).
4. THE SMP_Page components SHALL import all user-visible display text from the SMP_Data_File rather than containing inline string literals, where "display text" means any rendered text content visible to end users excluding HTML element names, CSS class names, and ARIA role attributes.
5. IF a required field defined in the SMP data interface is missing or empty, THEN THE TypeScript compiler SHALL report a type error at build time.

### Requirement 6: Visual Design Consistency

**User Story:** As a visitor, I want the SMP page to feel cohesive with the rest of the site, so that the experience is consistent and on-brand.

#### Acceptance Criteria

1. THE SMP_Page SHALL use sparkle-divider elements between each major content section to visually separate them.
2. THE SMP_Page SHALL use the site's whimsical-card, section-container, and gradient-text classes for layout and styling, including their corresponding dark mode variants.
3. THE SMP_Page SHALL use the Fredoka font (font-display class) for all headings and the Nunito font (font-body class) for all body text.
4. THE SMP_Page SHALL apply the bg-gradient-whimsical background class in light mode and a dark background of #1a0e2e in dark mode, matching the links page pattern.
5. THE SMP_Page SHALL include the standard page shell structure: DecorativeStars component, NavBar component, a main content area, and a footer matching the layout used on other pages.

### Requirement 7: Navigation Integration

**User Story:** As a visitor, I want to access the SMP page from the site navigation, so that I can discover it without needing a direct link.

#### Acceptance Criteria

1. THE NavBar SHALL include an "SMP" link in the `navLinks` list with the label "SMP" and href `/smp`, positioned after the existing navigation entries.
2. THE NavBar SHALL display the SMP link in both the desktop horizontal layout (visible at the `md` breakpoint and above) and the mobile hamburger menu (visible below the `md` breakpoint), using the same styling as existing navigation links.
3. WHEN a visitor activates the "SMP" link, THE NavBar SHALL navigate the visitor to the `/smp` route.

### Requirement 8: Accessibility

**User Story:** As a visitor using assistive technology, I want the SMP page to be accessible, so that I can navigate and understand the content.

#### Acceptance Criteria

1. THE SMP_Page SHALL use semantic HTML elements including proper heading hierarchy (h1 for page title, h2 for sections).
2. THE Server_IP_Display copy button SHALL include an accessible label describing its action (e.g., aria-label="Copy server IP address to clipboard").
3. WHEN the copy confirmation is displayed, THE Server_IP_Display SHALL announce the confirmation to screen readers using an aria-live="polite" region.
4. THE Server_IP_Display copy action SHALL be operable via keyboard (Enter or Space key) in addition to mouse click.
5. THE SMP_Page SHALL ensure all text meets WCAG 2.1 AA color contrast requirements in both light and dark mode.
