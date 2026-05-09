/**
 * useGsapRef — convenience hook that wires a ref to a GSAP animation and
 * guarantees cleanup on unmount.
 *
 * Pass a `setup` factory that receives the element and returns a Tween or
 * Timeline. The hook stores the instance in a ref and kills it when the
 * component unmounts.
 *
 * The `setup` function is intentionally excluded from the dependency array
 * (it must be stable / defined outside the component or wrapped in useCallback)
 * to match GSAP's one-shot initialization pattern.
 *
 * @example
 *   const ref = useGsapRef<HTMLDivElement>((el) =>
 *     animateFadeIn(el, { delay: 0.2 })
 *   );
 *   return <div ref={ref}>…</div>;
 */

"use client";

import { useRef, useEffect } from "react";
import type { RefObject } from "react";

type GsapInstance = gsap.core.Tween | gsap.core.Timeline;
type SetupFn<T extends Element> = (el: T) => GsapInstance;

export function useGsapRef<T extends Element>(
  setup: SetupFn<T>
): RefObject<T | null> {
  const elRef = useRef<T | null>(null);
  const instanceRef = useRef<GsapInstance | null>(null);
  const setupRef = useRef(setup);

  useEffect(() => {
    const el = elRef.current;
    if (!el) return;

    instanceRef.current = setupRef.current(el);

    return () => {
      instanceRef.current?.kill();
      instanceRef.current = null;
    };
  }, []);

  return elRef;
}
