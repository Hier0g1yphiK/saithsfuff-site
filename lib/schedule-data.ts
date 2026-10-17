// =============================================================================
// Stream Schedule — Static Data
// =============================================================================
// PLACEHOLDER schedule: replace the days, times and titles with the real one.
// Times are written in SCHEDULE_TIMEZONE and shown to each visitor in their
// own timezone.
// =============================================================================

/** IANA timezone the schedule times below are written in. */
export const SCHEDULE_TIMEZONE = "America/New_York";

/** 0 = Sunday … 6 = Saturday (matches `Date.getDay()`). */
export type Weekday = 0 | 1 | 2 | 3 | 4 | 5 | 6;

export interface ScheduledStream {
  day: Weekday;
  /** 24-hour start time in SCHEDULE_TIMEZONE, "HH:MM". */
  start: string;
  /** Stream length in hours. */
  durationHours: number;
  /** What's planned, e.g. "Cozy games". */
  title: string;
}

export const streamSchedule: ScheduledStream[] = [
  { day: 1, start: "19:00", durationHours: 3, title: "Cozy games & chill" },
  { day: 3, start: "19:00", durationHours: 3, title: "SMP night" },
  { day: 5, start: "20:00", durationHours: 4, title: "Community game night" },
  { day: 6, start: "14:00", durationHours: 3, title: "Weekend variety" },
];
