/**
 * useScrollDirection — subscribes to the shared scroll utility and returns the
 * current scroll direction ("up" | "down" | "idle").
 *
 * Typical use: hide/show a sticky Navbar on scroll direction change.
 *
 * @example
 *   const dir = useScrollDirection();
 *   const hidden = dir === "down";
 */

"use client";

import { useState, useEffect } from "react";
import { subscribeToScroll, getScrollDirection } from "@/utils/scroll";
import type { ScrollDirection } from "@/types";

export function useScrollDirection(): ScrollDirection {
  const [direction, setDirection] = useState<ScrollDirection>(getScrollDirection);

  useEffect(() => {
    const unsubscribe = subscribeToScroll((_y, dir) => {
      // Only re-render when direction actually changes
      setDirection((prev) => (prev === dir ? prev : dir));
    });

    return unsubscribe;
  }, []);

  return direction;
}
