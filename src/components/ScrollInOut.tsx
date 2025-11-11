import React, { useRef, useEffect, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// ========================================================================================
// SCROLL IN/OUT COMPONENT
// ========================================================================================

interface ScrollInOutProps {
  children: React.ReactNode;
  direction?: 'left' | 'right' | 'fade' | 'scale'; // TODO: P75 - add fade in from bottom & fade out from top
  animateLeftToRight?: boolean; // If true, animates children 1→2→3; if false, animates children 3→2→1 (for staggered animations)
  duration?: number;
  delay?: number;
  ease?: string;
  triggerStart?: string; // e.g. "top 100%" => trigger is on bottom of vh minus footer
  triggerEnd?: string; // e.g. "bottom 0%" => trigger is on top of vh
  animateOut?: boolean;
  stagger?: number;
  className?: string;
  style?: React.CSSProperties;
  debugMode?: boolean;
}

// Animation state configurations
const ANIMATION_STATES = {
  initial: {
    left: { x: '-100vw', opacity: 0 },
    right: { x: '100vw', opacity: 0 },
    scale: { scale: 0, opacity: 0 },
    fade: { opacity: 0 },
    default: { opacity: 0 },
  },
  final: {
    left: { x: 0, opacity: 1 },
    right: { x: 0, opacity: 1 },
    scale: { scale: 1, opacity: 1 },
    fade: { opacity: 1 },
    default: { opacity: 1 },
  },
};

// Timeline phase durations (totaling 1.0)
const TIMELINE_PHASES = {
  FADE_IN: 0.1, // 10% - Animation in (reduced for faster stagger)
  VISIBLE: 0.8, // 80% - Fully visible
  FADE_OUT: 0.1, // 10% - Animation out
};

/**
 * ScrollInOut component - wraps content and animates it on scroll
 *
 * Creates smooth scroll-linked animations that fade in during the first 15% of scroll,
 * stay visible for 75%, and fade out during the last 10%.
 *
 * @example
 * <ScrollInOut direction="right">
 *   This slides in from the right and can be any React Node
 * </ScrollInOut>
 *
 * @example
 * <ScrollInOut direction="fade" stagger={0.2} animateLeftToRight={false}>
 *   <div>Item 1 (will animate last)</div>
 *   <div>Item 2 (will animate second)</div>
 *   <div>Item 3 (will animate first)</div>
 *   ...
 * </ScrollInOut>
 */
const ScrollInOut: React.FC<ScrollInOutProps> = ({
  children,
  direction = 'fade',
  animateLeftToRight = true,
  duration = 1.5,
  delay = 0.3,
  ease = 'power2.out',
  triggerStart = 'top 100%',
  triggerEnd = 'bottom 10%',
  animateOut = true,
  stagger = 0,
  className = '',
  style = {},
  debugMode = false,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<ScrollTrigger | null>(null);

  /**
   * Get animation state based on direction
   */
  const getAnimationState = useCallback(
    (phase: 'initial' | 'final') => {
      return (
        ANIMATION_STATES[phase][
          direction as keyof typeof ANIMATION_STATES.initial
        ] || ANIMATION_STATES[phase].default
      );
    },
    [direction]
  );

  /**
   * Find the appropriate scroll container for this element
   */
  const findScrollContainer = (element: HTMLElement) => {
    return (
      element.closest('.scroll-box') ||
      element.closest('[style*="overflow"]') ||
      window
    );
  };

  /**
   * Create a three-phase timeline: fade in -> visible -> fade out
   */
  const createTimeline = useCallback(
    (elements: Element[] | HTMLElement[]) => {
      const timeline = gsap.timeline({ paused: true });
      const initialState = getAnimationState('initial');
      const finalState = getAnimationState('final');

      const animationProps = { delay, ease };

      // Simple approach: use negative stagger for reverse order
      const staggerValue =
        stagger > 0 ? (animateLeftToRight ? stagger : -stagger) : 0;
      const staggerProps = stagger > 0 ? { stagger: staggerValue } : {};

      console.log('CreateTimeline Debug:', {
        animateFirstToLast: animateLeftToRight,
        originalStagger: stagger,
        calculatedStagger: staggerValue,
        elementsLength: elements.length,
        duration: duration,
      });

      // Calculate actual durations based on the duration prop
      const fadeInDuration = TIMELINE_PHASES.FADE_IN * duration;
      const visibleDuration = TIMELINE_PHASES.VISIBLE * duration;
      const fadeOutDuration = TIMELINE_PHASES.FADE_OUT * duration;

      // Phase 1: Fade in (0% to 15%)
      timeline
        .to(elements, {
          ...finalState,
          duration: fadeInDuration,
          ...animationProps,
          ...staggerProps,
        })
        // Phase 2: Stay visible (15% to 90%)
        .to(elements, {
          ...finalState,
          duration: visibleDuration,
        })
        // Phase 3: Fade out (90% to 100%)
        .to(elements, {
          ...initialState,
          duration: fadeOutDuration,
          ease: 'power2.in',
          stagger:
            stagger > 0
              ? animateLeftToRight
                ? stagger * 0.3
                : -(stagger * 0.3)
              : 0,
        });

      return timeline;
    },
    [
      getAnimationState,
      delay,
      ease,
      stagger,
      animateLeftToRight,
      duration,
      animateOut,
    ]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Determine which elements to animate
    const elements = stagger > 0 ? Array.from(container.children) : [container];

    console.log('ScrollInOut Debug:', {
      animateFirstToLast: animateLeftToRight,
      stagger,
      elementsCount: elements.length,
      elementTexts: elements.map(el => el.textContent?.trim()),
    });

    // Find the scroll container and set initial state
    const scrollContainer = findScrollContainer(container);
    const initialState = getAnimationState('initial');

    gsap.set(elements, initialState);

    // Create and configure the timeline
    const timeline = createTimeline(elements);

    // Create ScrollTrigger with smooth scrubbing
    triggerRef.current = ScrollTrigger.create({
      trigger: container,
      start: triggerStart,
      end: triggerEnd,
      scroller: scrollContainer,
      animation: timeline,
      scrub: 1, // Smooth scroll-linked animation
      markers: debugMode,
    });

    // Cleanup function
    return () => {
      triggerRef.current?.kill();
      triggerRef.current = null;
    };
  }, [
    direction,
    duration,
    delay,
    ease,
    triggerStart,
    triggerEnd,
    animateOut,
    stagger,
    animateLeftToRight,
    createTimeline,
    debugMode,
    getAnimationState,
  ]);

  return (
    <div ref={containerRef} className={className} style={style}>
      {children}
    </div>
  );
};

export default ScrollInOut;
