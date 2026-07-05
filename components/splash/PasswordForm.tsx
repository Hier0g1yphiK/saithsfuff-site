"use client";

import { useState, useRef, type FormEvent } from "react";
import { validatePassword } from "@/lib/auth";

interface PasswordFormProps {
  onSuccess: () => void;
}

export default function PasswordForm({ onSuccess }: PasswordFormProps) {
  const [error, setError] = useState<string>("");
  const inputRef = useRef<HTMLInputElement>(null);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const value = inputRef.current?.value ?? "";
    const trimmed = value.trim();

    if (trimmed === "") {
      setError("Password is required");
      return;
    }

    if (validatePassword(trimmed)) {
      setError("");
      onSuccess();
    } else {
      setError("Incorrect password");
      if (inputRef.current) {
        inputRef.current.value = "";
      }
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex w-full max-w-sm flex-col gap-3">
      <label
        htmlFor="splash-password"
        className="font-body text-sm font-semibold text-text-body dark:text-lavender-200"
      >
        Enter password
      </label>

      <div className="flex gap-2">
        <input
          ref={inputRef}
          id="splash-password"
          type="password"
          maxLength={128}
          autoComplete="off"
          placeholder="••••••••"
          className="flex-1 rounded-card border border-pink-200 bg-white px-4 py-2 font-body text-sm text-text-body placeholder:text-text-muted/50 focus:outline focus:outline-2 focus:outline-pink-400 dark:border-lavender-700 dark:bg-lavender-900/40 dark:text-lavender-100 dark:placeholder:text-lavender-400/50 dark:focus:outline-lavender-400"
        />

        <button
          type="submit"
          className="rounded-card bg-pink-400 px-5 py-2 font-body text-sm font-semibold text-white transition-colors hover:bg-pink-500 focus:outline focus:outline-2 focus:outline-pink-400 focus:outline-offset-2 dark:bg-lavender-500 dark:hover:bg-lavender-400 dark:focus:outline-lavender-400"
        >
          Enter
        </button>
      </div>

      <div aria-live="assertive" className="min-h-[1.25rem]">
        {error && (
          <p className="font-body text-sm text-pink-700 dark:text-pink-300">
            {error}
          </p>
        )}
      </div>
    </form>
  );
}
