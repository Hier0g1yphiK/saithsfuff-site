"use client";

import { useEffect, useState } from "react";
import {
  SCHEDULE_TIMEZONE,
  streamSchedule,
  type ScheduledStream,
} from "@/lib/schedule-data";
import { useTwitchLive } from "@/lib/useTwitchLive";

const HOUR_MS = 60 * 60 * 1000;
const DAY_MS = 24 * HOUR_MS;

/** Milliseconds `timeZone` is ahead of UTC at `instant`. */
function zoneOffset(instant: number, timeZone: string): number {
  const parts = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    })
      .formatToParts(instant)
      .map((p) => [p.type, Number(p.value)])
  );
  const asUtc = Date.UTC(
    parts.year,
    parts.month - 1,
    parts.day,
    parts.hour,
    parts.minute
  );
  return asUtc - Math.floor(instant / 60000) * 60000;
}

/** Converts a wall-clock time in `timeZone` to a UTC instant. */
function zonedToUtc(
  y: number,
  m: number,
  d: number,
  h: number,
  min: number,
  timeZone: string
): number {
  const guess = Date.UTC(y, m, d, h, min);
  const first = guess - zoneOffset(guess, timeZone);
  // Re-check at the result so DST transitions resolve correctly.
  return guess - zoneOffset(first, timeZone);
}

/**
 * Start of the stream's current or next occurrence: a stream already in
 * progress counts as the current occurrence until it ends.
 */
export function nextOccurrence(stream: ScheduledStream, now: number): number {
  const [h, min] = stream.start.split(":").map(Number);
  const today = new Date(now + zoneOffset(now, SCHEDULE_TIMEZONE));
  for (let k = -1; k <= 7; k++) {
    const day = new Date(today.getTime() + k * DAY_MS);
    if (day.getUTCDay() !== stream.day) continue;
    const start = zonedToUtc(
      day.getUTCFullYear(),
      day.getUTCMonth(),
      day.getUTCDate(),
      h,
      min,
      SCHEDULE_TIMEZONE
    );
    if (start + stream.durationHours * HOUR_MS > now) return start;
  }
  // Unreachable: some day in the 9-day window always matches.
  return now;
}

/**
 * Weekly stream schedule list for the `/schedule` page.
 *
 * Times are stored in {@link SCHEDULE_TIMEZONE} and, once mounted, shown in
 * the visitor's own timezone. Streams are listed in upcoming order, marking
 * the one on now and the next one up.
 *
 * This is a Client Component (needs the visitor's clock and timezone).
 */
export default function StreamSchedule() {
  // Until mounted, render in the schedule's own timezone so the markup is
  // stable; then switch to the visitor's clock and timezone.
  const [now, setNow] = useState<number | null>(null);
  const live = useTwitchLive();

  useEffect(() => {
    setNow(Date.now());
    const id = setInterval(() => setNow(Date.now()), 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const timeZone = now === null ? SCHEDULE_TIMEZONE : undefined;
  const reference = now ?? 0;

  const entries = streamSchedule
    .map((stream) => {
      const start = nextOccurrence(stream, reference);
      return {
        stream,
        start,
        end: start + stream.durationHours * HOUR_MS,
      };
    })
    .sort((a, b) =>
      now === null ? a.stream.day - b.stream.day : a.start - b.start
    );

  const dayFormat = new Intl.DateTimeFormat(undefined, {
    weekday: "long",
    timeZone,
  });
  const timeFormat = new Intl.DateTimeFormat(undefined, {
    hour: "numeric",
    minute: "2-digit",
    timeZone,
  });
  const zoneName =
    new Intl.DateTimeFormat(undefined, { timeZoneName: "short", timeZone })
      .formatToParts(reference)
      .find((p) => p.type === "timeZoneName")?.value ?? "";

  const upNextIndex =
    now === null ? -1 : entries.findIndex((e) => e.start > now);

  return (
    <section aria-label="Weekly schedule" className="section-container">
      <p className="text-center text-sm text-text-muted dark:text-lavender-300 mb-8">
        Times shown in {zoneName || "your timezone"}
      </p>

      <ul className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {entries.map(({ stream, start, end }, i) => {
          const onNow = now !== null && start <= now && now < end;
          const upNext = i === upNextIndex;
          return (
            <li
              key={`${stream.day}-${stream.start}`}
              className={`whimsical-card flex items-center justify-between gap-4 ${
                onNow || upNext
                  ? "ring-2 ring-pink-300 dark:ring-lavender-400/60"
                  : ""
              }`}
            >
              <div>
                <p className="font-display text-lg font-semibold text-text-dark dark:text-lavender-100">
                  {dayFormat.format(start)}
                </p>
                <p className="text-sm text-text-muted dark:text-lavender-300">
                  {timeFormat.format(start)} – {timeFormat.format(end)}
                </p>
                <p className="mt-1 text-text-body dark:text-gray-200">
                  {stream.title}
                </p>
              </div>
              {onNow && live ? (
                <span className="shrink-0 rounded-pill bg-red-500 px-3 py-1 font-display text-xs font-semibold uppercase text-white">
                  Live now
                </span>
              ) : onNow ? (
                <span className="shrink-0 rounded-pill bg-pink-100 px-3 py-1 font-display text-xs font-semibold uppercase text-pink-700 dark:bg-lavender-900/50 dark:text-lavender-200">
                  On now
                </span>
              ) : upNext ? (
                <span className="shrink-0 rounded-pill bg-mint-100 px-3 py-1 font-display text-xs font-semibold uppercase text-mint-900 dark:bg-mint-900/40 dark:text-mint-200">
                  Up next
                </span>
              ) : null}
            </li>
          );
        })}
      </ul>

      <p className="mt-6 text-center text-sm text-text-muted dark:text-lavender-300">
        Schedule can shift. Follow on Twitch to get notified when the stream
        starts!
      </p>
    </section>
  );
}
