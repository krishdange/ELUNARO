/*
 * Small inline-SVG icon set (24×24, stroke based) — no icon dependency needed.
 */
const paths = {
  code: (
    <>
      <path d="m8 8-4 4 4 4" />
      <path d="m16 8 4 4-4 4" />
      <path d="m13.5 5-3 14" />
    </>
  ),
  spark: (
    <>
      <path d="M12 3.5c.5 3.9 2.6 6 6.5 6.5-3.9.5-6 2.6-6.5 6.5-.5-3.9-2.6-6-6.5-6.5 3.9-.5 6-2.6 6.5-6.5Z" />
      <path d="M18.5 15.5c.2 1.6 1 2.3 2.5 2.5-1.5.2-2.3 1-2.5 2.5-.2-1.5-1-2.3-2.5-2.5 1.5-.2 2.3-.9 2.5-2.5Z" />
    </>
  ),
  flow: (
    <>
      <rect x="3" y="3.5" width="6" height="6" rx="1.5" />
      <rect x="15" y="14.5" width="6" height="6" rx="1.5" />
      <path d="M9 6.5h4a3 3 0 0 1 3 3v5" />
      <path d="m13.5 12 2.5 2.5 2.5-2.5" />
      <circle cx="6" cy="17.5" r="2.5" />
    </>
  ),
  layers: (
    <>
      <path d="m12 3 9 4.8-9 4.8-9-4.8L12 3Z" />
      <path d="m3 12.2 9 4.8 9-4.8" />
      <path d="m3 16.4 9 4.6 9-4.6" />
    </>
  ),
  plug: (
    <>
      <path d="M9 3v4" />
      <path d="M15 3v4" />
      <path d="M6.5 7h11v3.5a5.5 5.5 0 0 1-11 0V7Z" />
      <path d="M12 16v5" />
    </>
  ),
  shield: (
    <>
      <path d="M12 3 4.5 6v5.5c0 4.6 3.1 8.2 7.5 9.5 4.4-1.3 7.5-4.9 7.5-9.5V6L12 3Z" />
      <path d="m9 12 2 2 4-4" />
    </>
  ),
  chat: (
    <>
      <path d="M20 12.5a7.5 7.5 0 0 1-11 6.6L4 20l1-4.3A7.5 7.5 0 1 1 20 12.5Z" />
      <path d="M8.5 12.5h.01M12 12.5h.01M15.5 12.5h.01" />
    </>
  ),
  compass: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="m15.5 8.5-2 5-5 2 2-5 5-2Z" />
    </>
  ),
  cube: (
    <>
      <path d="m12 2.8 8 4.6v9.2l-8 4.6-8-4.6V7.4l8-4.6Z" />
      <path d="M12 12v9.2M12 12l8-4.6M12 12 4 7.4" />
    </>
  ),
  target: (
    <>
      <circle cx="12" cy="12" r="9" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="12" cy="12" r="1" />
    </>
  ),
  eye: (
    <>
      <path d="M2.5 12S6 5.5 12 5.5 21.5 12 21.5 12 18 18.5 12 18.5 2.5 12 2.5 12Z" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  'arrow-right': (
    <>
      <path d="M4.5 12h15" />
      <path d="m13.5 6 6 6-6 6" />
    </>
  ),
  'arrow-up-right': (
    <>
      <path d="M7 17 17 7" />
      <path d="M8 7h9v9" />
    </>
  ),
  'arrow-up': (
    <>
      <path d="M12 19.5v-15" />
      <path d="m6 10.5 6-6 6 6" />
    </>
  ),
  plus: (
    <>
      <path d="M12 5v14" />
      <path d="M5 12h14" />
    </>
  ),
  check: <path d="m5 12.5 4.5 4.5L19 7.5" />,
  alert: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7.5v5.5" />
      <path d="M12 16.5h.01" />
    </>
  ),
  info: (
    <>
      <circle cx="12" cy="12" r="9" />
      <path d="M12 11v5.5" />
      <path d="M12 7.5h.01" />
    </>
  ),
  mail: (
    <>
      <rect x="3" y="5" width="18" height="14" rx="2.5" />
      <path d="m4 7 8 6 8-6" />
    </>
  ),
  menu: (
    <>
      <path d="M4 8h16" />
      <path d="M4 16h16" />
    </>
  ),
  close: (
    <>
      <path d="M6 6l12 12" />
      <path d="M18 6 6 18" />
    </>
  ),
  chevron: <path d="m6 9 6 6 6-6" />,
  whatsapp: (
    <>
      <path d="M3.5 20.5 4.9 16A8.6 8.6 0 1 1 8 19.2l-4.5 1.3Z" />
      <path d="M9 8.2c-.4 2.9 3.6 6.9 6.6 6.6l.9-1.5-2.1-1-.9.8a4.6 4.6 0 0 1-2.4-2.4l.8-.9-1-2.1L9 8.2Z" />
    </>
  ),
  phone: (
    <path d="M5 3.5h3.3l1.6 4.2-2.1 1.4a11 11 0 0 0 5.6 5.6l1.4-2.1 4.2 1.6V17a2 2 0 0 1-2 2A15.5 15.5 0 0 1 3 5.5a2 2 0 0 1 2-2Z" />
  ),
  user: (
    <>
      <circle cx="12" cy="8" r="3.8" />
      <path d="M4.5 20a7.5 7.5 0 0 1 15 0" />
    </>
  ),
};

export default function Icon({ name, className = '', strokeWidth = 1.6, title }) {
  return (
    <svg
      className={`icon icon--${name} ${className}`.trim()}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden={title ? undefined : 'true'}
      role={title ? 'img' : undefined}
      focusable="false"
    >
      {title ? <title>{title}</title> : null}
      {paths[name]}
    </svg>
  );
}
