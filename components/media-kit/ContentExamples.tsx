"use client";

import { useEffect } from "react";
import { contentExamples } from "@/lib/media-kit-data";

const INSTAGRAM_EMBED_SCRIPT_URL = "https://www.instagram.com/embed.js";

declare global {
  interface Window {
    instgrm?: {
      Embeds: {
        process: () => void;
      };
    };
  }
}

/**
 * Content examples section for the Portfolio/Media Kit page.
 *
 * Renders a set of Instagram reels as official Instagram embeds in a
 * responsive grid. Each embed is an `instagram-media` blockquote that
 * Instagram's `embed.js` script hydrates into a playable widget. Data is
 * sourced from `lib/media-kit-data.ts`.
 *
 * This is a Client Component: it injects the Instagram embed script and calls
 * `window.instgrm.Embeds.process()` to (re)hydrate the blockquotes.
 *
 * @returns A `<section>` element containing the Instagram embeds grid.
 */
export default function ContentExamples() {
  useEffect(() => {
    let cancelled = false;

    // A blockquote is considered hydrated once Instagram replaces its
    // contents with an <iframe>. We keep retrying process() until every
    // embed on the page has an iframe, or we run out of attempts. This is
    // resilient to the race where process() runs before the blockquotes are
    // laid out (e.g. this section sits below the PasswordGate and several
    // other sections, so it settles late), which otherwise leaves the raw
    // "View this reel on Instagram" fallback until a manual refresh.
    const allHydrated = () => {
      const nodes = document.querySelectorAll<HTMLElement>(".instagram-media");
      return (
        nodes.length > 0 &&
        Array.from(nodes).every((n) => n.querySelector("iframe") !== null)
      );
    };

    let attempts = 0;
    const MAX_ATTEMPTS = 40; // ~10s at 250ms
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      if (cancelled) return;

      // Ensure the script is present; inject it once if not.
      if (!window.instgrm) {
        if (
          !document.querySelector(
            `script[src="${INSTAGRAM_EMBED_SCRIPT_URL}"]`
          )
        ) {
          const script = document.createElement("script");
          script.async = true;
          script.src = INSTAGRAM_EMBED_SCRIPT_URL;
          document.body.appendChild(script);
          // Note: script is intentionally left in the DOM on unmount so
          // window.instgrm stays defined and cached across navigations.
        }
      } else {
        window.instgrm.Embeds.process();
      }

      attempts += 1;
      if (!allHydrated() && attempts < MAX_ATTEMPTS) {
        timer = setTimeout(tick, 250);
      }
    };

    tick();

    // Re-process if the user returns to the tab mid-hydration.
    const onVisible = () => {
      if (document.visibilityState === "visible") window.instgrm?.Embeds.process();
    };
    document.addEventListener("visibilitychange", onVisible);

    return () => {
      cancelled = true;
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", onVisible);
    };
  }, []);

  return (
    <section className="section-container">
      <h2 className="font-display text-2xl font-semibold text-center sm:text-3xl mb-8">
        <span className="gradient-text">Content Examples</span>
      </h2>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
        {contentExamples.map((item) => (
          <div
            key={item.postUrl}
            className="whimsical-card flex justify-center overflow-hidden p-2 sm:p-4"
          >
            <blockquote
              className="instagram-media w-full"
              data-instgrm-permalink={item.postUrl}
              data-instgrm-version="14"
              style={{ margin: 0, maxWidth: "100%", minWidth: 0 }}
            >
              <a href={item.postUrl} target="_blank" rel="noopener noreferrer">
                View this reel on Instagram
                <span className="sr-only">(opens in new tab)</span>
              </a>
            </blockquote>
          </div>
        ))}
      </div>
    </section>
  );
}
