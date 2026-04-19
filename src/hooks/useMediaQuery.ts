/**
 * useMediaQuery — returns true if the media query currently matches.
 * Tears down the listener on unmount — no memory leak.
 *
 * SSR-safe: returns `false` during server render.
 *
 * @example
 *   const isMobile = useMediaQuery("(max-width: 767px)");
 */

"use client";

import { useState, useEffect } from "react";

export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const mql = window.matchMedia(query);
    setMatches(mql.matches);

    const handler = (e: MediaQueryListEvent) => setMatches(e.matches);
    mql.addEventListener("change", handler);

    return () => {
      mql.removeEventListener("change", handler);
    };
  }, [query]);

  return matches;
}
