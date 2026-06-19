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
        <iframe
          src="https://app.mirror-app.com/feed-tiktok/6ac0e699-5804-400e-9e4c-02d1cab8aabb/preview"
          style={{ width: "100%", border: "none", overflow: "visible" }}
          title="TikTok Feed"
        ></iframe>
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
        src="https://cdn.jsdelivr.net/npm/@mirrorapp/iframe-bridge@latest/dist/index.umd.js"
        strategy="lazyOnload"
      />
    </section>
  );
}
