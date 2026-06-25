"use client";

import { useState, useEffect, useRef, useCallback } from "react";

/**
 * Props for the {@link ServerIpDisplay} component.
 */
interface ServerIpDisplayProps {
  /**
   * The server IP address to display and copy.
   * Rendered at `text-2xl` (≥1.5× body text) for visibility.
   */
  serverIp: string;
}

/**
 * Client component that displays a Minecraft server IP address with
 * copy-to-clipboard functionality.
 *
 * **Behaviour:**
 * 1. On click, copies `serverIp` to the clipboard via `navigator.clipboard.writeText()`.
 * 2. Transitions from "Click to copy" → "Copied!" for 2 seconds, then resets.
 * 3. If the Clipboard API is unavailable (e.g. non-HTTPS, older browsers),
 *    falls back to a selectable `<span>` with `user-select: all` so users can
 *    manually copy.
 *
 * **Accessibility:**
 * - Button has `aria-label="Copy server IP address to clipboard"`.
 * - An `aria-live="polite"` region announces the copy state to screen readers.
 * - Keyboard-accessible via native `<button>` semantics (Enter/Space).
 *
 * @param props - Component props.
 * @param props.serverIp - The IP address string to display and copy.
 *
 * @example
 * ```tsx
 * import ServerIpDisplay from "@/components/smp/ServerIpDisplay";
 *
 * // Inside a server component (JavaSection):
 * <ServerIpDisplay serverIp="play.saithsfuff.com" />
 * ```
 *
 * @returns A `<div>` containing either a `<button>` (clipboard available) or a
 *   selectable `<span>` (clipboard unavailable), plus a status label.
 */
export default function ServerIpDisplay({ serverIp }: ServerIpDisplayProps) {
  const [copyState, setCopyState] = useState<"idle" | "copied">("idle");
  const [clipboardAvailable, setClipboardAvailable] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    // Check clipboard availability on mount (client-side only)
    setClipboardAvailable(
      typeof navigator !== "undefined" && !!navigator.clipboard
    );
  }, []);

  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(serverIp);
      setCopyState("copied");

      // Clear any existing timeout before starting a new one
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        setCopyState("idle");
      }, 2000);
    } catch {
      // If copy fails, silently revert
      setCopyState("idle");
    }
  }, [serverIp]);

  // Fallback: render selectable span when clipboard is unavailable
  if (!clipboardAvailable) {
    return (
      <div className="flex flex-col items-center gap-2">
        <span
          className="text-2xl font-display font-bold text-pink-600 dark:text-pink-300 select-all"
          style={{ userSelect: "all" }}
        >
          {serverIp}
        </span>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <button
        onClick={handleCopy}
        aria-label="Copy server IP address to clipboard"
        className="text-2xl font-display font-bold text-pink-600 dark:text-pink-300 cursor-pointer px-6 py-3 rounded-xl transition-all duration-200 hover:scale-[1.02] hover:bg-pink-50 dark:hover:bg-pink-900/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-pink-400 dark:focus-visible:ring-lavender-400"
      >
        {serverIp}
      </button>
      <span
        aria-live="polite"
        className="text-sm font-body text-text-muted dark:text-gray-300"
      >
        {copyState === "idle" ? "Click to copy" : "Copied!"}
      </span>
    </div>
  );
}
