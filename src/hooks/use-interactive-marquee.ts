import { useRef, useEffect, useState, useCallback } from "react";

interface UseInteractiveMarqueeOptions {
  speed?: number; // pixels per second
  copies?: number;
}

export function useInteractiveMarquee({
  speed = 42,
  copies = 3,
}: UseInteractiveMarqueeOptions = {}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const isMouseDownRef = useRef(false);
  const lastXRef = useRef(0);
  const isInteractingRef = useRef(false);
  const posRef = useRef(0);
  const resumeTimerRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize position at 1 set width so backward drag works immediately
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const initPos = () => {
      if (container && container.scrollWidth > 0) {
        const setWidth = container.scrollWidth / copies;
        if (setWidth > 0) {
          container.scrollLeft = setWidth;
          posRef.current = setWidth;
        }
      }
    };

    initPos();
    const t1 = setTimeout(initPos, 100);
    const t2 = setTimeout(initPos, 400);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [copies]);

  // Handle boundary wrapping with buffer and sync posRef
  const handleScroll = useCallback(() => {
    const container = containerRef.current;
    if (!container) return;

    const setWidth = container.scrollWidth / copies;
    if (setWidth > 0) {
      if (container.scrollLeft >= 2 * setWidth) {
        container.scrollLeft -= setWidth;
      } else if (container.scrollLeft <= 0.2 * setWidth) {
        container.scrollLeft += setWidth;
      }
    }
    posRef.current = container.scrollLeft;
  }, [copies]);

  // RequestAnimationFrame continuous auto-scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animId: number;
    let lastTime = performance.now();

    const step = (now: number) => {
      const delta = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      if (!isInteractingRef.current && container) {
        const setWidth = container.scrollWidth / copies;

        if (setWidth > 0) {
          posRef.current += speed * delta;

          // Seamless loop when reaching set 2 -> wrap back to set 1
          while (posRef.current >= 2 * setWidth) {
            posRef.current -= setWidth;
          }
          while (posRef.current < 0.2 * setWidth) {
            posRef.current += setWidth;
          }

          container.scrollLeft = posRef.current;
        }
      }
      animId = requestAnimationFrame(step);
    };

    animId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animId);
  }, [speed, copies]);

  // Resumes auto-scroll after inactivity
  const scheduleResume = useCallback((delayMs = 1200) => {
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
    resumeTimerRef.current = setTimeout(() => {
      if (!isMouseDownRef.current) {
        isInteractingRef.current = false;
      }
    }, delayMs);
  }, []);

  const onMouseEnter = useCallback(() => {
    isInteractingRef.current = true;
    // Auto-resume after 2.5s even if mouse stays, so it never freezes permanently
    scheduleResume(2500);
  }, [scheduleResume]);

  const onMouseLeave = useCallback(() => {
    isMouseDownRef.current = false;
    setIsDragging(false);
    scheduleResume(600);
  }, [scheduleResume]);

  const onMouseDown = useCallback((e: React.MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;
    isMouseDownRef.current = true;
    lastXRef.current = e.pageX;
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const onMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isMouseDownRef.current) return;
      const container = containerRef.current;
      if (!container) return;
      e.preventDefault();
      setIsDragging(true);

      const deltaX = e.pageX - lastXRef.current;
      lastXRef.current = e.pageX;

      container.scrollLeft -= deltaX * 1.25;
      posRef.current = container.scrollLeft;
      handleScroll();
    },
    [handleScroll]
  );

  const onMouseUp = useCallback(() => {
    if (isMouseDownRef.current) {
      isMouseDownRef.current = false;
      setTimeout(() => setIsDragging(false), 50);
      scheduleResume(1200);
    }
  }, [scheduleResume]);

  // Global mouseup in case user releases mouse outside container
  useEffect(() => {
    const handleGlobalMouseUp = () => {
      if (isMouseDownRef.current) {
        isMouseDownRef.current = false;
        setTimeout(() => setIsDragging(false), 50);
        scheduleResume(1200);
      }
    };
    window.addEventListener("mouseup", handleGlobalMouseUp);
    return () => window.removeEventListener("mouseup", handleGlobalMouseUp);
  }, [scheduleResume]);

  const onTouchStart = useCallback(() => {
    isInteractingRef.current = true;
    if (resumeTimerRef.current) clearTimeout(resumeTimerRef.current);
  }, []);

  const onTouchEnd = useCallback(() => {
    // When user lifts finger from swipe, wait 1.2s then resume auto-scroll
    scheduleResume(1200);
  }, [scheduleResume]);

  const onWheel = useCallback(() => {
    isInteractingRef.current = true;
    scheduleResume(1200);
  }, [scheduleResume]);

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
      onWheel,
      onScroll: handleScroll,
    },
  };
}
