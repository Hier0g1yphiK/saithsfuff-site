import { jsPDF } from 'jspdf';
import { PDF_CONFIG, type MediaKitPdfInput } from '@/lib/pdf-config';

// ─── Types ───────────────────────────────────────────────────────────────────

type RGB = readonly [number, number, number];

// ─── Helper: Set Font ────────────────────────────────────────────────────────

/**
 * Applies a font preset from PDF_CONFIG to the document.
 */
function setFont(
  doc: jsPDF,
  preset: 'heading' | 'subheading' | 'body'
): void {
  const { name, style, size } = PDF_CONFIG.fonts[preset];
  doc.setFont(name, style);
  doc.setFontSize(size);
}

// ─── Helper: Set Color ───────────────────────────────────────────────────────

/**
 * Sets the draw/fill/text color from an RGB tuple.
 */
function setTextColor(doc: jsPDF, color: RGB): void {
  doc.setTextColor(color[0], color[1], color[2]);
}

function setDrawColor(doc: jsPDF, color: RGB): void {
  doc.setDrawColor(color[0], color[1], color[2]);
}

function setFillColor(doc: jsPDF, color: RGB): void {
  doc.setFillColor(color[0], color[1], color[2]);
}

// ─── Helper: Rounded Rectangle ───────────────────────────────────────────────

/**
 * Draws a rounded rectangle (filled, stroked, or both).
 * Uses PDF_CONFIG.borderRadius as the default corner radius.
 */
function drawRoundedRect(
  doc: jsPDF,
  x: number,
  y: number,
  width: number,
  height: number,
  options?: { fill?: RGB; stroke?: RGB; radius?: number }
): void {
  const radius = options?.radius ?? PDF_CONFIG.borderRadius;

  if (options?.fill) {
    setFillColor(doc, options.fill);
  }
  if (options?.stroke) {
    setDrawColor(doc, options.stroke);
  }

  const style = options?.fill && options?.stroke
    ? 'FD'
    : options?.fill
      ? 'F'
      : 'S';

  doc.roundedRect(x, y, width, height, radius, radius, style);
}

// ─── Helper: Section Header ──────────────────────────────────────────────────

/**
 * Renders a section header with lavender accent bar and heading text.
 * Returns the new Y position after the header.
 */
function drawSectionHeader(
  doc: jsPDF,
  title: string,
  yPos: number
): number {
  const { margins } = PDF_CONFIG;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margins.left - margins.right;

  // Lavender accent bar
  const barHeight = 4;
  setFillColor(doc, PDF_CONFIG.colors.lavender);
  doc.rect(margins.left, yPos, contentWidth, barHeight, 'F');

  yPos += barHeight + 10;

  // Heading text
  setFont(doc, 'heading');
  setTextColor(doc, PDF_CONFIG.colors.textDark);
  doc.text(title, margins.left, yPos);

  yPos += 12;

  return yPos;
}

// ─── Helper: Divider ─────────────────────────────────────────────────────────

/**
 * Draws a pink horizontal divider line.
 * Returns the new Y position after the divider.
 */
function drawDivider(doc: jsPDF, yPos: number): number {
  const { margins } = PDF_CONFIG;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margins.left - margins.right;

  setDrawColor(doc, PDF_CONFIG.colors.pink);
  doc.setLineWidth(0.5);
  doc.line(margins.left, yPos, margins.left + contentWidth, yPos);

  return yPos + 12;
}

// ─── Helper: Page Break Check ────────────────────────────────────────────────

/**
 * Checks if there's enough space remaining on the current page.
 * If not, adds a new page and returns the top margin Y position.
 */
function checkPageBreak(doc: jsPDF, yPos: number, requiredSpace: number): number {
  const pageHeight = doc.internal.pageSize.getHeight();
  const bottomMargin = PDF_CONFIG.margins.bottom;

  if (yPos + requiredSpace > pageHeight - bottomMargin) {
    doc.addPage();
    return PDF_CONFIG.margins.top;
  }

  return yPos;
}

// ─── Section Renderers (to be implemented in tasks 2.2–2.7) ──────────────────

