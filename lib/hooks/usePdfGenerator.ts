'use client';

import { useState, useCallback } from 'react';
import {
  platformStats,
  ageBreakdown,
  genderDistribution,
  topLocations,
  audienceInterests,
  brandCollaborations,
  contentExamples,
  contactInfo,
} from '@/lib/media-kit-data';
import type { MediaKitPdfInput } from '@/lib/pdf-config';

type PdfGeneratorState = 'idle' | 'generating' | 'error';

export interface UsePdfGeneratorReturn {
  generate: () => Promise<void>;
  state: PdfGeneratorState;
  errorMessage: string | null;
  dismissError: () => void;
}

/**
 * Custom hook that manages the PDF generation lifecycle.
 * Handles dynamic import of the PDF generator, download trigger,
 * error states, and double-click protection.
 */
export function usePdfGenerator(): UsePdfGeneratorReturn {
  const [state, setState] = useState<PdfGeneratorState>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const dismissError = useCallback(() => {
    setErrorMessage(null);
    setState('idle');
  }, []);

  const generate = useCallback(async () => {
    // Guard against double-click
    if (state === 'generating') {
      return;
    }

    setState('generating');
    setErrorMessage(null);

    // Check browser compatibility
    if (typeof Blob === 'undefined' || typeof ArrayBuffer === 'undefined') {
      setErrorMessage('PDF download is not supported in your current browser.');
      setState('error');
      return;
    }

    let blob: Blob;

    // Dynamically import PDF generator
    let generateMediaKitPdf: (input: MediaKitPdfInput) => Promise<Blob>;
    try {
      const module = await import('@/lib/pdf-generator');
      generateMediaKitPdf = module.generateMediaKitPdf;
    } catch {
      setErrorMessage('Unable to load PDF generator. Please check your connection and try again.');
      setState('error');
      setTimeout(() => setState('idle'), 1000);
      return;
    }

    // Assemble input data
    const input: MediaKitPdfInput = {
      creatorName: 'saithsfuff',
      tagline: 'Content creator, gamer, and all-around creative soul ✨',
      platformStats,
      ageBreakdown,
      genderDistribution,
      topLocations,
      audienceInterests,
      brandCollaborations,
      contentExamples,
      contactInfo,
    };

    // Generate PDF
    try {
      blob = await generateMediaKitPdf(input);
    } catch {
      setErrorMessage('Failed to generate PDF. Please try again.');
      setState('error');
      setTimeout(() => setState('idle'), 1000);
      return;
    }

    // Trigger download
    let objectUrl: string | undefined;
    try {
      objectUrl = URL.createObjectURL(blob);
      const anchor = document.createElement('a');
      anchor.href = objectUrl;
      anchor.download = 'saithsfuff-media-kit.pdf';
      document.body.appendChild(anchor);
      anchor.click();
      document.body.removeChild(anchor);
    } catch {
      setErrorMessage('Download could not be initiated. Please try again.');
      setState('error');
      setTimeout(() => setState('idle'), 1000);
      return;
    }

    // Success: revoke URL and return to idle within 1 second
    setTimeout(() => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
      setState('idle');
    }, 1000);
  }, [state]);

  return { generate, state, errorMessage, dismissError };
}
