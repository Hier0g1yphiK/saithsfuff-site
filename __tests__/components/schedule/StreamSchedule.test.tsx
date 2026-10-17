import { nextOccurrence } from "@/components/schedule/StreamSchedule";

// Schedule times are written in America/New_York (see lib/schedule-data.ts).
const monday7pm = {
  day: 1 as const,
  start: "19:00",
  durationHours: 3,
  title: "",
};

describe("nextOccurrence", () => {
  it("finds the upcoming slot in the schedule timezone (EDT, UTC-4)", () => {
    // Sun 2026-10-18 12:00 UTC → next Monday 19:00 EDT = 23:00 UTC
    const now = Date.UTC(2026, 9, 18, 12, 0);
    expect(nextOccurrence(monday7pm, now)).toBe(Date.UTC(2026, 9, 19, 23, 0));
  });

  it("uses standard time after the DST change (EST, UTC-5)", () => {
    // Sun 2026-11-08 12:00 UTC → Mon 2026-11-09 19:00 EST = Tue 00:00 UTC
    const now = Date.UTC(2026, 10, 8, 12, 0);
    expect(nextOccurrence(monday7pm, now)).toBe(Date.UTC(2026, 10, 10, 0, 0));
  });

  it("keeps a stream in progress as the current occurrence", () => {
    // Tue 2026-10-20 01:00 UTC = Mon 21:00 EDT, two hours into the stream
    const now = Date.UTC(2026, 9, 20, 1, 0);
    expect(nextOccurrence(monday7pm, now)).toBe(Date.UTC(2026, 9, 19, 23, 0));
  });

  it("rolls over to next week once the stream has ended", () => {
    // Tue 2026-10-20 03:00 UTC = Mon 23:00 EDT, just after the end
    const now = Date.UTC(2026, 9, 20, 3, 0);
    expect(nextOccurrence(monday7pm, now)).toBe(Date.UTC(2026, 9, 26, 23, 0));
  });
});
