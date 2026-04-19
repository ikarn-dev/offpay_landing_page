/**
 * useScrollY — subscribes to the shared scroll performance utility and returns
 * the current scrollY value as React state.
 *
 * The subscription is torn down automatically on unmount via the useEffect
 * cleanup return — no memory leak.
 *
 * @example
 *   const scrollY = useScrollY();
 */

"use client";

import { useState, useEffect } from "react";
import { subscribeToScroll, getScrollY } from "@/utils/scroll";

export function useScrollY(): number {
  const [scrollY, setScrollY] = useState<number>(getScrollY);

  useEffect(() => {
    const unsubscribe = subscribeToScroll((y) => {
      setScrollY(y);
    });

    return unsubscribe;
  }, []);

  return scrollY;
}
