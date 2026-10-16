/*
 * CSS-built thumbnails for portfolio entries. Purely decorative —
 * every visual uses neutral placeholder content (no real data or metrics).
 */

function Dashboard() {
  const bars = [38, 56, 44, 70, 52, 82, 64, 90, 72, 60, 78, 94];
  return (
    <div className="pv-ui pv-dash">
      <aside className="pv-dash__side">
        <span className="pv-dot pv-dot--brand" />
        {Array.from({ length: 5 }, (_, i) => (
          <span key={i} className={`pv-line ${i === 1 ? 'is-on' : ''}`} />
        ))}
      </aside>
      <div className="pv-dash__main">
        <div className="pv-dash__kpis">
          {[0, 1, 2].map((i) => (
            <div key={i} className="pv-card">
              <span className="pv-line pv-line--xs" />
              <span className="pv-line pv-line--lg" />
            </div>
          ))}
        </div>
        <div className="pv-card pv-dash__chart">
          <div className="pv-bars">
            {bars.map((h, i) => (
              <span key={i} style={{ height: `${h}%` }} />
            ))}
          </div>
          <svg viewBox="0 0 120 40" preserveAspectRatio="none" className="pv-spark">
            <path d="M0 32 C 12 30, 18 22, 30 24 S 50 12, 62 16 S 84 6, 96 9 S 112 4, 120 2" />
          </svg>
        </div>
        <div className="pv-dash__rows">
          {[0, 1, 2].map((i) => (
            <div key={i} className="pv-row">
              <span className="pv-avatar" />
              <span className="pv-line" />
              <span className="pv-pill" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Assistant() {
  return (
    <div className="pv-ui pv-chat">
      <div className="pv-bubble pv-bubble--user">
        <span className="pv-line" />
      </div>
      <div className="pv-bubble pv-bubble--ai">
        <span className="pv-ai-badge">✦</span>
        <div>
          <span className="pv-line" />
          <span className="pv-line" />
          <span className="pv-line pv-line--short" />
          <div className="pv-sources">
            <span>[1] handbook.pdf</span>
            <span>[2] policy.md</span>
          </div>
        </div>
      </div>
      <div className="pv-input">
        <span className="pv-line pv-line--short" />
        <span className="pv-send" />
      </div>
    </div>
  );
}

function Automation() {
  const nodes = ['Extract', 'Validate', 'Approve', 'Sync'];
  return (
    <div className="pv-ui pv-flow">
      {nodes.map((n, i) => (
        <div key={n} className={`pv-node ${i === 2 ? 'pv-node--human' : ''}`} style={{ '--i': i }}>
          <span className="pv-node__dot" />
          {n}
        </div>
      ))}
      <svg className="pv-flow__wire" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M18 22 C 50 22, 50 42, 82 42 M82 42 C 50 42, 50 62, 18 62 M18 62 C 50 62, 50 82, 82 82" />
      </svg>
    </div>
  );
}

function Api() {
  return (
    <div className="pv-ui pv-api">
      <div className="pv-api__hub">
        <span>API</span>
      </div>
      {['Store', 'Payments', 'Fulfilment', 'CRM'].map((l, i) => (
        <div key={l} className={`pv-api__sat pv-api__sat--${i}`}>
          {l}
        </div>
      ))}
      <svg className="pv-api__wires" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <path d="M50 50 L18 22 M50 50 L82 22 M50 50 L18 78 M50 50 L82 78" />
      </svg>
      <code className="pv-api__code">GET /v1/orders/:id</code>
    </div>
  );
}

const visuals = { dashboard: Dashboard, assistant: Assistant, automation: Automation, api: Api };

export default function ProjectVisual({ variant }) {
  const V = visuals[variant] || Dashboard;
  return (
    <div className={`pv pv--${variant}`} aria-hidden="true">
      <V />
    </div>
  );
}
