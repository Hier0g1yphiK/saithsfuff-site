import * as fc from 'fast-check';
import { generateMediaKitPdf } from '@/lib/pdf-generator';
import type { MediaKitPdfInput } from '@/lib/pdf-config';
import type {
  PlatformStat,
  DemographicAge,
  DemographicGender,
  DemographicLocation,
  BrandCollab,
  ContentExample,
  ContactInfo,
} from '@/lib/media-kit-data';

// ─── Shared Helpers ──────────────────────────────────────────────────────────

/**
 * Extract raw text content from a PDF Blob by reading as binary string.
 * jsPDF embeds text as readable strings in the raw PDF bytes.
 */
function blobToText(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsBinaryString(blob);
  });
}

/**
 * Builds a valid base MediaKitPdfInput with non-empty defaults for all fields.
 * Tests can override specific fields as needed.
 */
function buildBaseInput(): MediaKitPdfInput {
  return {
    creatorName: 'saithsfuff',
    tagline: 'Content creator and gamer',
    platformStats: [
      { platform: 'Twitch', icon: '/images/twitch.png', followers: '18.4K', avgViews: '38' },
    ],
    ageBreakdown: [{ range: '18-24', percentage: 42 }],
    genderDistribution: [{ label: 'Female', percentage: 58 }],
    topLocations: [{ country: 'United States', percentage: 45 }],
    audienceInterests: ['Gaming'],
    brandCollaborations: [{ name: 'CyberPower PC', logoPlaceholder: '🎮', category: 'Gaming' }],
    contentExamples: [{ title: 'Cozy Gaming Setup', platform: 'TikTok', views: '124K', thumbnailColor: 'bg-pink-200' }],
    contactInfo: {
      email: 'test@example.com',
      socialLinks: [{ platform: 'Twitch', url: 'https://twitch.tv/test', label: 'twitch.tv/test' }],
    },
  };
}

// ─── Shared Arbitraries ──────────────────────────────────────────────────────

/**
 * Generates a platform stat with alpha-only platform name (avoids regex/PDF encoding issues),
 * and follower/view count strings in common formats.
 */
const platformStatArb: fc.Arbitrary<PlatformStat> = fc.record({
  platform: fc.string({ minLength: 2, maxLength: 15, unit: fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  ) }),
  icon: fc.constant('/images/icon.png'),
  followers: fc.oneof(
    fc.nat({ max: 999 }).map(n => `${n}`),
    fc.tuple(fc.nat({ max: 999 }), fc.constantFrom('K', 'M')).map(([n, s]) => `${n}${s}`),
    fc.tuple(fc.integer({ min: 1, max: 99 }), fc.integer({ min: 0, max: 9 }), fc.constantFrom('K', 'M')).map(([a, b, s]) => `${a}.${b}${s}`)
  ),
  avgViews: fc.oneof(
    fc.nat({ max: 999 }).map(n => `${n}`),
    fc.tuple(fc.nat({ max: 999 }), fc.constantFrom('K', 'M')).map(([n, s]) => `${n}${s}`),
    fc.tuple(fc.integer({ min: 1, max: 99 }), fc.integer({ min: 0, max: 9 }), fc.constantFrom('K', 'M')).map(([a, b, s]) => `${a}.${b}${s}`)
  ),
});

// ─── Arbitraries for Property 2 ──────────────────────────────────────────────

const demographicAgeArb: fc.Arbitrary<DemographicAge> = fc.record({
  range: fc.string({ minLength: 2, maxLength: 10, unit: fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyz0123456789-'.split('')
  ) }),
  percentage: fc.integer({ min: 0, max: 100 }),
});

const demographicGenderArb: fc.Arbitrary<DemographicGender> = fc.record({
  label: fc.string({ minLength: 2, maxLength: 15, unit: fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  ) }),
  percentage: fc.integer({ min: 0, max: 100 }),
});

const demographicLocationArb: fc.Arbitrary<DemographicLocation> = fc.record({
  country: fc.string({ minLength: 2, maxLength: 20, unit: fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('')
  ) }),
  percentage: fc.integer({ min: 0, max: 100 }),
});

const brandCollabArb: fc.Arbitrary<BrandCollab> = fc.record({
  name: fc.string({ minLength: 2, maxLength: 20, unit: fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  ) }),
  logoPlaceholder: fc.constantFrom('🎮', '💄', '🎵', '💻'),
  category: fc.string({ minLength: 2, maxLength: 15, unit: fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  ) }),
});