function renderIntroduction(doc: jsPDF, input: MediaKitPdfInput, yPos: number): number {
  const { margins } = PDF_CONFIG;

  // Section header
  yPos = drawSectionHeader(doc, 'Introduction', yPos);

  // Creator name as main heading
  if (input.creatorName && input.creatorName.trim()) {
    yPos = checkPageBreak(doc, yPos, 24);
    setFont(doc, 'heading');
    setTextColor(doc, PDF_CONFIG.colors.textDark);
    doc.text(input.creatorName, margins.left, yPos);
    yPos += 22;
  }

  // Tagline (max 280 chars)
  if (input.tagline && input.tagline.trim()) {
    yPos = checkPageBreak(doc, yPos, 18);
    setFont(doc, 'body');
    setTextColor(doc, PDF_CONFIG.colors.textMuted);
    const tagline = input.tagline.length > 280
      ? input.tagline.slice(0, 280)
      : input.tagline;
    doc.text(tagline, margins.left, yPos, {
      maxWidth: doc.internal.pageSize.getWidth() - margins.left - margins.right,
    });
    // Estimate lines for y advancement
    const textWidth = doc.internal.pageSize.getWidth() - margins.left - margins.right;
    const lines = doc.splitTextToSize(tagline, textWidth);
    yPos += lines.length * 14 + 8;
  }

  // Platform follower counts
  if (input.platformStats && input.platformStats.length > 0) {
    yPos = checkPageBreak(doc, yPos, input.platformStats.length * 16 + 8);
    setFont(doc, 'body');
    setTextColor(doc, PDF_CONFIG.colors.textDark);

    for (const stat of input.platformStats) {
      if (stat.platform && stat.followers) {
        doc.text(`${stat.platform}: ${stat.followers}`, margins.left, yPos);
        yPos += 16;
      }
    }
    yPos += 4;
  }

  // Divider at end of section
  yPos = drawDivider(doc, yPos);

  return yPos;
}

function renderPlatformStats(doc: jsPDF, input: MediaKitPdfInput, yPos: number): number {
  if (input.platformStats.length === 0) {
    return yPos;
  }

  const { margins } = PDF_CONFIG;
  const pageWidth = doc.internal.pageSize.getWidth();
  const contentWidth = pageWidth - margins.left - margins.right;

  yPos = drawSectionHeader(doc, 'Platform Statistics', yPos);

  const cardColors: RGB[] = [
    PDF_CONFIG.colors.pink,
    PDF_CONFIG.colors.lavender,
    PDF_CONFIG.colors.mint,
  ];

  const cardHeight = 70;
  const cardPadding = 12;
  const cardSpacing = 10;

  for (let i = 0; i < input.platformStats.length; i++) {
    const stat = input.platformStats[i];
    const bgColor = cardColors[i % cardColors.length];

    // Check if we have enough space for a card
    yPos = checkPageBreak(doc, yPos, cardHeight + cardSpacing);

    // Draw card background
    drawRoundedRect(doc, margins.left, yPos, contentWidth, cardHeight, {
      fill: bgColor,
    });

    // Platform name (subheading)
    const textX = margins.left + cardPadding;
    let textY = yPos + cardPadding + 14; // offset for font baseline

    setFont(doc, 'subheading');
    setTextColor(doc, PDF_CONFIG.colors.textDark);
    doc.text(stat.platform, textX, textY);

    // Followers
    textY += 20;
    setFont(doc, 'body');
    setTextColor(doc, PDF_CONFIG.colors.textDark);
    doc.text(`Followers: ${stat.followers}`, textX, textY);

    // Average views
    textY += 16;
    doc.text(`Avg Views: ${stat.avgViews}`, textX, textY);

    yPos += cardHeight + cardSpacing;
  }

  yPos = drawDivider(doc, yPos);

  return yPos;
}

