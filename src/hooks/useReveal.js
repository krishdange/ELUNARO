import { useEffect, useRef } from 'react';

/*
 * One IntersectionObserver is shared by every revealed element,
 * and each element is unobserved as soon as it has been shown.
 */
let sharedObserver = null;

function getObserver() {
  if (!sharedObserver) {
    sharedObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            sharedObserver.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px', threshold: 0.01 },
    );
  }
  return sharedObserver;
}

export function useReveal() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return undefined;
    if (typeof IntersectionObserver === 'undefined') {
      el.classList.add('is-visible');
      return undefined;
    }
    const observer = getObserver();
    observer.observe(el);
    return () => observer.unobserve(el);
  }, []);

  return ref;
}
