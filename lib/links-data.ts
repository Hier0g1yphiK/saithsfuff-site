// =============================================================================
// Links Page — Static Data
// =============================================================================

// --- Interfaces ---

/**
 * Represents a single external link on the Links page.
 *
 * Used for both social media profiles and partner/sponsor links.
 */
export interface LinkItem {
  /** Display name shown on the card (e.g. "Instagram", "Kinetic Hosting") */
  name: string;
  /** Full destination URL — opens in a new tab */
  href: string;
  /** Optional supporting text (discount codes, invitations, etc.) */
  description?: string;
  /** Path to the logo image in `/public` (e.g. "/images/links/instagram.png") */
  icon: string;
}

// --- Social Media Links ---

/**
 * All social media profile links, displayed in the "Social Media" section.
 * Order determines render order on the page.
 */
export const socialLinks: LinkItem[] = [
  { name: "Instagram", href: "https://instagram.com/saithsfuff", icon: "/images/links/instagram.png" },
  { name: "TikTok", href: "https://www.tiktok.com/@saithsfuff", icon: "/images/links/tiktok.png" },
  { name: "Twitch", href: "https://twitch.tv/saithsfuff", icon: "/images/links/twitch.png" },
  { name: "Twitter", href: "https://twitter.com/saithsfuff", icon: "/images/links/twitter.png" },
  { name: "BlueSky", href: "https://bsky.app/profile/saithsfuff.bsky.social", icon: "/images/links/bluesky.png" },
  { name: "YouTube", href: "https://www.youtube.com/saithsfuff", icon: "/images/links/youtube.png" },
  { name: "Threads", href: "https://www.threads.net/@saithsfuff", icon: "/images/links/threads.png" },
  { name: "Clips TikTok", href: "https://www.tiktok.com/@ttv.saithsfuff", icon: "/images/links/clips-tiktok.png" },
  { name: "Discord", href: "https://discord.gg/fuff", description: "Invite your friends!", icon: "/images/links/discord.png" },
];

// --- Partner & Sponsor Links ---

/**
 * Partner and sponsor links with associated discount codes, displayed in the
 * "Partners & Sponsors" section. Order determines render order on the page.
 */
export const partnerLinks: LinkItem[] = [
  { name: "Throne", href: "https://throne.com/saithsfuff/wishlist", description: "Proud to be a Throne Partner!", icon: "/images/links/throne.png" },
  { name: "Kinetic Hosting", href: "https://kinetichosting.net/", description: "Need a server? Use code 'SAITHSFUFF' for 15% off every month at Kinetic Hosting!", icon: "/images/links/kinetic-hosting.png" },
  { name: "Pin-Ace", href: "https://pin-ace.com/SAITHSFUFF", description: "Pride Pins! Use code 'SAITHSFUFF' for 15% off your entire order!", icon: "/images/links/pin-ace.png" },
  { name: "Oodie", href: "https://www.theoodie.co.uk/FAITHSAITHSFUFF", description: "Use code 'SAITHSFUFF15' for 15% off your oodie!", icon: "/images/links/oodie.png" },
  { name: "Divoom", href: "https://divoom.com/saithsfuff", description: "Use code 'SAITHSFUFF' for 10% off your entire order!", icon: "/images/links/divoom.png" },
  { name: "Charlotte Tilbury", href: "https://friends.charlottetilbury.com/s/saithsfuff", description: "Use code 'saithsfuffSMJ95' for 15% off your order!", icon: "/images/links/charlotte-tilbury.png" },
];
