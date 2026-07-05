# Requirements Document

## Introduction

A splash page that acts as a gateway to the saithsfuff.com website. The splash page displays a "coming soon" message and requires visitors to enter a correct password before they can access any other page on the site. This provides a way to keep the site private during development or limited preview periods while maintaining the whimsical pastel brand aesthetic.

Note: The site uses `output: 'export'` (static site generation), so the password gate is client-side only. The password gets embedded at build time. This is a convenience gate appropriate for a "coming soon" page, not a security-hardened solution.

## Glossary

- **Splash_Page**: The initial landing page displayed to unauthenticated visitors, showing a "coming soon" message and a password input field
- **Site_Content**: All pages behind the splash gate including the homepage, links, portfolio, SMP, and media-kit pages
- **Password_Gate**: The client-side mechanism that checks a visitor-supplied password against a stored value and controls access to Site_Content
- **Access_Token**: A value stored in sessionStorage indicating the visitor has successfully authenticated through the Password_Gate
- **Visitor**: Any person navigating to saithsfuff.com in a web browser

## Requirements

### Requirement 1: Display Splash Page

**User Story:** As a site owner, I want unauthenticated visitors to see a "coming soon" splash page, so that the site remains private until I am ready to launch publicly.

#### Acceptance Criteria

1. WHILE the splash page mode is enabled via an environment variable, WHEN a Visitor navigates to any route on the site, THE Splash_Page SHALL display a "coming soon" heading and the site brand name, with no navigation links to other site pages
2. THE Splash_Page SHALL render using the Fredoka display font for headings, the Nunito body font for any secondary text, the site's pastel color palette, and the DecorativeStars background element
3. THE Splash_Page SHALL be responsive across viewport widths from 320px to 2560px, with no horizontal overflow and all text and content remaining visible and vertically centered without truncation
4. THE Splash_Page SHALL support both light and dark theme modes by applying the site's class-based dark mode strategy with appropriate dark: variant styles for backgrounds, text, and borders
5. WHILE the splash page mode is enabled, THE Splash_Page SHALL NOT render the NavBar, footer, or any links that allow navigation to other pages on the site

### Requirement 2: Password Entry

**User Story:** As a visitor with the password, I want to enter the password on the splash page, so that I can access the full site content.

#### Acceptance Criteria

1. THE Splash_Page SHALL display a password input field with a maximum length of 128 characters below the "coming soon" message
2. THE Splash_Page SHALL display a submit button adjacent to the password input field
3. WHEN a Visitor submits the correct password, THE Password_Gate SHALL store an Access_Token in the browser and redirect the Visitor to the homepage (/) of Site_Content
4. WHEN a Visitor submits an incorrect password, THE Password_Gate SHALL display an error message indicating the password is incorrect
5. WHEN a Visitor submits an incorrect password, THE Password_Gate SHALL clear the password input field
6. THE password input field SHALL mask the entered characters
7. WHEN a Visitor presses the Enter key while the password input field is focused, THE Splash_Page SHALL submit the password as if the submit button were activated
8. IF a Visitor submits the password form with an empty password field, THEN THE Password_Gate SHALL display an error message indicating that a password is required and SHALL NOT perform a password comparison

### Requirement 3: Access Persistence

**User Story:** As an authenticated visitor, I want my access to persist during my browsing session, so that I do not need to re-enter the password on every page navigation.

#### Acceptance Criteria

1. WHILE an Access_Token is present in sessionStorage, THE Password_Gate SHALL allow the Visitor to access Site_Content without re-entering the password
2. WHEN a Visitor navigates between pages within Site_Content including in-app navigation, browser back/forward, and full page refresh, THE Password_Gate SHALL maintain the authenticated state
3. WHEN a Visitor closes the browser tab or window, THE Password_Gate SHALL invalidate the Access_Token so the password is required on the next visit
4. WHEN a Visitor opens the site in a new browser tab, THE Password_Gate SHALL require password entry independently of any other authenticated tabs

### Requirement 4: Route Protection

**User Story:** As a site owner, I want all site routes to be protected behind the password gate, so that no content is accessible without authentication.

#### Acceptance Criteria

1. WHEN an unauthenticated Visitor navigates directly to any Site_Content route via URL, THE Password_Gate SHALL display the Splash_Page instead of the requested content without rendering any Site_Content to the screen at any point before the Splash_Page appears
2. THE Password_Gate SHALL protect the following routes: homepage (/), links (/links), portfolio (/portfolio), SMP (/smp), and media-kit (/media-kit)
3. WHEN an authenticated Visitor navigates directly to a Site_Content route via URL, THE Password_Gate SHALL display the requested page content
4. WHEN an unauthenticated Visitor navigates to a protected route and then successfully authenticates via the Splash_Page, THE Password_Gate SHALL redirect the Visitor to the originally requested route rather than a default page

### Requirement 5: Password Configuration

**User Story:** As a site owner, I want to configure the splash page password through an environment variable, so that I can change the password without modifying source code.

#### Acceptance Criteria

1. THE Password_Gate SHALL read the site password from the NEXT_PUBLIC_SITE_PASSWORD build-time environment variable
2. IF the NEXT_PUBLIC_SITE_PASSWORD environment variable is not set or is an empty string, THEN THE Password_Gate SHALL deny all access attempts and display the Splash_Page permanently
3. THE password comparison SHALL be case-sensitive
4. THE Password_Gate SHALL trim leading and trailing whitespace from the environment variable value before comparison

### Requirement 6: Accessibility

**User Story:** As a visitor using assistive technology, I want the splash page to be fully accessible, so that I can enter the password and access the site.

#### Acceptance Criteria

1. THE Splash_Page SHALL include a visible text label programmatically associated with the password input field using a `for`/`id` relationship or wrapping `<label>` element
2. WHEN the Password_Gate displays an error message, THE Splash_Page SHALL announce the error to screen readers using an ARIA live region with `assertive` politeness
3. THE Splash_Page SHALL allow the Visitor to reach and operate the password input field and the submit button using the Tab key, and activate the submit button using the Enter or Space key, without requiring a pointing device
4. THE submit button and password input SHALL display a focus indicator with a minimum 2px outline or equivalent border change that meets WCAG 2.2 Level AA non-text contrast (3:1 ratio against adjacent colors) when focused
5. WHEN the password input field has focus and the Visitor presses the Enter key, THE Splash_Page SHALL submit the password form
