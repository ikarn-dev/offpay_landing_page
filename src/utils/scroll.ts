/**
 * Scroll performance utility.
 *
 * Design goals:
 *   • One passive scroll listener on the window — never one per component.
 *   • All subscriber callbacks are deferred to rAF so DOM reads/writes are
 *     batched and never trigger mid-frame layout thrash.
 *   • Subscribers receive the current scrollY and a direction hint so they
 *     can avoid computing it themselves.
 *   • Zero memory leaks: unsubscribe() tears down the window listener as
 *     soon as the last subscriber is removed.
 *
 * Usage in a component:
 *   useEffect(() => {
 *     const unsub = subscribeToScroll((y, dir) => { ... });
 *     return unsub; // React calls this on unmount — listener is removed
 *   }, []);
 */

import { SCROLL_DIRECTION_THRESHOLD } from "@/constants";
import type { ScrollSubscriber, ScrollDirection } from "@/types";

// ---------------------------------------------------------------------------
// Internal state (module singleton — safe because this runs client-side only)
// ---------------------------------------------------------------------------

const subscribers = new Set<ScrollSubscriber>();

let rafId: number | null = null;
let lastScrollY = 0;
let direction: ScrollDirection = "idle";
let listenerAttached = false;

// ---------------------------------------------------------------------------
// rAF-batched flush
// ---------------------------------------------------------------------------

function flush(): void {
  rafId = null;

  const currentScrollY = window.scrollY;
  const delta = currentScrollY - lastScrollY;

  // Skip micro-scrolls — avoids calling subscribers on sub-threshold movements
  if (Math.abs(delta) < SCROLL_DIRECTION_THRESHOLD) {
    return;
  }

  direction = delta > 0 ? "down" : "up";
  lastScrollY = currentScrollY;

  subscribers.forEach((cb) => cb(currentScrollY, direction));
}

// ---------------------------------------------------------------------------
// The single window listener
// ---------------------------------------------------------------------------

function onScroll(): void {
  if (rafId !== null) return; // already queued
  rafId = requestAnimationFrame(flush);
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

/**
 * Register a callback that is invoked on every rAF-batched scroll tick.
 * Returns an `unsubscribe` function — pass it directly as the useEffect
 * cleanup return value.
 */
export function subscribeToScroll(cb: ScrollSubscriber): () => void {
  if (typeof window === "undefined") {
    // SSR guard — return a no-op unsubscribe
    return () => undefined;
  }

  subscribers.add(cb);

  if (!listenerAttached) {
    lastScrollY = window.scrollY;
    window.addEventListener("scroll", onScroll, { passive: true });
    listenerAttached = true;
  }

  return () => {
    subscribers.delete(cb);

    if (subscribers.size === 0) {
      window.removeEventListener("scroll", onScroll);
      listenerAttached = false;

      if (rafId !== null) {
        cancelAnimationFrame(rafId);
        rafId = null;
      }
    }
  };
}

/**
 * Read the last known scrollY without subscribing.
 * Useful for one-shot checks (e.g. on mount).
 */
export function getScrollY(): number {
  return typeof window !== "undefined" ? window.scrollY : 0;
}

/**
 * Read the last computed scroll direction without subscribing.
 */
export function getScrollDirection(): ScrollDirection {
  return direction;
}
