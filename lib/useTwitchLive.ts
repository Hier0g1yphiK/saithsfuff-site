"use client";

import { useEffect, useState } from "react";

const TWITCH_CHANNEL = "saithsfuff";

/**
 * Keyless live-status endpoint. Responds with plain text: the stream uptime
 * (e.g. "1 hour, 5 minutes") when live, or "<channel> is offline".
 */
const UPTIME_URL = `https://decapi.me/twitch/uptime/${TWITCH_CHANNEL}`;
const POLL_MS = 2 * 60 * 1000;

// Shared across every component using the hook, so the nav badge and the
// homepage section make one request between them and survive client nav.
let cached: { live: boolean; at: number } | null = null;
let inflight: Promise<boolean> | null = null;

function fetchLive(): Promise<boolean> {
  if (cached && Date.now() - cached.at < POLL_MS) {
    return Promise.resolve(cached.live);
  }
  if (!inflight) {
    inflight = Promise.resolve()
      .then(() => fetch(UPTIME_URL))
      .then((res) => (res.ok ? res.text() : ""))
      .then((text) => /\d+\s+(second|minute|hour|day)/i.test(text))
      .catch(() => false)
      .then((live) => {
        cached = { live, at: Date.now() };
        inflight = null;
        return live;
      });
  }
  return inflight;
}

/**
 * Returns whether saithsfuff is currently live on Twitch, polling every two
 * minutes. Returns false while loading or if the status check fails.
 */
export function useTwitchLive(): boolean {
  const [live, setLive] = useState(cached?.live ?? false);

  useEffect(() => {
    let active = true;
    const check = () =>
      fetchLive().then((value) => {
        if (active) setLive(value);
      });

    check();
    const id = setInterval(check, POLL_MS);
    return () => {
      active = false;
      clearInterval(id);
    };
  }, []);

  return live;
}

/** Test helper: clears the shared cache between tests. */
export function resetTwitchLiveCache(): void {
  cached = null;
  inflight = null;
}
