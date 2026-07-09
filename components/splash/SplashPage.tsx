"use client";

import DecorativeStars from "@/components/shared/DecorativeStars";
import ThemeToggle from "@/components/shared/ThemeToggle";
import PasswordForm from "@/components/splash/PasswordForm";

interface SplashPageProps {
  onAuthenticated: () => void;
}

/**
 * "Coming soon" splash page displayed to unauthenticated visitors.
 *
 * Renders the brand name, a "coming soon" heading, decorative stars background,
 * and a password form. Does NOT render NavBar, footer, or any navigation links.
 */
export default function SplashPage({ onAuthenticated }: SplashPageProps) {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-x-hidden bg-gradient-hero px-4 dark:bg-none dark:bg-[#1a0e2e]">
      {/* Theme toggle */}
      <div className="absolute right-4 top-4 z-20">
        <ThemeToggle />
      </div>

      <DecorativeStars />

      <main className="relative z-10 flex w-full max-w-md flex-col items-center text-center">
        {/* Brand name */}
        <p className="font-body text-sm font-semibold uppercase tracking-widest text-pink-400 dark:text-lavender-300">
          saithsfuff
        </p>

        {/* Coming soon heading */}
        <h1 className="mt-2 font-display text-4xl font-bold sm:text-5xl lg:text-6xl">
          <span className="gradient-text">Coming Soon</span> ✨
        </h1>

        {/* Tagline */}
        <p className="mt-4 font-body text-base text-text-body dark:text-lavender-200 sm:text-lg">
          Something magical is on the way. Enter the password to get early
          access.
        </p>

        {/* Password form */}
        <div className="mt-8 w-full">
          <PasswordForm onSuccess={onAuthenticated} />
        </div>
      </main>
    </div>
  );
}
