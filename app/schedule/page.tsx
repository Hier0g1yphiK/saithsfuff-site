import type { Metadata } from "next";
import { pageMetadata } from "@/lib/site";
import DecorativeStars from "@/components/shared/DecorativeStars";
import NavBar from "@/components/shared/NavBar";
import Footer from "@/components/shared/Footer";
import ScheduleHero from "@/components/schedule/ScheduleHero";
import StreamSchedule from "@/components/schedule/StreamSchedule";

const TWITCH_CHANNEL_URL = "https://www.twitch.tv/saithsfuff";

/**
 * Page-level metadata for SEO and social sharing on the `/schedule` route.
 */
export const metadata: Metadata = pageMetadata({
  title: "Stream Schedule | saithsfuff",
  description:
    "When saithsfuff is live on Twitch — the weekly stream schedule, shown in your own timezone.",
  path: "/schedule",
});

/**
 * Schedule page — the `/schedule` route.
 *
 * Shows the weekly stream schedule from `lib/schedule-data.ts` in the
 * visitor's timezone, with a link to follow on Twitch.
 *
 * This is a React Server Component; `StreamSchedule` is the only client part.
 */
export default function SchedulePage() {
  return (
    <>
      <DecorativeStars />
      <NavBar />
      <main>
        <ScheduleHero />
        <StreamSchedule />
        <div className="pb-12 text-center">
          <a
            href={TWITCH_CHANNEL_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block rounded-pill bg-lavender-500 px-6 py-3 font-display font-semibold text-white shadow-whimsical transition-colors hover:bg-lavender-600"
          >
            Follow on Twitch 💜
            <span className="sr-only">(opens in new tab)</span>
          </a>
        </div>
      </main>
      <Footer />
    </>
  );
}
