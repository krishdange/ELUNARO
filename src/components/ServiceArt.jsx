/* Decorative mini-visuals for the featured service cards. */

function CodeArt() {
  return (
    <div className="sart sart--code" aria-hidden="true">
      <div className="sart__bar">
        <span />
        <span />
        <span />
        <em>workspace.ts</em>
      </div>
      <pre>
        <code>
          <span className="t-c">{'// Approvals follow your policy'}</span>
          {'\n'}<span className="t-k">export async function</span> <span className="t-f">approveRequest</span>(id) {'{'}
          {'\n'}  <span className="t-k">const</span> req = <span className="t-k">await</span> requests.<span className="t-f">get</span>(id);
          {'\n'}  <span className="t-k">if</span> (!policy.<span className="t-f">allows</span>(req)) <span className="t-k">return</span> <span className="t-s">'review'</span>;
          {'\n'}  <span className="t-k">await</span> ledger.<span className="t-f">record</span>(req);
          {'\n'}  <span className="t-k">await</span> notify.<span className="t-f">team</span>(req.owner, <span className="t-s">'approved'</span>);
          {'\n'}  <span className="t-k">return</span> <span className="t-s">'approved'</span>;
          {'\n'}{'}'}
        </code>
      </pre>
    </div>
  );
}

function NeuralArt() {
  const layers = [
    [40, 90, 140],
    [30, 70, 110, 150],
    [55, 125],
  ];
  const xs = [30, 120, 210];
  const nodes = layers.flatMap((ys, li) => ys.map((y) => ({ x: xs[li], y, li })));
  const edges = [];
  for (let li = 0; li < layers.length - 1; li += 1) {
    layers[li].forEach((y1) => layers[li + 1].forEach((y2) => edges.push([xs[li], y1, xs[li + 1], y2])));
  }
  return (
    <svg className="sart sart--neural" viewBox="0 0 240 180" aria-hidden="true">
      {edges.map(([x1, y1, x2, y2], i) => (
        <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} className={i % 5 === 0 ? 'is-hot' : ''} />
      ))}
      {nodes.map((n, i) => (
        <circle key={i} cx={n.x} cy={n.y} r={n.li === 1 ? 5 : 6.5} className={`n-l${n.li}`} />
      ))}
    </svg>
  );
}

export default function ServiceArt({ variant }) {
  if (variant === 'code') return <CodeArt />;
  if (variant === 'neural') return <NeuralArt />;
  return null;
}
