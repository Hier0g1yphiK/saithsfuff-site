"use client";

import Script from "next/script";

const TIKTOK_CHANNEL_URL = "https://www.tiktok.com/@saithsfuff";

export default function TikTokFeed() {
  return (
    <section id="tiktok" className="section-container">
      <h2 className="font-display text-text-dark text-2xl sm:text-3xl lg:text-4xl font-semibold text-center mb-8">
        <span className="gradient-text">Follow on TikTok</span> 🎵
      </h2>

      <div className="whimsical-card p-4 sm:p-6">
        <div
          className="tagembed-widget"
          style={{ width: "100%", height: "100%", overflow: "auto" }}
          data-widget-id="328133"
          data-website="1"
        />
      </div>

      <div className="text-center mt-8">
        <a
          href={TIKTOK_CHANNEL_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block font-display text-sm font-medium text-pink-500 hover:text-pink-600 transition-colors"
        >
          Visit channel →
        </a>
      </div>

      <Script
        src="https://widget.tagembed.com/embed.min.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
