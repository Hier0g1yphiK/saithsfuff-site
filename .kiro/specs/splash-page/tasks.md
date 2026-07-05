# Implementation Plan: Splash Page

## Overview

Implement a client-side password gate that intercepts all site routes, displays a "coming soon" splash page, and grants access to site content upon correct password entry. The gate wraps children in the root layout, uses sessionStorage for persistence, and includes full accessibility and dark mode support.

## Tasks

- [x] 1. Create auth utility module and splash component scaffolding
  - [x] 1.1 Create `lib/auth.ts` with all authentication utility functions
    - Implement `AUTH_STORAGE_KEY` and `REDIRECT_STORAGE_KEY` constants
    - Implement `isAuthenticated()` — checks sessionStorage for access token
    - Implement `setAuthenticated()` — writes token to sessionStorage
    - Implement `getRedirectPath()` — returns stored redirect path, defaults to `"/"`
    - Implement `setRedirectPath(path)` — stores originally requested path
    - Implement `clearRedirectPath()` — removes redirect path from storage
    - Implement `validatePassword(input)` — trims input, compares case-sensitively to trimmed `NEXT_PUBLIC_SITE_PASSWORD`, returns false if env var is unset/empty
    - Wrap all sessionStorage access in try/catch for resilience
    - _Requirements: 2.3, 3.1, 4.4, 5.1, 5.2, 5.3, 5.4_

  - [ ]* 1.2 Write property tests for `validatePassword` in `__tests__/components/splash/auth.property.test.ts`
    - **Property 1: Correct password grants access**
    - **Validates: Requirements 2.3**
    - Generate random non-empty strings as password, set env var, assert `validatePassword` returns true

  - [ ]* 1.3 Write property test for incorrect password rejection
    - **Property 2: Incorrect password is rejected and input is cleared**
    - **Validates: Requirements 2.4, 2.5**
    - Generate random strings guaranteed to differ from stored password, assert `validatePassword` returns false

  - [ ]* 1.4 Write property test for unset/empty password denial
    - **Property 4: Unset or empty password denies all inputs**
    - **Validates: Requirements 5.2**
    - Generate random strings, set env var to empty or delete it, assert `validatePassword` returns false for all

  - [ ]* 1.5 Write property test for case-sensitive comparison
    - **Property 5: Password comparison is case-sensitive**
    - **Validates: Requirements 5.3**
    - Generate random strings with alphabetic chars, produce case-altered variant, assert rejection

  - [ ]* 1.6 Write property test for whitespace trimming
    - **Property 6: Environment variable whitespace is trimmed**
    - **Validates: Requirements 5.4**
    - Generate random strings wrapped in random whitespace for env var, submit trimmed version, assert acceptance

- [x] 2. Checkpoint - Ensure auth utility tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 3. Implement PasswordForm component
  - [x] 3.1 Create `components/splash/PasswordForm.tsx`
    - `"use client"` directive
    - Render a `<form>` with a `<label>` programmatically associated with a password `<input>` (type="password", maxLength=128)
    - Render a submit button adjacent to the input
    - On submit: trim input, if empty show "Password is required" error without comparison
    - If incorrect: show "Incorrect password" error, clear input field
    - If correct: call `onSuccess()` prop callback
    - Error messages rendered in an `aria-live="assertive"` region
    - Support Enter key submission via native form behavior
    - Include focus indicators (2px outline) on input and button meeting WCAG 2.2 AA contrast
    - Apply dark mode styles with `dark:` variants
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 6.1, 6.2, 6.3, 6.4, 6.5_

  - [ ]* 3.2 Write unit tests for PasswordForm in `__tests__/components/splash/PasswordForm.test.tsx`
    - Test: password input renders with type="password" and maxLength=128
    - Test: label is associated with input
    - Test: empty submission shows "Password is required" error
    - Test: incorrect password shows error and clears input
    - Test: correct password calls onSuccess
    - Test: Enter key submits form
    - Test: aria-live="assertive" region exists for errors
    - _Requirements: 2.1, 2.2, 2.4, 2.5, 2.6, 2.7, 2.8, 6.1, 6.2, 6.5_

