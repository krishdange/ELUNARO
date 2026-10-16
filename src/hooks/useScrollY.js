import { useEffect, useState } from 'react';

/**
 * Returns whether the page has scrolled past `threshold` pixels.
 * Uses a passive, rAF-throttled listener and only re-renders when the boolean flips.
 */
export function useScrolledPast(threshold) {
  const [past, setPast] = useState(false);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      setPast(window.scrollY > threshold);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [threshold]);

  return past;
}
