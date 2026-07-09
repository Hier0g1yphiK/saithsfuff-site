"use client";

import { usePdfGenerator } from "@/lib/hooks/usePdfGenerator";
import ErrorToast from "@/components/media-kit/ErrorToast";

interface DownloadButtonProps {
  className?: string;
}

export default function DownloadMediaKitButton({
  className,
}: DownloadButtonProps) {
  const { generate, state, errorMessage, dismissError } = usePdfGenerator();

  return (
    <>
      <button
        type="button"
        onClick={generate}
        disabled={state === "generating"}
        aria-label="Download Media Kit"
        className={`min-h-[44px] min-w-[44px] rounded-full bg-gradient-to-r from-pink-400 to-lavender-400 px-6 py-3 text-white font-display text-sm font-semibold shadow-whimsical hover:shadow-glow hover:scale-105 transition disabled:opacity-60 disabled:cursor-not-allowed dark:from-lavender-500 dark:to-pink-500 ${className ?? ""}`}
      >
        <span className="inline-flex items-center gap-2">
          {state === "generating" ? (
            <svg
              className="h-4 w-4 animate-spin"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
              />
            </svg>
          ) : (
            <svg
              className="h-4 w-4"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v12m0 0l-4-4m4 4l4-4M4 18h16"
              />
            </svg>
          )}
          Download Media Kit
        </span>
      </button>

      {state === "error" && errorMessage && (
        <ErrorToast message={errorMessage} onDismiss={dismissError} />
      )}
    </>
  );
}