- [x] 4. Implement SplashPage component
  - [x] 4.1 Create `components/splash/SplashPage.tsx`
    - `"use client"` directive
    - Accept `onAuthenticated` callback prop
    - Render "coming soon" heading using Fredoka font (font-display class)
    - Render brand name "saithsfuff"
    - Render `<DecorativeStars />` background element
    - Render `<PasswordForm onSuccess={onAuthenticated} />`
    - Do NOT render NavBar, footer, or any navigation links
    - Responsive layout: vertically centered, no horizontal overflow at 320px–2560px
    - Apply pastel color palette and dark mode styles
    - Use Nunito (font-body) for secondary text
    - _Requirements: 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2_

  - [ ]* 4.2 Write unit tests for SplashPage in `__tests__/components/splash/SplashPage.test.tsx`
    - Test: "coming soon" heading is rendered
    - Test: DecorativeStars component is present
    - Test: NavBar is NOT rendered
    - Test: no navigation links present
    - Test: PasswordForm is rendered
    - Test: dark mode classes applied
    - _Requirements: 1.1, 1.2, 1.4, 1.5_

- [x] 5. Implement PasswordGate component
  - [x] 5.1 Create `components/shared/PasswordGate.tsx`
    - `"use client"` directive
    - Accept `children: React.ReactNode` prop
    - On mount: read sessionStorage for access token via `isAuthenticated()`
    - If unauthenticated: capture `window.location.pathname` via `setRedirectPath()`, render `<SplashPage>`
    - If authenticated: render `{children}`
    - On successful authentication callback: call `setAuthenticated()`, read `getRedirectPath()`, call `clearRedirectPath()`, and update state to render children
    - Render `null` (or minimal loading background) during initial mount before sessionStorage is read to prevent flash of content
    - Wrap sessionStorage access in try/catch — if unavailable, default to showing splash page
    - _Requirements: 1.1, 3.1, 3.2, 3.3, 3.4, 4.1, 4.2, 4.3, 4.4_

  - [ ]* 5.2 Write unit tests for PasswordGate in `__tests__/components/splash/PasswordGate.test.tsx`
    - Test: unauthenticated state renders SplashPage, not children
    - Test: authenticated state (sessionStorage has token) renders children
    - Test: no flash of content before sessionStorage check
    - Test: after successful auth, children are rendered
    - _Requirements: 3.1, 4.1, 4.3_

  - [ ]* 5.3 Write property test for redirect route preservation
    - **Property 3: Redirect preserves originally requested route**
    - **Validates: Requirements 4.4**
    - Generate random selection from valid route paths, verify `setRedirectPath` + `getRedirectPath` round-trips correctly

- [x] 6. Checkpoint - Ensure component tests pass
  - Ensure all tests pass, ask the user if questions arise.

- [x] 7. Integrate PasswordGate into root layout
  - [x] 7.1 Update `app/layout.tsx` to wrap `{children}` with `<PasswordGate>`
    - Import `PasswordGate` from `@/components/shared/PasswordGate`
    - Wrap the existing `{children}` inside `<body>` with `<PasswordGate>{children}</PasswordGate>`
    - Ensure no other changes to existing layout structure (fonts, metadata, theme script remain)
    - _Requirements: 1.1, 4.1, 4.2_

- [x] 8. Add environment variable configuration
  - [x] 8.1 Add `NEXT_PUBLIC_SITE_PASSWORD` to `.env` file
    - Add the env var with a placeholder value for development
    - Add a comment explaining its purpose
    - _Requirements: 5.1_

- [x] 9. Final checkpoint - Ensure all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document using fast-check
- Unit tests validate specific examples and edge cases using Jest + React Testing Library
- The design uses TypeScript throughout — all implementation uses `.ts`/`.tsx` files
- The `PasswordGate` component prevents flash of protected content by rendering null until sessionStorage is read

## Task Dependency Graph

```json
{
  "waves": [
    { "id": 0, "tasks": ["1.1"] },
    { "id": 1, "tasks": ["1.2", "1.3", "1.4", "1.5", "1.6", "3.1"] },
    { "id": 2, "tasks": ["3.2", "4.1"] },
    { "id": 3, "tasks": ["4.2", "5.1"] },
    { "id": 4, "tasks": ["5.2", "5.3"] },
    { "id": 5, "tasks": ["7.1", "8.1"] }
  ]
}
```
