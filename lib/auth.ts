export const AUTH_STORAGE_KEY = "saithsfuff_access_token";
export const REDIRECT_STORAGE_KEY = "saithsfuff_redirect_path";

/**
 * Returns true if sessionStorage contains the access token.
 */
export function isAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(AUTH_STORAGE_KEY) === "authenticated";
  } catch {
    return false;
  }
}

/**
 * Writes the access token to sessionStorage.
 */
export function setAuthenticated(): void {
  try {
    sessionStorage.setItem(AUTH_STORAGE_KEY, "authenticated");
  } catch {
    // Storage unavailable — silently fail
  }
}

/**
 * Returns the stored redirect path, defaults to "/".
 */
export function getRedirectPath(): string {
  try {
    return sessionStorage.getItem(REDIRECT_STORAGE_KEY) || "/";
  } catch {
    return "/";
  }
}

/**
 * Stores the originally requested path.
 */
export function setRedirectPath(path: string): void {
  try {
    sessionStorage.setItem(REDIRECT_STORAGE_KEY, path);
  } catch {
    // Storage unavailable — silently fail
  }
}

/**
 * Removes the redirect path from storage.
 */
export function clearRedirectPath(): void {
  try {
    sessionStorage.removeItem(REDIRECT_STORAGE_KEY);
  } catch {
    // Storage unavailable — silently fail
  }
}

/**
 * Trims input and compares case-sensitively to the trimmed
 * NEXT_PUBLIC_SITE_PASSWORD environment variable.
 * Returns false if the env var is unset or empty.
 */
export function validatePassword(input: string): boolean {
  const envPassword = process.env.NEXT_PUBLIC_SITE_PASSWORD;

  if (!envPassword || envPassword.trim() === "") {
    return false;
  }

  return input.trim() === envPassword.trim();
}
