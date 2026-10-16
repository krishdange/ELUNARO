import { useReducedMotion } from '../hooks/useMediaQuery.js';
import Icon from './Icon.jsx';
import './HeroVisual.css';

const C = 300; // centre of the 600×600 canvas
const R = 116; // sphere radius

/*
 * Orbits are drawn *after* the sphere. Each orbit group is masked by the upper
 * half of the sphere (in the orbit's own tilted space) so the far side of the
 * orbit — and any node travelling along it — disappears behind the sphere.
 */
const orbits = [
  { id: 'a', rx: 262, ry: 74, tilt: -16, dur: 26, nodes: [{ begin: 0, t: 1.1 }, { begin: -13, t: 2.6 }], dash: '2 7', tone: 'blue' },
  { id: 'b', rx: 206, ry: 128, tilt: 28, dur: 34, nodes: [{ begin: -8, t: 0.5 }], dash: '1 0', tone: 'violet' },
  { id: 'c', rx: 290, ry: 34, tilt: -4, dur: 44, nodes: [{ begin: -20, t: 2.1 }], dash: '1 9', tone: 'cyan' },
];

const ellipsePath = (rx, ry) => `M ${C - rx} ${C} a ${rx} ${ry} 0 1 0 ${rx * 2} 0 a ${rx} ${ry} 0 1 0 ${-rx * 2} 0`;

const satellites = [
  { x: 92, y: 150 },
  { x: 528, y: 118 },
  { x: 514, y: 476 },
];

function OrbitNode({ orbit, node, reduced }) {
  const core = (
    <>
      <circle r="9" className={`hv-node__halo hv-tone--${orbit.tone}`} />
      <circle r="3.2" className="hv-node__core" />
    </>
  );
  if (reduced) {
    const x = C + orbit.rx * Math.cos(node.t);
    const y = C + orbit.ry * Math.sin(node.t);
    return <g transform={`translate(${x} ${y})`}>{core}</g>;
  }
  return (
    <g>
      {core}
      <animateMotion dur={`${orbit.dur}s`} begin={`${node.begin}s`} repeatCount="indefinite" path={ellipsePath(orbit.rx, orbit.ry)} />
    </g>
  );
}

