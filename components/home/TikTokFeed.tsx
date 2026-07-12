"use client";

import { useEffect } from "react";

const TIKTOK_CHANNEL_URL = "https://www.tiktok.com/@saithsfuff";
const CURATOR_SCRIPT_URL =
  "https://cdn.curator.io/published/a8162826-eb1b-403b-bfc7-e5dce84fbae8.js";

/**
 * TikTok feed section for the homepage.
 *
 * Loads the Curator.io embed script to render a live TikTok feed from
 * saithsfuff's profile. Includes a direct link to the TikTok channel below.
 *
 * This is a Client Component (requires `useEffect` to inject the embed script).
 *
 * @returns A `<section>` element containing the TikTok feed embed.
 */
export default function TikTokFeed() {
  useEffect(() => {
    const script = document.createElement("script");
    script.async = true;
    script.charset = "UTF-8";
    script.src = CURATOR_SCRIPT_URL;
    document.body.appendChild(script);

    return () => {
      script.remove();
    };
  }, []);

  return (
    <section id="tiktok" className="section-container">
      <h2 className="font-display text-2xl font-semibold text-center sm:text-3xl mb-8">
        <span className="gradient-text">Follow on TikTok</span> 🎵
      </h2>

      <div className="whimsical-card p-4 sm:p-6">
        <div id="curator-feed-default-feed-layout">
          <a
            href="https://curator.io"
            target="_blank"
            rel="noopener noreferrer"
            className="crt-logo crt-tag"
          >
            Powered by Curator.io
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>
      </div>

      <div className="text-center mt-8">
        <a
          href={TIKTOK_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-display text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
        >
          Visit channel →
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    </section>
  );
}