const contentExampleArb: fc.Arbitrary<ContentExample> = fc.record({
  title: fc.string({ minLength: 2, maxLength: 60, unit: fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('')
  ) }),
  platform: fc.constantFrom('TikTok', 'Instagram', 'Twitch', 'YouTube'),
  views: fc.string({ minLength: 1, maxLength: 10, unit: fc.constantFrom(
    ...'0123456789KM.'.split('')
  ) }),
  thumbnailColor: fc.constantFrom('bg-pink-200', 'bg-lavender-200', 'bg-mint-200'),
});

const contactInfoArb: fc.Arbitrary<ContactInfo> = fc.record({
  email: fc.constant('test@example.com'),
  socialLinks: fc.array(
    fc.record({
      platform: fc.constantFrom('Twitch', 'Instagram', 'TikTok', 'YouTube'),
      url: fc.constant('https://example.com/profile'),
      label: fc.string({ minLength: 2, maxLength: 20, unit: fc.constantFrom(
        ...'abcdefghijklmnopqrstuvwxyz./'.split('')
      ) }),
    }),
    { minLength: 1, maxLength: 3 }
  ),
});

/**
 * Arbitrary that generates MediaKitPdfInput with randomly empty arrays.
 * Each array field is either empty [] or has 1-3 entries.
 */
const inputWithRandomlyEmptyArraysArb: fc.Arbitrary<MediaKitPdfInput> = fc.record({
  creatorName: fc.string({ minLength: 2, maxLength: 20, unit: fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  ) }),
  tagline: fc.string({ minLength: 2, maxLength: 80, unit: fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('')
  ) }),
  platformStats: fc.oneof(
    fc.constant([] as PlatformStat[]),
    fc.array(platformStatArb, { minLength: 1, maxLength: 3 })
  ),
  ageBreakdown: fc.oneof(
    fc.constant([] as DemographicAge[]),
    fc.array(demographicAgeArb, { minLength: 1, maxLength: 3 })
  ),
  genderDistribution: fc.oneof(
    fc.constant([] as DemographicGender[]),
    fc.array(demographicGenderArb, { minLength: 1, maxLength: 3 })
  ),
  topLocations: fc.oneof(
    fc.constant([] as DemographicLocation[]),
    fc.array(demographicLocationArb, { minLength: 1, maxLength: 3 })
  ),
  audienceInterests: fc.oneof(
    fc.constant([] as string[]),
    fc.array(fc.string({ minLength: 2, maxLength: 15, unit: fc.constantFrom(
      ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
    ) }), { minLength: 1, maxLength: 3 })
  ),
  brandCollaborations: fc.oneof(
    fc.constant([] as BrandCollab[]),
    fc.array(brandCollabArb, { minLength: 1, maxLength: 3 })
  ),
  contentExamples: fc.oneof(
    fc.constant([] as ContentExample[]),
    fc.array(contentExampleArb, { minLength: 1, maxLength: 3 })
  ),
  contactInfo: contactInfoArb,
});

/**
 * Arbitrary that generates a valid MediaKitPdfInput with ALL non-empty arrays.
 * This ensures every section will be rendered in the PDF.
 */
const validFullInputArb: fc.Arbitrary<MediaKitPdfInput> = fc.record({
  creatorName: fc.string({ minLength: 2, maxLength: 20, unit: fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  ) }),
  tagline: fc.string({ minLength: 2, maxLength: 80, unit: fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('')
  ) }),
  platformStats: fc.array(platformStatArb, { minLength: 1, maxLength: 4 }),
  ageBreakdown: fc.array(demographicAgeArb, { minLength: 1, maxLength: 4 }),
  genderDistribution: fc.array(demographicGenderArb, { minLength: 1, maxLength: 3 }),
  topLocations: fc.array(demographicLocationArb, { minLength: 1, maxLength: 5 }),
  audienceInterests: fc.array(fc.string({ minLength: 2, maxLength: 15, unit: fc.constantFrom(
    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
  ) }), { minLength: 1, maxLength: 8 }),
  brandCollaborations: fc.array(brandCollabArb, { minLength: 1, maxLength: 4 }),
  contentExamples: fc.array(contentExampleArb, { minLength: 1, maxLength: 4 }),
  contactInfo: contactInfoArb,
});

