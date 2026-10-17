"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeToggle from "@/components/shared/ThemeToggle";
import { BASE_PATH } from "@/lib/constants";
import { useTwitchLive } from "@/lib/useTwitchLive";

const TWITCH_CHANNEL_URL = "https://www.twitch.tv/saithsfuff";

/** Site-wide navigation links rendered in both desktop and mobile layouts. */
const navLinks = [
  { label: "Home", href: "/", external: false },
  { label: "Schedule", href: "/schedule", external: false },
  { label: "Portfolio", href: "/portfolio", external: false },
  { label: "SMP", href: "/smp", external: false },
  { label: "Merch", href: "https://fuff.shop", external: true },
  { label: "Links", href: "/links", external: false },
];

/** Matches the current route, ignoring a trailing slash. */
function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  const path = pathname.length > 1 ? pathname.replace(/\/$/, "") : pathname;
  return path === href;
}

/** Pulsing "LIVE" pill linking to the Twitch channel. */
function LiveBadge() {
  return (
    <a
      href={TWITCH_CHANNEL_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-1.5 rounded-pill bg-red-500 px-2.5 py-1 font-display text-xs font-semibold uppercase tracking-wide text-white shadow-sm transition-colors hover:bg-red-600"
    >
      <span className="relative flex h-2 w-2" aria-hidden="true">
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-white opacity-75" />
        <span className="relative inline-flex h-2 w-2 rounded-full bg-white" />
      </span>
      Live
      <span className="sr-only">
        : saithsfuff is streaming now on Twitch (opens in new tab)
      </span>
    </a>
  );
}

/**
 * Sticky navigation bar displayed on every page.
 *
 * Features:
 * - Responsive: horizontal links on desktop, hamburger menu on mobile.
 * - Glass-card styling with backdrop blur and theme-aware borders.
 * - Includes the site logo, page links, and {@link ThemeToggle}.
 * - Highlights the current page and shows a LIVE badge while streaming.
 *
 * This is a Client Component (requires state for the mobile menu toggle).
 *
 * @returns A `<nav>` element with desktop and mobile navigation.
 */
export default function NavBar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();
  const live = useTwitchLive();

  return (
    <nav className="sticky top-0 z-50 glass-card border-b border-pink-100/50 backdrop-blur-md dark:border-transparent">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo + live badge */}
          <div className="flex items-center gap-3">
            <Link href="/" className="flex-shrink-0">
              <Image
                src={`${BASE_PATH}/images/logo.gif`}
                alt="saithsfuff logo"
                width={40}
                height={40}
                className="rounded-full"
                priority
              />
            </Link>
            {live && <LiveBadge />}
          </div>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex md:items-center md:gap-6">
            {navLinks.map((link) =>
              link.external ? (
                <a
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-display text-sm font-medium text-text-body transition-colors hover:text-pink-500 dark:text-lavender-200 dark:hover:text-lavender-400"
                >
                  {link.label}
                  <span className="sr-only">(opens in new tab)</span>
                </a>
              ) : (
                <Link
                  key={link.href}
                  href={link.href}
                  aria-current={
                    isActive(pathname, link.href) ? "page" : undefined
                  }
                  className={`font-display text-sm font-medium transition-colors hover:text-pink-500 dark:hover:text-lavender-400 ${
                    isActive(pathname, link.href)
                      ? "text-pink-500 underline decoration-2 underline-offset-8 dark:text-lavender-300"
                      : "text-text-body dark:text-lavender-200"
                  }`}
                >
                  {link.label}
                </Link>
              )
            )}
            <ThemeToggle />
          </div>

          {/* Mobile Hamburger Button */}
          <div className="flex items-center gap-2 md:hidden">
            <ThemeToggle />
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-card p-2 text-text-body transition-colors hover:bg-pink-50 hover:text-pink-500 dark:text-lavender-200 dark:hover:bg-lavender-900/30 dark:hover:text-lavender-300"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Dropdown — `invisible` when closed removes the links
          from the tab order and accessibility tree, not just from view */}
      <div
        id="mobile-menu"
        className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
          mobileMenuOpen
            ? "visible max-h-80 opacity-100"
            : "invisible max-h-0 opacity-0"
        }`}
      >
        <div className="space-y-1 px-4 pb-4 pt-2">
          {navLinks.map((link) =>
            link.external ? (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-card px-3 py-2 font-display text-sm font-medium text-text-body transition-colors hover:bg-pink-50 hover:text-pink-500 dark:text-lavender-200 dark:hover:bg-lavender-900/30 dark:hover:text-lavender-400"
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
                <span className="sr-only">(opens in new tab)</span>
              </a>
            ) : (
              <Link
                key={link.href}
                href={link.href}
                aria-current={
                  isActive(pathname, link.href) ? "page" : undefined
                }
                className={`block rounded-card px-3 py-2 font-display text-sm font-medium transition-colors hover:bg-pink-50 hover:text-pink-500 dark:hover:bg-lavender-900/30 dark:hover:text-lavender-400 ${
                  isActive(pathname, link.href)
                    ? "bg-pink-50 text-pink-500 dark:bg-lavender-900/30 dark:text-lavender-300"
                    : "text-text-body dark:text-lavender-200"
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            )
          )}
        </div>
      </div>
    </nav>
  );
}
