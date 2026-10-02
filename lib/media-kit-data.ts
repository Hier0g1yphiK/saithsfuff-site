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
  logo: string;
  category: string;
}

export interface ContentExample {
  postUrl: string; // Instagram post/reel permalink for the embed
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
  { range: "13-17", percentage: 3 },
  { range: "18-24", percentage: 48.4 },
  { range: "25-34", percentage: 34.9 },
  { range: "35-44", percentage: 8.5 },
  { range: "45-54", percentage: 3.2 },
  { range: "55+", percentage: 1.8 },
];

/** Gender distribution — replace with real analytics */
export const genderDistribution: DemographicGender[] = [
  { label: "Female", percentage: 69.1 },
  { label: "Male", percentage: 29.9 },
  { label: "Other", percentage: 1 },
];

/** Top geographic locations — replace with real analytics */
export const topLocations: DemographicLocation[] = [
  { country: "United States", percentage: 28.5 },
  { country: "United Kingdom", percentage: 5.7 },
  { country: "Brazil", percentage: 10.9 },
  { country: "Mexico", percentage: 7.8 },
  { country: "Argentina", percentage: 3.5 },
];

/** Audience interest categories — replace with real data */
export const audienceInterests: string[] = [
  "Gaming",
  "Beauty & Fashion",
  "Clay Modelling",
  "Woodwork",
  "Cricut",
  "Arts & Craft",
  "Technology",
  "Lifestyle",
  "Blind Boxes"
];

/** Brand collaborations — replace with real partners */
export const brandCollaborations: BrandCollab[] = [
  { name: "CyberPower PC", logo: "/images/logos/cyberpower.png", category: "Gaming" },
  { name: "AMD", logo: "/images/logos/amd.png", category: "Gaming" },
  { name: "Asus", logo: "/images/logos/asus.png", category: "Gaming" },
  { name: "Charlotte Tilbury", logo: "/images/logos/charlotte-tilbury.png", category: "Beauty" },
  { name: "Hyte", logo: "/images/logos/charlotte-tilbury.png", category: "Gaming" },
  { name: "Nintendo", logo: "/images/logos/charlotte-tilbury.png", category: "Gaming" },
  { name: "Minecraft", logo: "/images/logos/charlotte-tilbury.png", category: "Gaming" },
];

/** Content examples — Instagram reels embedded via Instagram's embed script */
export const contentExamples: ContentExample[] = [
  { postUrl: "https://www.instagram.com/reel/Dcn2WDMChKs/" },
  { postUrl: "https://www.instagram.com/reel/DV88KJGgiiv/" },
  { postUrl: "https://www.instagram.com/reel/DHEZU57iVfv/" },
  { postUrl: "https://www.instagram.com/reel/C12NQI8ip1v/" },
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
