/**
 * Animation utility — the single gateway to GSAP across the entire codebase.
 *
 * Rules enforced by this module:
 *   1. No component ever imports GSAP directly.
 *   2. All animations target `transform` / `opacity` only (compositor thread).
 *   3. Every returned Tween / Timeline must be cleaned up by the caller
 *      (call .kill() inside the useEffect cleanup or React.useRef teardown).
 *   4. Avoid animating layout properties (width, height, top, left, padding, …).
 *
 * Usage pattern in a component:
 *   const tl = useRef<gsap.core.Timeline | null>(null);
 *   useEffect(() => {
 *     tl.current = animateFadeIn(ref.current, { delay: 0.2 });
 *     return () => { tl.current?.kill(); };
 *   }, []);
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ANIM_DEFAULTS } from "@/constants";
import type { FadeInOptions, StaggerContainerOptions } from "@/types";

// ---------------------------------------------------------------------------
// Plugin registration — run once at module level (safe for SSR: ScrollTrigger
// checks for window internally and no-ops during the server render pass).
// ---------------------------------------------------------------------------

gsap.registerPlugin(ScrollTrigger);

// ---------------------------------------------------------------------------
// Re-export the gsap core and ScrollTrigger so callers can use type helpers
// (e.g. gsap.core.Timeline) without importing gsap themselves.
// ---------------------------------------------------------------------------

export type { gsap };
export { ScrollTrigger };

// ---------------------------------------------------------------------------
// Primitive helpers
// ---------------------------------------------------------------------------

/**
 * Fade an element in from below.
 * Returns the tween so the caller can `.kill()` it on unmount.
 */
export function animateFadeIn(
  target: gsap.TweenTarget,
  options: FadeInOptions = {}
): gsap.core.Tween {
  const { delay = 0, duration = ANIM_DEFAULTS.duration, y = ANIM_DEFAULTS.yOffset, ease = ANIM_DEFAULTS.ease } = options;

  return gsap.fromTo(
    target,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, delay, ease }
  );
}

/**
 * Stagger-fade a list of children into view.
 * Returns a Timeline so the caller can `.kill()` it on unmount.
 */
export function animateStaggerIn(
  targets: gsap.TweenTarget,
  options: StaggerContainerOptions = {}
): gsap.core.Timeline {
  const {
    stagger = ANIM_DEFAULTS.stagger,
    delay = 0,
    y = ANIM_DEFAULTS.yOffset,
    duration = ANIM_DEFAULTS.duration,
    ease = ANIM_DEFAULTS.ease,
  } = options;

  const tl = gsap.timeline({ delay });
  tl.fromTo(
    targets,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, ease, stagger }
  );
  return tl;
}

/**
 * Fade an element in when it enters the viewport (ScrollTrigger).
 * Returns the tween. The ScrollTrigger instance is automatically linked to the
 * tween — killing the tween also kills its ScrollTrigger.
 */
export function animateScrollFadeIn(
  target: gsap.TweenTarget,
  options: FadeInOptions & { triggerElement?: Element | null } = {}
): gsap.core.Tween {
  const {
    delay = 0,
    duration = ANIM_DEFAULTS.duration,
    y = ANIM_DEFAULTS.yOffset,
    ease = ANIM_DEFAULTS.ease,
    triggerElement,
  } = options;

  // Resolve the trigger element; fall back to the animation target itself.
  // We must not pass `undefined` to ScrollTrigger.trigger when
  // exactOptionalPropertyTypes is enabled, so we conditionally build the config.
  const resolvedTrigger: Element | null =
    triggerElement !== undefined ? triggerElement : (target as Element | null);

  const scrollTriggerConfig = resolvedTrigger
    ? {
      trigger: resolvedTrigger,
      start: "top 85%" as const,
      toggleActions: "play none none none" as const,
    }
    : {
      start: "top 85%" as const,
      toggleActions: "play none none none" as const,
    };

  return gsap.fromTo(
    target,
    { opacity: 0, y },
    {
      opacity: 1,
      y: 0,
      duration,
      delay,
      ease,
      scrollTrigger: scrollTriggerConfig,
    }
  );
}

/**
 * Slide an element in from the right when it enters the viewport.
 * Animates only compositor-friendly transform / opacity properties.
 */
export function animateScrollSlideIn(
  target: gsap.TweenTarget,
  options: FadeInOptions & {
    triggerElement?: Element | null;
    start?: string;
    xPercent?: number;
    once?: boolean;
  } = {}
): gsap.core.Tween {
  const {
    delay = 0,
    duration = 0.4,
    xPercent = 12,
    ease = "power2.out",
    triggerElement,
    start = "top 78%",
    once = true,
  } = options;

  const scrollTriggerConfig = triggerElement
    ? {
      trigger: triggerElement,
      start,
      once,
    }
    : {
      start,
      once,
    };

  return gsap.fromTo(
    target,
    { autoAlpha: 0, xPercent },
    {
      autoAlpha: 1,
      xPercent: 0,
      duration,
      delay,
      ease,
      scrollTrigger: scrollTriggerConfig,
    }
  );
}

