// =============================================================================
// SMP Page — Static Data
// =============================================================================
//
// Provides all static content for the `/smp` route. Components import from
// this file rather than hard-coding strings, keeping copy centralised and
// type-safe.
//
// @module lib/smp-data
//
// @example
// ```ts
// import { smpData } from "@/lib/smp-data";
//
// // Access the server IP
// console.log(smpData.serverIp); // "play.saithsfuff.com"
//
// // Iterate Java Edition steps
// smpData.javaSection.steps.forEach((step) => console.log(step));
// ```
// =============================================================================

// --- Interfaces ---

/**
 * Shape of the hero section content.
 *
 * Used by `components/smp/SmpHero.tsx` to render the page heading area.
 */
export interface SmpHeroData {
  /** Server name displayed as the `<h1>` heading with `gradient-text` styling. */
  serverName: string;
  /**
   * Tagline displayed below the heading.
   * Should be ≤150 characters to maintain visual balance.
   */
  tagline: string;
}

/** A helpful video link with label and URL. */
export interface SmpHelpVideo {
  /** Descriptive label shown as the link text. */
  label: string;
  /** YouTube URL for the video. */
  url: string;
}

/**
 * Shape of the whitelist / access requirements section.
 *
 * Used by `components/smp/WhitelistSection.tsx` to explain how players
 * can get whitelisted on the server.
 */
export interface SmpWhitelistSection {
  /** Section heading text rendered as `<h2>`. */
  title: string;
  /** Explanation of how to get whitelisted. */
  description: string;
  /** URL to the Twitch channel for redeeming channel points. */
  twitchUrl: string;
}

/**
 * Shape of a connection section (Java or Bedrock).
 *
 * Used by `components/smp/JavaSection.tsx` and `components/smp/BedrockSection.tsx`
 * to render platform-specific joining instructions.
 */
export interface SmpConnectionSection {
  /** Section heading text rendered as `<h2>`. */
  title: string;
  /**
   * Step-by-step instructions for connecting to the server.
   * Non-empty tuple type ensures at least one step exists at compile time.
   */
  steps: [string, ...string[]];
  /**
   * Optional help videos displayed below the steps.
   * Typically used for Bedrock where joining is less straightforward.
   */
  helpVideos?: SmpHelpVideo[];
}

/**
 * Top-level SMP page data.
 *
 * Single source of truth for all text displayed on the `/smp` route.
 * Imported by every SMP component to keep content decoupled from markup.
 *
 * @example
 * ```ts
 * import { smpData } from "@/lib/smp-data";
 * const { hero, serverIp, javaSection, bedrockSection } = smpData;
 * ```
 */
export interface SmpPageData {
  /** Hero section content (server name + tagline). */
  hero: SmpHeroData;
  /** The server IP address displayed and copied by `ServerIpDisplay`. */
  serverIp: string;
  /** The Bedrock Edition server IP address. */
  bedrockIp: string;
  /** The Bedrock Edition server port. */
  bedrockPort: number;
  /** Java Edition connection section data. */
  javaSection: SmpConnectionSection;
  /** Bedrock Edition connection section data. */
  bedrockSection: SmpConnectionSection;
  /** Whitelist / how-to-join requirements section. */
  whitelistSection: SmpWhitelistSection;
}

// --- Data ---

/**
 * Static content for the SMP page.
 *
 * Consumed by:
 * - `components/smp/SmpHero.tsx` — `hero.serverName`, `hero.tagline`
 * - `components/smp/ServerIpDisplay.tsx` — `serverIp` (via prop from JavaSection)
 * - `components/smp/JavaSection.tsx` — `javaSection.title`, `javaSection.steps`, `serverIp`
 * - `components/smp/BedrockSection.tsx` — `bedrockSection.title`, `bedrockSection.steps`
 */
export const smpData: SmpPageData = {
  hero: {
    serverName: "Saithsfuff SMP's",
    tagline: "A cozy community Minecraft server, with both Java and Bedrock players! A new modded Java SMP coming soon!",
  },
  serverIp: "saith.kinetichosting.gg",
  bedrockIp: "212.117.170.28",
  bedrockPort: 25682,
  javaSection: {
    title: "Java Edition",
    steps: [
      "Open Minecraft Java Edition and go to Multiplayer.",
      "Click \"Add Server\" and paste the IP address below.",
      "Join and have fun!",
    ],
  },
  bedrockSection: {
    title: "Bedrock Edition",
    steps: [
      "Open Minecraft Bedrock Edition and go to the Servers tab.",
      "Scroll to the bottom and click \"Add Server\".",
      "Enter the server address (212.117.170.28) and port (25682).",
      "Join and have fun!",
    ],
    helpVideos: [
      {
        label: "On Bedrock devices and need help joining? Here is a helpful video!",
        url: "https://www.youtube.com/watch?v=bDvo9XO-uAU&feature=youtu.be",
      },
      {
        label: "On Nintendo Switch? Try this video!",
        url: "https://youtu.be/zalT_oR1nPM",
      },
    ],
  },
  whitelistSection: {
    title: "How to Get Whitelisted",
    description:
      "To be whitelisted on the FuffSMP you need to either be a past member or redeem \"Join the SMP\" for 500 channel points on Twitch (a follow and roughly an hour of watchtime).",
    twitchUrl: "https://twitch.tv/saithsfuff",
  },
};
