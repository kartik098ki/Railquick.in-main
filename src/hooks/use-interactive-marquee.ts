import { useRef, useEffect, useState, useCallback } from "react";

interface UseInteractiveMarqueeOptions {
  speed?: number; // pixels per second
  copies?: number;
}

export function useInteractiveMarquee({
  speed = 38,
  copies = 3,
}: UseInteractiveMarqueeOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isMouseDownRef = useRef(false);
  const startXRef = useRef(0);
  const startScrollLeftRef = useRef(0);
  const isInteractingRef = useRef(false);
  const isHoveredRef = useRef(false);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize scroll position to 1 set width so backward drag works immediately
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initTimer = setTimeout(() => {
      if (container && container.scrollWidth > 0) {
        container.scrollLeft = container.scrollWidth / copies;
      }
    }, 120);

    return () => clearTimeout(initTimer);
  }, [copies]);

  // requestAnimationFrame continuous auto-scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;

      if (!isInteractingRef.current && container) {
        container.scrollLeft += speed * delta;
        const setWidth = container.scrollWidth / copies;
        if (setWidth > 0 && container.scrollLeft >= 2 * setWidth) {
          container.scrollLeft -= setWidth;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [speed, copies]);

  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;
    const setWidth = container.scrollWidth / copies;
    if (setWidth > 0) {
      if (container.scrollLeft >= 2 * setWidth) {
        container.scrollLeft -= setWidth;
        if (isMouseDownRef.current) {
          startScrollLeftRef.current -= setWidth;
        }
      } else if (container.scrollLeft <= setWidth * 0.3) {
        container.scrollLeft += setWidth;
        if (isMouseDownRef.current) {
          startScrollLeftRef.current += setWidth;
        }
      }
    }
  }, [copies]);

  const onMouseEnter = useCallback(() => {
    isHoveredRef.current = true;
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const onMouseLeave = useCallback(() => {
    isHoveredRef.current = false;
    isMouseDownRef.current = false;
    setIsDragging(false);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 800);
  }, []);

  const onMouseDown = useCallback(
    (e: React.MouseEvent) => {
      const container = containerRef.current;
      if (!container) return;
      isMouseDownRef.current = true;
      startXRef.current = e.pageX;
      startScrollLeftRef.current = container.scrollLeft;
      isInteractingRef.current = true;
      if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    },
    []
  );

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isMouseDownRef.current) return;
      const container = containerRef.current;
      if (!container) return;
      e.preventDefault();
      setIsDragging(true);
      const diff = (e.pageX - startXRef.current) * 1.35;
      container.scrollLeft = startScrollLeftRef.current - diff;
      handleScroll();
    },
    [handleScroll]
  );

  const onMouseUp = useCallback(() => {
    isMouseDownRef.current = false;
    setTimeout(() => setIsDragging(false), 50);
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      if (!isHoveredRef.current) {
        isInteractingRef.current = false;
      }
    }, 1000);
  }, []);

  const onTouchStart = useCallback(() => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const onTouchEnd = useCallback(() => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      isInteractingRef.current = false;
    }, 1400);
  }, []);

  return {
    containerRef,
    isDragging,
    handlers: {
      onMouseEnter,
      onMouseLeave,
      onMouseDown,
      onMouseMove,
      onMouseUp,
      onTouchStart,
      onTouchEnd,
      onScroll: handleScroll,
    },
  };
}