export function animateHorizontalSectionSwap({
  triggerElement,
  previous,
  next,
  previousTitle,
  nextTitle,
  start = "top top",
  end = "bottom bottom",
  scrub = 0.6,
  transitionStart = 0.3,
  transitionDuration = 0.45,
}: {
  triggerElement: Element;
  previous: gsap.TweenTarget;
  next: gsap.TweenTarget;
  previousTitle?: gsap.TweenTarget;
  nextTitle?: gsap.TweenTarget;
  start?: string;
  end?: string;
  scrub?: number;
  transitionStart?: number;
  transitionDuration?: number;
}): () => void {
  const media = gsap.matchMedia();

  media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
    const progress = { value: 0 };
    gsap.set(previous, { autoAlpha: 1, xPercent: 0 });
    gsap.set(next, { autoAlpha: 0, xPercent: 108 });
    if (previousTitle && nextTitle) {
      gsap.set(previousTitle, { autoAlpha: 1, yPercent: 0 });
      gsap.set(nextTitle, { autoAlpha: 0, yPercent: 12 });
    }

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,
      },
    });

    timeline.to(progress, { value: 1, duration: 1, ease: "none" }, 0);
    timeline
      .to(
        previous,
        {
          autoAlpha: 0,
          xPercent: -108,
          duration: transitionDuration,
          ease: "none",
        },
        transitionStart
      )
      .to(
        next,
        {
          autoAlpha: 1,
          xPercent: 0,
          duration: transitionDuration,
          ease: "none",
        },
        transitionStart
      );

    if (previousTitle && nextTitle) {
      timeline
        .to(
          previousTitle,
          {
            autoAlpha: 0,
            yPercent: -12,
            duration: transitionDuration * 0.38,
            ease: "none",
          },
          transitionStart + transitionDuration * 0.18
        )
        .to(
          nextTitle,
          {
            autoAlpha: 1,
            yPercent: 0,
            duration: transitionDuration * 0.38,
            ease: "none",
          },
          transitionStart + transitionDuration * 0.48
        );
    }

    return () => {
      timeline.kill();
    };
  });

  media.add("(max-width: 900px), (prefers-reduced-motion: reduce)", () => {
    const targets: gsap.TweenTarget[] = [previous, next];
    if (previousTitle) targets.push(previousTitle);
    if (nextTitle) targets.push(nextTitle);

    gsap.set(targets, { clearProps: "all" });

    return () => {
      gsap.set(targets, { clearProps: "all" });
    };
  });

  return () => media.revert();
}

export function animateHorizontalTrackSwap({
  triggerElement,
  track,
  previousTitle,
  nextTitle,
  start = "top top",
  end = "bottom bottom",
  scrub = 0.6,
  transitionStart = 0.36,
  transitionDuration = 0.34,
}: {
  triggerElement: Element;
  track: gsap.TweenTarget;
  previousTitle: gsap.TweenTarget;
  nextTitle: gsap.TweenTarget;
  start?: string;
  end?: string;
  scrub?: number;
  transitionStart?: number;
  transitionDuration?: number;
}): () => void {
  const media = gsap.matchMedia();

  media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
    const progress = { value: 0 };
    const titleStart = transitionStart + transitionDuration * 0.48;
    const titleDuration = transitionDuration * 0.24;

    gsap.set(track, { xPercent: 0 });
    gsap.set(previousTitle, { autoAlpha: 1, yPercent: 0 });
    gsap.set(nextTitle, { autoAlpha: 0, yPercent: 12 });

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,
      },
    });

    timeline
      .to(progress, { value: 1, duration: 1, ease: "none" }, 0)
      .to(
        track,
        {
          xPercent: -50,
          duration: transitionDuration,
          ease: "none",
        },
        transitionStart
      )
      .to(
        previousTitle,
        {
          autoAlpha: 0,
          yPercent: -12,
          duration: titleDuration,
          ease: "none",
        },
        titleStart
      )
      .to(
        nextTitle,
        {
          autoAlpha: 1,
          yPercent: 0,
          duration: titleDuration,
          ease: "none",
        },
        titleStart + titleDuration
      );

    return () => {
      timeline.kill();
    };
  });

  media.add("(max-width: 900px), (prefers-reduced-motion: reduce)", () => {
    gsap.set([track, previousTitle, nextTitle], { clearProps: "all" });

    return () => {
      gsap.set([track, previousTitle, nextTitle], { clearProps: "all" });
    };
  });

  return () => media.revert();
}

/**
 * Generic N-slide horizontal track swap — scroll-driven.
 * Evenly divides the scroll distance into (N-1) transitions.
 * Track translates: 0% → -(100/N)% → -(200/N)% → … → -((N-1)*100/N)%
 */
