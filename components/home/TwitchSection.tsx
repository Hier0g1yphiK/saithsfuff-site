"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Script from "next/script";
import { useTwitchLive } from "@/lib/useTwitchLive";

const TWITCH_CHANNEL = "saithsfuff";
const TWITCH_CHANNEL_URL = "https://www.twitch.tv/saithsfuff";
const TWITCH_EMBED_SCRIPT = "https://embed.twitch.tv/embed/v1.js";
const TIMEOUT_MS = 10000;

/**
 * Twitch embed section for the homepage.
 *
 * Loads the Twitch embed script and renders an interactive video player for
 * the saithsfuff channel. Falls back to a link if the embed fails to load
 * within a timeout period.
 *
 * This is a Client Component (requires `useEffect` and `useState` for embed lifecycle).
 *
 * @returns A `<section>` element containing the Twitch player or fallback link.
 */
export default function TwitchSection() {
  const [embedStatus, setEmbedStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const live = useTwitchLive();

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      setEmbedStatus((prev) => (prev === "loading" ? "error" : prev));
    }, TIMEOUT_MS);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleScriptLoad = () => {
    try {
      const embed = new Twitch.Embed("twitch-embed", {
        channel: TWITCH_CHANNEL,
        width: "100%",
        height: "100%",
        layout: "video",
        parent: [window.location.hostname],
        autoplay: false,
        muted: true,
      });

      embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
        if (timeoutRef.current) {
          clearTimeout(timeoutRef.current);
        }
        setEmbedStatus("ready");

        // Set iframe title for accessibility
        const container = document.getElementById("twitch-embed");
        const iframe = container?.querySelector("iframe");
        if (iframe) {
          iframe.title = "saithsfuff Twitch stream player";
        }
      });
    } catch {
      setEmbedStatus("error");
    }
  };

  const handleScriptError = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    setEmbedStatus("error");
  };

  return (
    <section id="twitch" className="section-container">
      <h2 className="font-display text-2xl font-semibold text-center sm:text-3xl mb-3">
        <span className="gradient-text">Watch on Twitch</span> 🎮
      </h2>

      <p className="mb-8 text-center text-sm" aria-live="polite">
        {live ? (
          <span className="inline-flex items-center gap-2 rounded-pill bg-red-500 px-3 py-1 font-display font-semibold text-white">
            <span className="h-2 w-2 animate-pulse rounded-full bg-white" />
            Live now, come hang out!
          </span>
        ) : (
          <span className="text-text-muted dark:text-lavender-300">
            Offline right now.{" "}
            <Link
              href="/schedule"
              className="font-medium text-pink-500 hover:text-pink-600 dark:text-lavender-300 dark:hover:text-lavender-200"
            >
              See when I&apos;m next live →
            </Link>
          </span>
        )}
      </p>

      <div className="whimsical-card p-4 sm:p-6">
        {embedStatus === "error" ? (
          <div className="text-center py-12">
            <p className="text-text-dark mb-4">
              Stream unavailable right now — catch saithsfuff live on Twitch!
            </p>
            <a
              href={TWITCH_CHANNEL_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block font-display text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors dark:text-lavender-300 dark:hover:text-lavender-200"
            >
              Visit saithsfuff on Twitch →
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </div>
        ) : (
          <div id="twitch-embed" className="aspect-video w-full" />
        )}
      </div>

      <div className="text-center mt-8">
        <a
          href={TWITCH_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-display text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors dark:text-lavender-300 dark:hover:text-lavender-200"
        >
          Visit channel →<span className="sr-only">(opens in new tab)</span>
        </a>
      </div>

      <Script
        src={TWITCH_EMBED_SCRIPT}
        strategy="lazyOnload"
        onReady={handleScriptLoad}
        onError={handleScriptError}
      />
    </section>
  );
}
