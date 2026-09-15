/**
 * Cookie notice state.
 *
 * This site runs NO optional technologies, so there is nothing to consent to
 * and nothing to gate. The only cookie is hCaptcha's strictly-necessary
 * security cookie on /contact. All we store ourselves is a flag recording that
 * the visitor has seen the notice.
 *
 * Deliberately localStorage, not a cookie. The inventory published on /cookies
 * lives in STORAGE_REGISTRY (src/lib/legal-content.ts) — keep it in sync.
 *
 * Exposed as an external store so components can read it with
 * useSyncExternalStore rather than syncing it into state from an effect.
 *
 * FUTURE: this file is the seam. If analytics or any other optional technology
 * is ever added, replace the boolean below with a versioned, categorised record
 * and gate the script on it. Do not add category toggles to the notice before
 * there is a real script for them to block — a control that blocks nothing is
 * the "decorative cookie banner" the project brief explicitly forbids.
 */

export const NOTICE_KEY = "kozy_cookie_notice";

/** Bump to re-show the notice to everyone after a material change. */
export const NOTICE_VERSION = "2";

const listeners = new Set<() => void>();

function notify() {
  for (const listener of listeners) listener();
}

export function subscribe(listener: () => void): () => void {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

/** Client snapshot: has this visitor dismissed the notice? */
export function getSnapshot(): boolean {
  try {
    return window.localStorage.getItem(NOTICE_KEY) === NOTICE_VERSION;
  } catch {
    // Private mode or storage blocked. Treat as not acknowledged; the notice is
    // still dismissible, it just will not be remembered.
    return false;
  }
}

/**
 * Server snapshot: assume acknowledged, so nothing renders during SSR or on the
 * first client render. The notice then appears once hydration reads real state.
 */
export function getServerSnapshot(): boolean {
  return true;
}

export function acknowledge(): void {
  try {
    window.localStorage.setItem(NOTICE_KEY, NOTICE_VERSION);
  } catch {
    // Storage unavailable — nothing to persist.
  }
  notify();
}

/** Clears the dismissal, which brings the notice back. */
export function reset(): void {
  try {
    window.localStorage.removeItem(NOTICE_KEY);
  } catch {
    // Storage unavailable — nothing to clear.
  }
  notify();
}
