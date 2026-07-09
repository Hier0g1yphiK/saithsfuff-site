import { generateMediaKitPdf } from '@/lib/pdf-generator';
import type { MediaKitPdfInput } from '@/lib/pdf-config';

/**
 * Helper to extract raw text content from a PDF Blob.
 * jsdom Blob has limited API, so we read via FileReader.
 */
function blobToText(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = () => reject(reader.error);
    reader.readAsBinaryString(blob);
  });
}

function buildFullInput(): MediaKitPdfInput {
  return {
    creatorName: 'saithsfuff',
    tagline: 'Content creator, gamer, and creative soul',
    platformStats: [
      { platform: 'Twitch', icon: '/images/twitch.png', followers: '18.4K', avgViews: '38' },
      { platform: 'Instagram', icon: '/images/instagram.png', followers: '56.6K', avgViews: '3.4K' },
    ],
    ageBreakdown: [{ range: '18-24', percentage: 42 }],
    genderDistribution: [{ label: 'Female', percentage: 58 }],
    topLocations: [{ country: 'United States', percentage: 45 }],
    audienceInterests: ['Gaming', 'Beauty'],
    brandCollaborations: [{ name: 'CyberPower PC', logoPlaceholder: '🎮', category: 'Gaming' }],
    contentExamples: [{ title: 'Cozy Gaming Setup Tour', platform: 'TikTok', views: '124K', thumbnailColor: 'bg-pink-200' }],
    contactInfo: { email: 'test@test.com', socialLinks: [{ platform: 'Twitch', url: 'https://twitch.tv/saithsfuff', label: 'twitch.tv/saithsfuff' }] },
  };
}

describe('generateMediaKitPdf', () => {
  it('returns a Blob with type "application/pdf"', async () => {
    const input = buildFullInput();
    const blob = await generateMediaKitPdf(input);

    expect(blob).toBeInstanceOf(Blob);
    expect(blob.type).toBe('application/pdf');
  });

  it('PDF uses letter page size (612×792 points)', async () => {
    const input = buildFullInput();
    const blob = await generateMediaKitPdf(input);
    const text = await blobToText(blob);

    // Letter size in PDF points is 612 x 792
    expect(text).toContain('612');
    expect(text).toContain('792');
  });

  it('omits platform stats section when array is empty', async () => {
    const input = buildFullInput();
    input.platformStats = [];

    const blob = await generateMediaKitPdf(input);
    const text = await blobToText(blob);

    expect(text).not.toContain('Platform Statistics');
  });

  it('omits brand collaborations section when array is empty', async () => {
    const input = buildFullInput();
    input.brandCollaborations = [];

    const blob = await generateMediaKitPdf(input);
    const text = await blobToText(blob);

    expect(text).not.toContain("Brands I've Worked With");
  });

  it('omits content examples section when array is empty', async () => {
    const input = buildFullInput();
    input.contentExamples = [];

    const blob = await generateMediaKitPdf(input);
    const text = await blobToText(blob);

    expect(text).not.toContain('Content Examples');
  });

  it('truncates content titles exceeding 80 characters', async () => {
    const input = buildFullInput();
    const longTitle = 'A'.repeat(100);
    input.contentExamples = [
      { title: longTitle, platform: 'TikTok', views: '50K', thumbnailColor: 'bg-pink-200' },
    ];

    const blob = await generateMediaKitPdf(input);
    const text = await blobToText(blob);

    // The full 100-char title should NOT be present
    expect(text).not.toContain(longTitle);
    // The truncated 80-char version should be present
    expect(text).toContain('A'.repeat(80));
  });

  it('uses Helvetica font (system sans-serif fallback)', async () => {
    const input = buildFullInput();
    const blob = await generateMediaKitPdf(input);
    const text = await blobToText(blob);

    expect(text).toContain('Helvetica');
  });
});
