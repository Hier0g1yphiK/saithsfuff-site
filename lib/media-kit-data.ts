// =============================================================================
// Media Kit / Portfolio — Placeholder Data
// =============================================================================
// All values below are PLACEHOLDER content intended for later customization.
// Replace with real data when ready to go live.
// =============================================================================

// --- Interfaces ---

export interface PlatformStat {
  platform: string;
  icon: string;
  followers: string;
  avgViews: string;
}

export interface DemographicAge {
  range: string;
  percentage: number;
}

export interface DemographicGender {
  label: string;
  percentage: number;
}

export interface DemographicLocation {
  country: string;
  percentage: number;
}

export interface BrandCollab {
  name: string;
  logoPlaceholder: string;
  category: string;
}

export interface ContentExample {
  title: string;
  platform: string;
  views: string;
  thumbnailColor: string; // Tailwind bg class for placeholder thumbnail
}

export interface ContactInfo {
  email: string;
  socialLinks: { platform: string; url: string; label: string }[];
}

// --- Placeholder Data ---

/** Platform statistics — replace with real numbers */
export const platformStats: PlatformStat[] = [
  { platform: "Twitch", icon: "/images/links/twitch.png", followers: "18.4K", avgViews: "38" },
  { platform: "Instagram", icon: "/images/links/instagram.png", followers: "56.6K", avgViews: "3.4K" },
  { platform: "TikTok", icon: "/images/links/tiktok.png", followers: "70.5K", avgViews: "38" },
];

/** Age breakdown — replace with real analytics */
export const ageBreakdown: DemographicAge[] = [
  { range: "18-24", percentage: 42 },
  { range: "25-34", percentage: 35 },
  { range: "35-44", percentage: 15 },
  { range: "45+", percentage: 8 },
];

/** Gender distribution — replace with real analytics */
export const genderDistribution: DemographicGender[] = [
  { label: "Female", percentage: 58 },
  { label: "Male", percentage: 36 },
  { label: "Other", percentage: 6 },
];

/** Top geographic locations — replace with real analytics */
export const topLocations: DemographicLocation[] = [
  { country: "United States", percentage: 45 },
  { country: "United Kingdom", percentage: 18 },
  { country: "Canada", percentage: 12 },
  { country: "Australia", percentage: 8 },
  { country: "Germany", percentage: 5 },
];

/** Audience interest categories — replace with real data */
export const audienceInterests: string[] = [
  "Gaming",
  "Beauty & Fashion",
  "Music",
  "Technology",
  "Lifestyle",
];

/** Brand collaborations — replace with real partners */
export const brandCollaborations: BrandCollab[] = [
  { name: "Cozy Gaming Co.", logoPlaceholder: "🎮", category: "Gaming" },
  { name: "Pastel Beauty", logoPlaceholder: "💄", category: "Beauty" },
  { name: "CloudSnack", logoPlaceholder: "☁️", category: "Food & Beverage" },
  { name: "Neon Threads", logoPlaceholder: "👕", category: "Fashion" },
  { name: "PixelPerfect", logoPlaceholder: "📱", category: "Tech" },
  { name: "DreamStream", logoPlaceholder: "🌙", category: "Lifestyle" },
];

/** Content examples — replace with real content */
export const contentExamples: ContentExample[] = [
  { title: "Cozy Gaming Setup Tour", platform: "TikTok", views: "124K", thumbnailColor: "bg-pink-200" },
  { title: "Morning Routine GRWM", platform: "Instagram", views: "45K", thumbnailColor: "bg-lavender-200" },
  { title: "Brand Unboxing & Review", platform: "TikTok", views: "89K", thumbnailColor: "bg-mint-200" },
  { title: "Stream Highlights Reel", platform: "Twitch", views: "32K", thumbnailColor: "bg-pink-100" },
];

/** Contact information — replace with real details */
export const contactInfo: ContactInfo = {
  email: "saithsfuff@gmail.com",
  socialLinks: [
    { platform: "Twitch", url: "https://twitch.tv/saithsfuff", label: "twitch.tv/saithsfuff" },
    { platform: "Instagram", url: "https://www.instagram.com/saithsfuff/", label: "instagram.com/saithsfuff/" },
    { platform: "TikTok", url: "https://www.tiktok.com/@saithsfuff", label: "tiktok.com/@saithsfuff" },
  ],
};