function renderAudienceDemographics(doc: jsPDF, input: MediaKitPdfInput, yPos: number): number {
  const { margins } = PDF_CONFIG;

  // If ALL four arrays are empty, return yPos unchanged
  const hasAge = input.ageBreakdown && input.ageBreakdown.length > 0;
  const hasGender = input.genderDistribution && input.genderDistribution.length > 0;
  const hasLocations = input.topLocations && input.topLocations.length > 0;
  const hasInterests = input.audienceInterests && input.audienceInterests.length > 0;

  if (!hasAge && !hasGender && !hasLocations && !hasInterests) {
    return yPos;
  }

  // Section header
  yPos = drawSectionHeader(doc, 'Audience Demographics', yPos);

  // Age Range subsection
  if (hasAge) {
    yPos = checkPageBreak(doc, yPos, input.ageBreakdown.length * 14 + 20);
    setFont(doc, 'subheading');
    setTextColor(doc, PDF_CONFIG.colors.textDark);
    doc.text('Age Range', margins.left, yPos);
    yPos += 16;

    setFont(doc, 'body');
    for (const entry of input.ageBreakdown) {
      doc.text(`${entry.range}: ${Math.round(entry.percentage)}%`, margins.left, yPos);
      yPos += 14;
    }
    yPos += 8;
  }

  // Gender Distribution subsection
  if (hasGender) {
    yPos = checkPageBreak(doc, yPos, input.genderDistribution.length * 14 + 20);
    setFont(doc, 'subheading');
    setTextColor(doc, PDF_CONFIG.colors.textDark);
    doc.text('Gender Distribution', margins.left, yPos);
    yPos += 16;

    setFont(doc, 'body');
    for (const entry of input.genderDistribution) {
      doc.text(`${entry.label}: ${Math.round(entry.percentage)}%`, margins.left, yPos);
      yPos += 14;
    }
    yPos += 8;
  }

  // Top Locations subsection
  if (hasLocations) {
    const locationEntries = input.topLocations.slice(0, PDF_CONFIG.maxLocations);
    yPos = checkPageBreak(doc, yPos, locationEntries.length * 14 + 20);
    setFont(doc, 'subheading');
    setTextColor(doc, PDF_CONFIG.colors.textDark);
    doc.text('Top Locations', margins.left, yPos);
    yPos += 16;

    setFont(doc, 'body');
    for (const entry of locationEntries) {
      doc.text(`${entry.country}: ${Math.round(entry.percentage)}%`, margins.left, yPos);
      yPos += 14;
    }
    yPos += 8;
  }

  // Audience Interests subsection
  if (hasInterests) {
    const interestEntries = input.audienceInterests.slice(0, PDF_CONFIG.maxInterests);
    yPos = checkPageBreak(doc, yPos, 20 + 14);
    setFont(doc, 'subheading');
    setTextColor(doc, PDF_CONFIG.colors.textDark);
    doc.text('Audience Interests', margins.left, yPos);
    yPos += 16;

    setFont(doc, 'body');
    const interestsText = interestEntries.join(', ');
    const textWidth = doc.internal.pageSize.getWidth() - margins.left - margins.right;
    const lines = doc.splitTextToSize(interestsText, textWidth);
    doc.text(lines, margins.left, yPos);
    yPos += lines.length * 14 + 8;
  }

  // Divider at end of section
  yPos = drawDivider(doc, yPos);

  return yPos;
}

function renderBrandCollaborations(doc: jsPDF, input: MediaKitPdfInput, yPos: number): number {
  // Omit entire section if brandCollaborations array is empty
  if (!input.brandCollaborations || input.brandCollaborations.length === 0) {
    return yPos;
  }

  const { margins } = PDF_CONFIG;

  // Section header
  yPos = drawSectionHeader(doc, "Brands I've Worked With", yPos);

  // Render each collaboration entry in source order
  for (const collab of input.brandCollaborations) {
    yPos = checkPageBreak(doc, yPos, 18);
    setFont(doc, 'body');
    setTextColor(doc, PDF_CONFIG.colors.textDark);
    doc.text(`${collab.logoPlaceholder}  ${collab.name} — ${collab.category}`, margins.left, yPos);
    yPos += 18;
  }

  // Divider at end of section
  yPos = drawDivider(doc, yPos);

  return yPos;
}

