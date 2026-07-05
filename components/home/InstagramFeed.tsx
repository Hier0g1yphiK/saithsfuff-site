"use client";

import { useEffect } from "react";

const INSTAGRAM_PROFILE_URL = "https://www.instagram.com/saithsfuff/";
const CURATOR_SCRIPT_URL =
  "https://cdn.curator.io/published/472166c9-01ec-4ba2-93cb-ea4bd5a8fb2f.js";

export default function InstagramFeed() {
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
    <section id="instagram" className="section-container">
      <h2 className="font-display text-text-dark text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-8">
        <span className="gradient-text">Follow on Instagram</span> 📸
      </h2>

      <div className="whimsical-card p-4 sm:p-6">
        <div id="curator-feed-new-feed">
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
          href={INSTAGRAM_PROFILE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-display text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
        >
          Visit profile →
          <span className="sr-only">(opens in new tab)</span>
        </a>
      </div>
    </section>
  );
}
