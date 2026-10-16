import { useId } from 'react';
import './Wordmark.css';

/** ELUNARO brand mark: an eclipse crescent with the spaced wordmark. */
export function BrandMark({ size = 28, className = '' }) {
  const uid = useId().replace(/:/g, '');
  return (
    <svg className={`brandmark ${className}`.trim()} width={size} height={size} viewBox="0 0 32 32" aria-hidden="true" focusable="false">
      <defs>
        <linearGradient id={`bm-g-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#9db9ff" />
          <stop offset=".55" stopColor="#b49bff" />
          <stop offset="1" stopColor="#79e8e2" />
        </linearGradient>
        <mask id={`bm-m-${uid}`}>
          <rect width="32" height="32" fill="#fff" />
          <circle cx="19.6" cy="12.4" r="9.4" fill="#000" />
        </mask>
      </defs>
      <circle cx="16" cy="16" r="14.5" fill="none" stroke={`url(#bm-g-${uid})`} strokeOpacity=".35" strokeWidth="1" />
      <circle cx="16" cy="16" r="10.5" fill={`url(#bm-g-${uid})`} mask={`url(#bm-m-${uid})`} />
    </svg>
  );
}

export default function Wordmark({ className = '' }) {
  return (
    <span className={`wordmark ${className}`.trim()}>
      <BrandMark />
      <span className="wordmark__text">ELUNARO</span>
    </span>
  );
}