// ─── Property Tests ──────────────────────────────────────────────────────────

describe('PDF Generator — Property-Based Tests', () => {

  describe('Property 1: PDF section completeness', () => {
    /**
     * **Validates: Requirements 2.1, 3.1, 4.1, 5.1, 6.1, 7.1, 8.1**
     *
     * For any valid MediaKitPdfInput where all arrays are non-empty,
     * the generated PDF SHALL contain all six section headings in the specified order.
     */
    it('contains all six section headings when all arrays are non-empty', async () => {
      await fc.assert(
        fc.asyncProperty(
          validFullInputArb,
          async (input) => {
            const blob = await generateMediaKitPdf(input);
            const text = await blobToText(blob);

            // All section headings should be present
            expect(text).toContain('Introduction');
            expect(text).toContain('Platform Statistics');
            expect(text).toContain('Audience Demographics');
            expect(text).toContain("Brands I've Worked With");
            expect(text).toContain('Content Examples');
            expect(text).toContain('Contact');

            // Verify ordering: each heading appears before the next
            const introIdx = text.indexOf('Introduction');
            const platformIdx = text.indexOf('Platform Statistics');
            const demoIdx = text.indexOf('Audience Demographics');
            const brandsIdx = text.indexOf("Brands I've Worked With");
            const contentIdx = text.indexOf('Content Examples');
            const contactIdx = text.indexOf('Contact');

            expect(introIdx).toBeGreaterThanOrEqual(0);
            expect(platformIdx).toBeGreaterThanOrEqual(0);
            expect(demoIdx).toBeGreaterThanOrEqual(0);
            expect(brandsIdx).toBeGreaterThanOrEqual(0);
            expect(contentIdx).toBeGreaterThanOrEqual(0);
            expect(contactIdx).toBeGreaterThanOrEqual(0);

            expect(introIdx).toBeLessThan(platformIdx);
            expect(platformIdx).toBeLessThan(demoIdx);
            expect(demoIdx).toBeLessThan(brandsIdx);
            expect(brandsIdx).toBeLessThan(contentIdx);
            expect(contentIdx).toBeLessThan(contactIdx);
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  describe('Property 2: Graceful omission of empty sections', () => {
    /**
     * **Validates: Requirements 3.4, 4.4, 5.6, 6.3, 7.4**
     *
     * For any MediaKitPdfInput where one or more array fields are empty,
     * the PDF generator produces a valid PDF that omits the corresponding sections
     * entirely while still rendering all sections whose data is non-empty.
     */
    it('omits headings for empty sections and retains headings for non-empty sections', async () => {
      await fc.assert(
        fc.asyncProperty(
          inputWithRandomlyEmptyArraysArb,
          async (input) => {
            const blob = await generateMediaKitPdf(input);
            expect(blob).toBeInstanceOf(Blob);
            const text = await blobToText(blob);

            // Platform Statistics
            if (input.platformStats.length === 0) {
              expect(text).not.toContain('Platform Statistics');
            } else {
              expect(text).toContain('Platform Statistics');
            }

            // Brand Collaborations
            if (input.brandCollaborations.length === 0) {
              expect(text).not.toContain("Brands I've Worked With");
            } else {
              expect(text).toContain("Brands I've Worked With");
            }

            // Content Examples
            if (input.contentExamples.length === 0) {
              expect(text).not.toContain('Content Examples');
            } else {
              expect(text).toContain('Content Examples');
            }

            // Audience Demographics - omitted only when ALL sub-arrays are empty
            const hasAnyDemographic =
              input.ageBreakdown.length > 0 ||
              input.genderDistribution.length > 0 ||
              input.topLocations.length > 0 ||
              input.audienceInterests.length > 0;

            if (!hasAnyDemographic) {
              expect(text).not.toContain('Audience Demographics');
            } else {
              expect(text).toContain('Audience Demographics');
            }
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  describe('Property 3: Platform stats order and field completeness', () => {
    /**
     * **Validates: Requirements 4.1, 4.2**
     *
     * For any non-empty platformStats array, the generated PDF renders each platform entry
     * in source-array order, and each entry includes the platform name, follower count,
     * and average views exactly as provided in the input strings.
     */
    it('renders platform name, followers, and avgViews in source order', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate 1-5 platform stats with unique names
          fc.array(platformStatArb, { minLength: 1, maxLength: 5 })
            .filter(stats => {
              // Ensure unique platform names
              const names = stats.map(s => s.platform);
              return new Set(names).size === names.length;
            }),
          async (stats) => {
            const input = buildBaseInput();
            input.platformStats = stats;

            const blob = await generateMediaKitPdf(input);
            const text = await blobToText(blob);

            // Each platform's name, followers, and avgViews should appear
            for (const stat of stats) {
              expect(text).toContain(stat.platform);
              expect(text).toContain(stat.followers);
              expect(text).toContain(stat.avgViews);
            }

            // Verify source order: each platform name appears after the previous one
            let lastIdx = -1;
            for (const stat of stats) {
              const idx = text.indexOf(stat.platform, lastIdx + 1);
              expect(idx).toBeGreaterThan(lastIdx);
              lastIdx = idx;
            }
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  describe('Property 4: Demographic percentage formatting', () => {
    /**
     * **Validates: Requirements 5.2, 5.3, 5.4**
     *
     * For any age breakdown entry, gender distribution entry, or location entry with a
     * valid percentage (integer 0–100), the generated PDF renders that entry as the label
     * followed by the percentage value as a whole integer and the "%" symbol.
     */
    it('renders percentages as whole integers with "%" symbol', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate age entries
          fc.array(
            fc.record({
              range: fc.string({ minLength: 2, maxLength: 10, unit: fc.constantFrom(
                ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'.split('')
              ) }),
              percentage: fc.integer({ min: 0, max: 100 }),
            }),
            { minLength: 1, maxLength: 4 }
          ),
          // Generate gender entries
          fc.array(
            fc.record({
              label: fc.string({ minLength: 2, maxLength: 10, unit: fc.constantFrom(
                ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
              ) }),
              percentage: fc.integer({ min: 0, max: 100 }),
            }),
            { minLength: 1, maxLength: 3 }
          ),
          // Generate location entries
          fc.array(
            fc.record({
              country: fc.string({ minLength: 3, maxLength: 15, unit: fc.constantFrom(
                ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
              ) }),
              percentage: fc.integer({ min: 0, max: 100 }),
            }),
            { minLength: 1, maxLength: 5 }
          ),
          async (ageBreakdown, genderDistribution, topLocations) => {
            const input = buildBaseInput();
            input.ageBreakdown = ageBreakdown;
            input.genderDistribution = genderDistribution;
            input.topLocations = topLocations;

            const blob = await generateMediaKitPdf(input);
            const text = await blobToText(blob);

            // Each entry should show "percentage%"
            for (const entry of ageBreakdown) {
              expect(text).toContain(`${Math.round(entry.percentage)}%`);
            }
            for (const entry of genderDistribution) {
              expect(text).toContain(`${Math.round(entry.percentage)}%`);
            }
            for (const entry of topLocations.slice(0, 5)) {
              expect(text).toContain(`${Math.round(entry.percentage)}%`);
            }
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  describe('Property 5: Bounded list rendering', () => {
    /**
     * **Validates: Requirements 5.4, 5.5**
     *
     * For any topLocations array of length N, the generated PDF renders exactly min(N, 5)
     * location entries in source order. For any audienceInterests array of length M, the
     * generated PDF renders exactly min(M, 10) interest labels in source order.
     */
    it('renders at most 5 locations and 10 interests in source order', async () => {
      await fc.assert(
        fc.asyncProperty(
          // 0-20 locations with unique country names (prefixed to avoid matching other PDF text)
          fc.uniqueArray(
            fc.record({
              country: fc.string({ minLength: 6, maxLength: 12, unit: fc.constantFrom(
                ...'abcdefghijklmnopqrstuvwxyz'.split('')
              ) }).map(s => `LOC${s}`),
              percentage: fc.integer({ min: 1, max: 100 }),
            }),
            { minLength: 0, maxLength: 20, selector: (loc) => loc.country }
          ),
          // 0-20 interests with unique strings (prefixed to avoid matching other PDF text)
          fc.uniqueArray(
            fc.string({ minLength: 6, maxLength: 15, unit: fc.constantFrom(
              ...'abcdefghijklmnopqrstuvwxyz'.split('')
            ) }).map(s => `INT${s}`),
            { minLength: 0, maxLength: 20 }
          ),
          async (locations, interests) => {
            const input = buildBaseInput();
            input.topLocations = locations;
            input.audienceInterests = interests;

            const blob = await generateMediaKitPdf(input);
            const text = await blobToText(blob);

            // Locations: at most 5 rendered, in order
            const expectedLocations = locations.slice(0, 5);
            for (const loc of expectedLocations) {
              expect(text).toContain(loc.country);
            }
            // Locations beyond 5 should NOT appear
            for (const loc of locations.slice(5)) {
              expect(text).not.toContain(loc.country);
            }

            // Interests: at most 10 rendered
            const expectedInterests = interests.slice(0, 10);
            for (const interest of expectedInterests) {
              expect(text).toContain(interest);
            }
            // Interests beyond 10 should NOT appear
            for (const interest of interests.slice(10)) {
              expect(text).not.toContain(interest);
            }
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  describe('Property 6: Brand collaborations order and completeness', () => {
    /**
     * **Validates: Requirements 6.1, 6.2**
     *
     * For any non-empty brandCollaborations array, the generated PDF renders each entry
     * in source-array order, and each entry includes the logoPlaceholder, brand name, and category.
     *
     * Note: jsPDF encodes text as UTF-16BE when the string contains non-WinAnsi characters
     * (like emoji logoPlaceholders). We search for names using UTF-16BE encoding to match
     * the actual PDF binary content.
     */

    /** Encode a string as UTF-16BE (how jsPDF stores text containing non-WinAnsi chars) */
    function toUtf16BE(str: string): string {
      let result = '';
      for (let i = 0; i < str.length; i++) {
        const code = str.charCodeAt(i);
        result += String.fromCharCode((code >> 8) & 0xff) + String.fromCharCode(code & 0xff);
      }
      return result;
    }

    it('renders each collaboration name and category in source order', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate 1-5 brand collaborations with unique names
          fc.array(brandCollabArb, { minLength: 1, maxLength: 5 })
            .filter(collabs => {
              const names = collabs.map(c => c.name);
              return new Set(names).size === names.length;
            }),
          async (collabs) => {
            const input = buildBaseInput();
            input.brandCollaborations = collabs;

            const blob = await generateMediaKitPdf(input);
            const text = await blobToText(blob);

            // jsPDF uses UTF-16BE encoding for text containing emoji logoPlaceholders
            // Search for names and categories using UTF-16BE encoding
            for (const collab of collabs) {
              const nameUtf16 = toUtf16BE(collab.name);
              const categoryUtf16 = toUtf16BE(collab.category);
              expect(text).toContain(nameUtf16);
              expect(text).toContain(categoryUtf16);
            }

            // Verify entries appear in source-array order by checking name indices are ascending
            let lastIdx = -1;
            for (const collab of collabs) {
              const nameUtf16 = toUtf16BE(collab.name);
              const idx = text.indexOf(nameUtf16, lastIdx + 1);
              expect(idx).toBeGreaterThan(lastIdx);
              lastIdx = idx;
            }
          }
        ),
        { numRuns: 20 }
      );
    });
  });

  describe('Property 7: Content title truncation', () => {
    /**
     * **Validates: Requirements 7.2**
     *
     * For any content example with a title string, if the title length exceeds 80 characters,
     * the rendered title in the PDF SHALL be truncated to 80 characters followed by an ellipsis.
     * If the title length is ≤ 80 characters, it SHALL be rendered in full.
     */
    it('truncates titles > 80 chars and renders titles ≤ 80 chars in full', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate a title of random length 1–200 using alpha-only chars
          fc.string({
            minLength: 1,
            maxLength: 200,
            unit: fc.constantFrom(
              ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')
            ),
          }),
          async (title) => {
            const input = buildBaseInput();
            input.contentExamples = [{
              title,
              platform: 'TikTok',
              views: '100K',
              thumbnailColor: 'bg-pink-200',
            }];

            const blob = await generateMediaKitPdf(input);
            const text = await blobToText(blob);

            if (title.length > 80) {
              // The first 80 chars should appear in the PDF
              const truncatedPart = title.slice(0, 80);
              expect(text).toContain(truncatedPart);
              // The full title should NOT appear (it was truncated)
              expect(text).not.toContain(title);
            } else {
              // The full title should appear as-is
              expect(text).toContain(title);
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 8: Contact section hyperlinks', () => {
    /**
     * **Validates: Requirements 8.1, 8.2**
     *
     * For any valid contactInfo with an email string and a socialLinks array,
     * the generated PDF includes the email as a mailto hyperlink and all social link
     * entries as clickable hyperlinks to their URLs, rendered in source-array order.
     */
    it('renders email as mailto link and all socialLinks URLs in source order', async () => {
      const socialLinkArb = fc.record({
        platform: fc.constantFrom('Twitch', 'Instagram', 'TikTok', 'YouTube', 'Twitter'),
        url: fc.integer({ min: 1, max: 9999 }).map(n => `https://example.com/profile${n}`),
        label: fc.string({ minLength: 3, maxLength: 20, unit: fc.constantFrom(
          ...'abcdefghijklmnopqrstuvwxyz./'.split('')
        ) }),
      });

      const contactInfoPropertyArb: fc.Arbitrary<ContactInfo> = fc.record({
        email: fc.constant('test@example.com'),
        socialLinks: fc.array(socialLinkArb, { minLength: 1, maxLength: 5 }),
      });

      await fc.assert(
        fc.asyncProperty(
          contactInfoPropertyArb,
          async (contactInfo) => {
            const input = buildBaseInput();
            input.contactInfo = contactInfo;

            const blob = await generateMediaKitPdf(input);
            const text = await blobToText(blob);

            // Email address should appear in the PDF text
            expect(text).toContain(contactInfo.email);

            // mailto should appear (jsPDF embeds link annotations with the URL)
            expect(text).toContain('mailto');

            // Each social link URL should appear in the PDF text
            for (const link of contactInfo.socialLinks) {
              expect(text).toContain(link.url);
            }

            // Verify source order: each URL appears after the previous one
            let lastIdx = -1;
            for (const link of contactInfo.socialLinks) {
              const idx = text.indexOf(link.url, lastIdx + 1);
              expect(idx).toBeGreaterThan(lastIdx);
              lastIdx = idx;
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

  describe('Property 10: Content example ordering preservation', () => {
    /**
     * **Validates: Requirements 7.1, 7.2**
     *
     * For any non-empty contentExamples array, the generated PDF renders entries
     * in source-array order, displaying the platform name and view count string
     * as provided for each entry.
     */
    it('renders content examples in source-array order', async () => {
      await fc.assert(
        fc.asyncProperty(
          // Generate 1-5 content examples with unique view count strings
          fc.integer({ min: 1, max: 5 }).chain(count =>
            fc.tuple(
              // Generate `count` unique integer seeds for view counts
              fc.uniqueArray(fc.integer({ min: 1000, max: 99999 }), {
                minLength: count,
                maxLength: count,
              }),
              // Generate `count` platform names
              fc.array(
                fc.constantFrom('TikTok', 'Instagram', 'Twitch', 'YouTube'),
                { minLength: count, maxLength: count }
              ),
              // Generate `count` short titles (≤80 chars to avoid truncation)
              fc.array(
                fc.string({
                  minLength: 3,
                  maxLength: 30,
                  unit: fc.constantFrom(
                    ...'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ '.split('')
                  ),
                }),
                { minLength: count, maxLength: count }
              ),
            )
          ),
          async ([viewSeeds, platforms, titles]) => {
            // Build content examples with unique view counts
            const contentExamples: ContentExample[] = viewSeeds.map((seed, i) => ({
              title: titles[i],
              platform: platforms[i],
              views: `${seed} views`,
              thumbnailColor: 'bg-pink-200',
            }));

            const input = buildBaseInput();
            input.contentExamples = contentExamples;

            const blob = await generateMediaKitPdf(input);
            const text = await blobToText(blob);

            // Each entry's view count string should appear in the PDF
            for (const example of contentExamples) {
              expect(text).toContain(example.views);
            }

            // Verify entries appear in source-array order by checking
            // ascending indices of view count strings
            let lastIdx = -1;
            for (const example of contentExamples) {
              const idx = text.indexOf(example.views, lastIdx + 1);
              expect(idx).toBeGreaterThan(lastIdx);
              lastIdx = idx;
            }
          }
        ),
        { numRuns: 100 }
      );
    });
  });

});