export default function HeroVisual() {
  const reduced = useReducedMotion();

  return (
    <div className="hv" aria-hidden="true">
      <svg className="hv__svg" viewBox="0 0 600 600" fill="none">
        <defs>
          <radialGradient id="hv-core" cx="38%" cy="30%" r="80%">
            <stop offset="0" stopColor="#1a2452" />
            <stop offset=".55" stopColor="#0a1027" />
            <stop offset="1" stopColor="#05070e" />
          </radialGradient>
          <linearGradient id="hv-rim" x1="0" y1="1" x2="1" y2="0">
            <stop offset="0" stopColor="#79e8e2" />
            <stop offset=".45" stopColor="#9db9ff" />
            <stop offset="1" stopColor="#b49bff" />
          </linearGradient>
          <radialGradient id="hv-aura" cx="50%" cy="50%" r="50%">
            <stop offset="0" stopColor="#4f7dff" stopOpacity=".35" />
            <stop offset=".55" stopColor="#6a4fff" stopOpacity=".12" />
            <stop offset="1" stopColor="#05070e" stopOpacity="0" />
          </radialGradient>
          <radialGradient id="hv-fade" cx="50%" cy="50%" r="50%">
            <stop offset=".25" stopColor="#fff" stopOpacity="1" />
            <stop offset="1" stopColor="#fff" stopOpacity="0" />
          </radialGradient>
          <pattern id="hv-dots" width="22" height="22" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" fill="#9db9ff" fillOpacity=".32" />
          </pattern>
          <mask id="hv-dotmask">
            <rect width="600" height="600" fill="url(#hv-fade)" />
          </mask>
          <mask id="hv-crescent">
            <rect width="600" height="600" fill="#fff" />
            <circle cx={C + 16} cy={C - 18} r={R - 1} fill="#000" />
          </mask>
          <clipPath id="hv-sphere-clip">
            <circle cx={C} cy={C} r={R} />
          </clipPath>
          <mask id="hv-behind" maskUnits="userSpaceOnUse" x="-200" y="-200" width="1000" height="1000">
            <rect x="-200" y="-200" width="1000" height="1000" fill="#fff" />
            <path d={`M ${C - R - 3} ${C} A ${R + 3} ${R + 3} 0 0 1 ${C + R + 3} ${C} Z`} fill="#000" />
          </mask>
          <filter id="hv-blur" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="10" />
          </filter>
        </defs>

        {/* Dot field */}
        <rect width="600" height="600" fill="url(#hv-dots)" mask="url(#hv-dotmask)" />

        {/* Aura */}
        <circle cx={C} cy={C} r="250" fill="url(#hv-aura)" />

        {/* Satellite links */}
        <g className="hv__links">
          {satellites.map((s, i) => (
            <line key={i} x1={s.x} y1={s.y} x2={C} y2={C} className="hv__link" style={{ animationDelay: `${i * -1.3}s` }} />
          ))}
        </g>

        {/* Sphere */}
        <g className="hv__sphere">
          <circle cx={C} cy={C} r={R} fill="url(#hv-core)" />
          <g clipPath="url(#hv-sphere-clip)" className="hv__grid" transform={`rotate(-16 ${C} ${C})`}>
            {[26, 58, 90].map((ry) => (
              <ellipse key={`lat${ry}`} cx={C} cy={C} rx={R} ry={ry} />
            ))}
            {[34, 72, 104].map((rx) => (
              <ellipse key={`lon${rx}`} cx={C} cy={C} rx={rx} ry={R} />
            ))}
            <line x1={C - R} y1={C} x2={C + R} y2={C} />
          </g>
          {/* Eclipse crescent + its glow */}
          <circle cx={C} cy={C} r={R + 1.5} fill="url(#hv-rim)" mask="url(#hv-crescent)" filter="url(#hv-blur)" opacity=".9" />
          <circle cx={C} cy={C} r={R + 1.5} fill="url(#hv-rim)" mask="url(#hv-crescent)" />
          <circle cx={C} cy={C} r={R + 0.5} stroke="url(#hv-rim)" strokeOpacity=".28" strokeWidth="1" />
        </g>

        {/* Orbits (with far side hidden behind the sphere) */}
        {orbits.map((o) => (
          <g key={o.id} transform={`rotate(${o.tilt} ${C} ${C})`} mask="url(#hv-behind)">
            <path d={ellipsePath(o.rx, o.ry)} className={`hv__orbit hv-tone--${o.tone}`} strokeDasharray={o.dash} />
            {o.nodes.map((n, i) => (
              <OrbitNode key={i} orbit={o} node={n} reduced={reduced} />
            ))}
          </g>
        ))}

        {/* Satellites */}
        {satellites.map((s, i) => (
          <g key={i} transform={`translate(${s.x} ${s.y})`} className="hv__sat">
            <rect x="-7" y="-7" width="14" height="14" rx="3.5" transform="rotate(45)" />
            <circle r="2" />
          </g>
        ))}
      </svg>

      {/* Floating interface chips — decorative, describe capabilities (not metrics) */}
      <div className="hv__chip hv__chip--a">
        <span className="hv__chip-icon"><Icon name="spark" /></span>
        <span>
          <span className="hv__chip-k">assistant.answer()</span>
          <span className="hv__chip-v">grounded · cited</span>
        </span>
      </div>
      <div className="hv__chip hv__chip--b">
        <span className="hv__chip-icon"><Icon name="flow" /></span>
        <span>
          <span className="hv__chip-k">workflow.run</span>
          <span className="hv__chip-v">extract → approve → sync</span>
        </span>
      </div>
      <div className="hv__chip hv__chip--c">
        <span className="hv__chip-dot" />
        <span className="hv__chip-k">POST /v1/orders</span>
      </div>
    </div>
  );
}