function renderContentExamples(doc: jsPDF, input: MediaKitPdfInput, yPos: number): number {
  if (input.contentExamples.length === 0) {
    return yPos;
  }

  const { margins } = PDF_CONFIG;

  yPos = drawSectionHeader(doc, 'Content Examples', yPos);

  const thumbnailWidth = 60;
  const thumbnailHeight = 40;
  const entryHeight = thumbnailHeight + 16; // thumbnail + spacing

  for (const example of input.contentExamples) {
    yPos = checkPageBreak(doc, yPos, entryHeight);

    // Determine fill color from thumbnailColor Tailwind class
    let fillColor: RGB;
    if (example.thumbnailColor.includes('lavender')) {
      fillColor = PDF_CONFIG.colors.lavender;
    } else if (example.thumbnailColor.includes('mint')) {
      fillColor = PDF_CONFIG.colors.mint;
    } else if (example.thumbnailColor.includes('pink')) {
      fillColor = PDF_CONFIG.colors.pink;
    } else {
      fillColor = PDF_CONFIG.colors.pink;
    }

    // Draw colored placeholder rectangle
    drawRoundedRect(doc, margins.left, yPos, thumbnailWidth, thumbnailHeight, {
      fill: fillColor,
    });

    // Truncate title if exceeds maxTitleLength
    const maxLen = PDF_CONFIG.maxTitleLength;
    const title = example.title.length > maxLen
      ? example.title.slice(0, maxLen) + '\u2026'
      : example.title;

    // Render text to the right of the thumbnail
    const textX = margins.left + thumbnailWidth + 10;
    let textY = yPos + 14;

    // Title
    setFont(doc, 'body');
    setTextColor(doc, PDF_CONFIG.colors.textDark);
    doc.text(title, textX, textY);

    // Platform name
    textY += 14;
    setTextColor(doc, PDF_CONFIG.colors.textMuted);
    doc.text(example.platform, textX, textY);

    // View count
    textY += 14;
    doc.text(example.views, textX, textY);

    yPos += entryHeight;
  }

  yPos = drawDivider(doc, yPos);

  return yPos;
}

function renderContact(doc: jsPDF, input: MediaKitPdfInput, yPos: number): number {
  const { margins } = PDF_CONFIG;

  // Section header
  yPos = drawSectionHeader(doc, 'Contact', yPos);

  // Email as clickable mailto hyperlink
  if (input.contactInfo.email && input.contactInfo.email.trim()) {
    yPos = checkPageBreak(doc, yPos, 16);
    setFont(doc, 'body');
    setTextColor(doc, PDF_CONFIG.colors.textDark);
    doc.textWithLink(input.contactInfo.email, margins.left, yPos, {
      url: `mailto:${input.contactInfo.email}`,
    });
    yPos += 16;
  }

  // Social links as clickable hyperlinks in source order
  if (input.contactInfo.socialLinks && input.contactInfo.socialLinks.length > 0) {
    for (const link of input.contactInfo.socialLinks) {
      yPos = checkPageBreak(doc, yPos, 16);
      setFont(doc, 'body');
      setTextColor(doc, PDF_CONFIG.colors.textDark);
      const displayText = `${link.platform}: ${link.label}`;
      doc.textWithLink(displayText, margins.left, yPos, {
        url: link.url,
      });
      yPos += 16;
    }
  }

  // No divider needed (last section)

  return yPos;
}

// ─── Main Generator Function ─────────────────────────────────────────────────

/**
 * Generates a branded PDF media kit from structured data.
 * Returns a Blob representing the PDF file.
 * Throws on failure (caller handles error display).
 */
export async function generateMediaKitPdf(input: MediaKitPdfInput): Promise<Blob> {
  const doc = new jsPDF({
    orientation: PDF_CONFIG.orientation,
    unit: 'pt',
    format: PDF_CONFIG.pageSize,
  });

  // Set default font
  setFont(doc, 'body');
  setTextColor(doc, PDF_CONFIG.colors.textDark);

  let yPos: number = PDF_CONFIG.margins.top;

  // Render sections in order
  yPos = renderIntroduction(doc, input, yPos);
  yPos = renderPlatformStats(doc, input, yPos);
  yPos = renderAudienceDemographics(doc, input, yPos);
  yPos = renderBrandCollaborations(doc, input, yPos);
  yPos = renderContentExamples(doc, input, yPos);
  yPos = renderContact(doc, input, yPos);

  // Generate and return as Blob
  return doc.output('blob');
}

// ─── Exported Helpers (for use by section renderers in tasks 2.2–2.7) ────────

export {
  setFont,
  setTextColor,
  setDrawColor,
  setFillColor,
  drawRoundedRect,
  drawSectionHeader,
  drawDivider,
  checkPageBreak,
};