export function animateHorizontalTrackSwapN({
  triggerElement,
  track,
  titles,
  start = "top top",
  end = "bottom bottom",
  scrub = 0.6,
  onSlideChange,
}: {
  triggerElement: Element;
  track: gsap.TweenTarget;
  titles: gsap.TweenTarget[];
  start?: string;
  end?: string;
  scrub?: number;
  onSlideChange?: (index: number) => void;
}): () => void {
  const media = gsap.matchMedia();
  const slideCount = titles.length;
  const transitionCount = slideCount - 1;

  media.add("(min-width: 901px) and (prefers-reduced-motion: no-preference)", () => {
    const progress = { value: 0 };

    // Each transition gets an equal share of scroll, with breathing room at edges
    const edgePad = 0.12;
    const usable = 1 - edgePad * 2;
    const slideDuration = usable / (transitionCount + 0.5);
    const titleDuration = slideDuration * 0.28;
    const stepPercent = 100 / slideCount;

    gsap.set(track, { xPercent: 0 });
    titles.forEach((title, i) => {
      gsap.set(title, { autoAlpha: i === 0 ? 1 : 0, yPercent: i === 0 ? 0 : 12 });
    });

    let currentSlide = 0;

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: triggerElement,
        start,
        end,
        scrub,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          if (!onSlideChange) return;
          const p = self.progress;
          // Calculate which slide is active based on scroll progress
          let newSlide = 0;
          for (let i = 0; i < transitionCount; i++) {
            const midpoint = edgePad + (i + 0.5) * slideDuration + i * (slideDuration * 0.15);
            if (p > midpoint) newSlide = i + 1;
          }
          if (newSlide !== currentSlide) {
            currentSlide = newSlide;
            onSlideChange(newSlide);
          }
        },
      },
    });

    timeline.to(progress, { value: 1, duration: 1, ease: "none" }, 0);

    for (let i = 0; i < transitionCount; i++) {
      const tStart = edgePad + i * slideDuration + i * (slideDuration * 0.15);
      const tTitleOut = tStart + slideDuration * 0.48;
      const tTitleIn = tTitleOut + titleDuration;
      const targetX = -(i + 1) * stepPercent;

      timeline
        .to(track, { xPercent: targetX, duration: slideDuration, ease: "none" }, tStart)
        .to(titles[i], { autoAlpha: 0, yPercent: -12, duration: titleDuration, ease: "none" }, tTitleOut)
        .to(titles[i + 1], { autoAlpha: 1, yPercent: 0, duration: titleDuration, ease: "none" }, tTitleIn);
    }

    return () => {
      timeline.kill();
    };
  });

  media.add("(max-width: 900px), (prefers-reduced-motion: reduce)", () => {
    gsap.set([track, ...titles], { clearProps: "all" });

    return () => {
      gsap.set([track, ...titles], { clearProps: "all" });
    };
  });

  return () => media.revert();
}

/**
 * Stagger-fade children as the container scrolls into view.
 * Returns a Timeline linked to a ScrollTrigger.
 */
export function animateScrollStaggerIn(
  targets: gsap.TweenTarget,
  options: StaggerContainerOptions & { triggerElement?: Element | null } = {}
): gsap.core.Timeline {
  const {
    stagger = ANIM_DEFAULTS.stagger,
    delay = 0,
    y = ANIM_DEFAULTS.yOffset,
    duration = ANIM_DEFAULTS.duration,
    ease = ANIM_DEFAULTS.ease,
    triggerElement,
  } = options;

  // Conditionally include `trigger` to satisfy exactOptionalPropertyTypes.
  const scrollTriggerConfig = triggerElement
    ? {
      trigger: triggerElement,
      start: "top 85%" as const,
      toggleActions: "play none none none" as const,
    }
    : {
      start: "top 85%" as const,
      toggleActions: "play none none none" as const,
    };

  const tl = gsap.timeline({
    delay,
    scrollTrigger: scrollTriggerConfig,
  });

  tl.fromTo(
    targets,
    { opacity: 0, y },
    { opacity: 1, y: 0, duration, ease, stagger }
  );

  return tl;
}

/**
 * Immediately set an element to its visible resting state (no animation).
 * Useful for elements that should be visible without waiting for a trigger.
 */
export function setVisible(target: gsap.TweenTarget): void {
  gsap.set(target, { autoAlpha: 1, opacity: 1, xPercent: 0, y: 0 });
}

export function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;

  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

/**
 * Kill a ScrollTrigger instance by its id, if it exists.
 * Use during cleanup when you stored the trigger id rather than a tween ref.
 */
export function killScrollTrigger(id: string): void {
  const st = ScrollTrigger.getById(id);
  st?.kill();
}

/**
 * Refresh all ScrollTrigger instances. Call after a layout change that
 * affects scroll heights (e.g. accordion open/close, image lazy-load).
 *
 * Internally batches into a rAF to avoid layout thrash.
 */
export function refreshScrollTriggers(): void {
  requestAnimationFrame(() => {
    ScrollTrigger.refresh();
  });
}
