"use client";

import { useEffect, useState } from "react";
import SplashPage from "@/components/splash/SplashPage";
import {
  isAuthenticated,
  setAuthenticated,
  getRedirectPath,
  setRedirectPath,
  clearRedirectPath,
} from "@/lib/auth";

interface PasswordGateProps {
  children: React.ReactNode;
}

/**
 * Client-side password gate that wraps protected content.
 *
 * On mount, checks sessionStorage for a valid access token.
 * If unauthenticated, renders the SplashPage and captures the current path.
 * If authenticated, renders children (site content).
 * Renders null during initial mount to prevent flash of protected content.
 */
export default function PasswordGate({ children }: PasswordGateProps) {
  const [authState, setAuthState] = useState<
    "loading" | "authenticated" | "unauthenticated"
  >("loading");

  useEffect(() => {
    try {
      if (isAuthenticated()) {
        setAuthState("authenticated");
      } else {
        setRedirectPath(window.location.pathname);
        setAuthState("unauthenticated");
      }
    } catch {
      // sessionStorage unavailable — default to showing splash page
      setAuthState("unauthenticated");
    }
  }, []);

  const handleAuthenticated = () => {
    try {
      setAuthenticated();
      const redirectPath = getRedirectPath();
      clearRedirectPath();

      setAuthState("authenticated");

      // If the redirect path differs from current location, update the URL
      if (redirectPath && redirectPath !== window.location.pathname) {
        window.history.replaceState(null, "", redirectPath);
      }
    } catch {
      // sessionStorage unavailable — still allow access since password was correct
      setAuthState("authenticated");
    }
  };

  // Render null during initial mount to prevent flash of protected content
  if (authState === "loading") {
    return null;
  }

  if (authState === "unauthenticated") {
    return <SplashPage onAuthenticated={handleAuthenticated} />;
  }

  return <>{children}</>;
}
