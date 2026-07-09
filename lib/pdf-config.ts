import type {
  PlatformStat,
  DemographicAge,
  DemographicGender,
  DemographicLocation,
  BrandCollab,
  ContentExample,
  ContactInfo,
} from '@/lib/media-kit-data';

/**
 * PDF generation configuration constants.
 * Defines page layout, typography, color palette, and rendering limits.
 */
export const PDF_CONFIG = {
  pageSize: 'letter' as const,
  orientation: 'portrait' as const,
  margins: { top: 36, right: 36, bottom: 36, left: 36 },
  fonts: {
    heading: { name: 'Helvetica', style: 'bold', size: 18 },
    subheading: { name: 'Helvetica', style: 'bold', size: 14 },
    body: { name: 'Helvetica', style: 'normal', size: 11 },
  },
  colors: {
    pink: [244, 180, 195] as const,
    lavender: [180, 170, 220] as const,
    mint: [170, 220, 200] as const,
    textDark: [40, 40, 40] as const,
    textMuted: [100, 100, 120] as const,
  },
  borderRadius: 8,
  maxLocations: 5,
  maxInterests: 10,
  maxTitleLength: 80,
} as const;

/**
 * Aggregated input interface for the PDF generator function.
 * Decouples the generator from the data module's export structure.
 */
export interface MediaKitPdfInput {
  creatorName: string;
  tagline: string;
  platformStats: PlatformStat[];
  ageBreakdown: DemographicAge[];
  genderDistribution: DemographicGender[];
  topLocations: DemographicLocation[];
  audienceInterests: string[];
  brandCollaborations: BrandCollab[];
  contentExamples: ContentExample[];
  contactInfo: ContactInfo;
}
