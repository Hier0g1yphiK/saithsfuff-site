"use client";

import { useEffect } from "react";

interface ErrorToastProps {
  message: string;
  onDismiss: () => void;
  autoHideMs?: number;
}

export default function ErrorToast({
  message,
  onDismiss,
  autoHideMs = 10000,
}: ErrorToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onDismiss();
    }, autoHideMs);

    return () => clearTimeout(timer);
  }, [onDismiss, autoHideMs]);

  return (
    <div
      role="alert"
      aria-live="assertive"
      className="fixed bottom-4 right-4 z-50 max-w-sm rounded-xl border-2 border-pink-400 bg-white p-4 shadow-lg dark:border-pink-500 dark:bg-gray-800 dark:text-white"
    >
      <div className="flex items-start gap-3">
        <p className="flex-1 font-body text-sm text-gray-800 dark:text-white">
          {message}
        </p>
        <button
          type="button"
          onClick={onDismiss}
          aria-label="Dismiss error"
          className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-gray-500 transition hover:bg-gray-100 hover:text-gray-700 dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white"
        >
          ×
        </button>
      </div>
    </div>
  );
}
