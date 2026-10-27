import { useId, useMemo } from 'react';

// Animated SVG line art (no WebGL / 3D). Seeded so the shapes are stable between renders.
const rng = (s) => () => ((s = (s * 16807) % 2147483647) / 2147483647);

export function BrainNet() {
  const id = useId();
  const { pts, edges } = useMemo(() => {
    const r = rng(42); const pts = [];
    const inside = (x, y) => ((x - 100) / 88) ** 2 + ((y - 72) / 60) ** 2 < 1 || ((x - 142) / 34) ** 2 + ((y - 126) / 19) ** 2 < 1 || (x > 108 && x < 126 && y > 115 && y < 158);
    while (pts.length < 80) { const x = r() * 200, y = r() * 165; if (inside(x, y)) pts.push([x, y]); }
    const edges = [];
    pts.forEach((p, i) => pts.map((q, j) => [j, Math.hypot(p[0] - q[0], p[1] - q[1])]).filter(([j, d]) => j > i && d < 26).sort((a, b) => a[1] - b[1]).slice(0, 2).forEach(([j]) => edges.push([i, j])));
    return { pts, edges };
  }, []);
  const sulci = ['M40 70 C60 40 90 50 100 30', 'M70 100 C90 80 120 90 140 60', 'M120 40 C140 60 150 50 165 70', 'M55 95 C80 110 100 100 120 112'];
  return (
    <svg viewBox="0 0 200 165" aria-hidden="true" style={{ width: '100%', height: '100%', overflow: 'visible' }}>
      <defs><radialGradient id={id} cx="50%" cy="40%" r="65%"><stop offset="0" stopColor="currentColor" stopOpacity=".32" /><stop offset="1" stopColor="currentColor" stopOpacity=".06" /></radialGradient></defs>
      <g fill={`url(#${id})`} stroke="currentColor" strokeWidth=".7" strokeOpacity=".6">
        <ellipse cx="100" cy="72" rx="88" ry="60" /><ellipse cx="142" cy="126" rx="34" ry="19" /><rect x="108" y="116" width="18" height="42" rx="8" />
      </g>
      <g fill="none" stroke="currentColor" strokeOpacity=".3" strokeWidth=".8">{sulci.map((d) => <path key={d} d={d} />)}</g>
      <g stroke="currentColor" strokeOpacity=".45" strokeWidth=".5">{edges.map(([a, b], i) => <line key={i} x1={pts[a][0]} y1={pts[a][1]} x2={pts[b][0]} y2={pts[b][1]} />)}</g>
      {pts.map(([x, y], i) => (<circle key={i} className="tw" cx={x} cy={y} r={i % 9 === 0 ? 2.4 : 1.3} fill={i % 9 === 0 ? 'rgb(var(--amber))' : 'currentColor'} style={{ animationDelay: `${(i % 11) * 0.3}s` }} />))}
    </svg>
  );
}

function Spine() {
  return (
    <svg viewBox="0 0 100 150" aria-hidden="true"><g transform="rotate(-8 50 75)">
      {Array.from({ length: 7 }, (_, i) => { const y = 6 + i * 20, x = 50 + Math.sin(i * 0.8) * 5, w = 26 + i * 2.4; return (<g key={i}>
        <rect className="art-fill art-stroke" x={x - w / 2} y={y} width={w} height="13" rx="5" strokeWidth="1" />
        <rect x={x - w / 2 + 3} y={y + 3} width={w - 6} height="3" rx="1.5" fill={i === 3 ? 'rgb(var(--amber))' : 'currentColor'} opacity={i === 3 ? 0.9 : 0.25} className={i === 3 ? 'tw' : ''} />
        <ellipse cx={x} cy={y + 16.5} rx={w / 2 - 4} ry="2" fill="currentColor" opacity=".2" /></g>); })}
    </g></svg>
  );
}
function Neurons() {
  const parts = useMemo(() => {
    const r = rng(7); return [[35, 42], [98, 68], [58, 116]].map(([cx, cy]) => Array.from({ length: 7 }, (_, k) => {
      const a = (k / 7) * Math.PI * 2 + r(), L = 24 + r() * 22, x = cx + Math.cos(a) * L, y = cy + Math.sin(a) * L;
      return { d: `M${cx} ${cy} Q${cx + Math.cos(a + 0.5) * L * 0.6} ${cy + Math.sin(a + 0.5) * L * 0.6} ${x} ${y}`, x, y, cx, cy };
    }));
  }, []);
  return (<svg viewBox="0 0 140 150" aria-hidden="true">{parts.map((cell, i) => (<g key={i}>
    {cell.map((b, k) => (<g key={k}><path className="art-stroke" d={b.d} strokeWidth=".9" opacity=".7" /><circle className="tw" cx={b.x} cy={b.y} r="1.8" fill="currentColor" style={{ animationDelay: `${k * 0.35}s` }} /></g>))}
    <circle cx={cell[0].cx} cy={cell[0].cy} r="6" fill="currentColor" opacity=".85" /></g>))}</svg>);
}
function Vessels() {
  const segs = useMemo(() => { const r = rng(11), out = []; const grow = (x, y, a, l, d) => { if (!d) return; const x2 = x + Math.cos(a) * l, y2 = y + Math.sin(a) * l; out.push({ x, y, x2, y2, w: d * 0.8, leaf: d === 1 }); const s = 0.45 + r() * 0.25; grow(x2, y2, a - s, l * 0.74, d - 1); grow(x2, y2, a + s, l * 0.74, d - 1); }; grow(70, 148, -Math.PI / 2, 34, 5); return out; }, []);
  return (<svg viewBox="0 0 140 150" aria-hidden="true">{segs.map((s, i) => (<g key={i}><line x1={s.x} y1={s.y} x2={s.x2} y2={s.y2} stroke="currentColor" strokeWidth={s.w} strokeLinecap="round" opacity=".7" />{s.leaf && <circle className="tw" cx={s.x2} cy={s.y2} r="1.8" fill={i % 3 === 0 ? 'rgb(var(--amber))' : 'currentColor'} style={{ animationDelay: `${(i % 7) * 0.4}s` }} />}</g>))}</svg>);
}
function Nerves() {
  return (<svg viewBox="0 0 160 100" aria-hidden="true">{[20, 40, 60, 80].map((y, i) => (<g key={y}><path className="art-stroke" strokeWidth="1.1" opacity=".75" d={`M0 ${y} C30 ${y - 18} 55 ${y + 18} 85 ${y} S135 ${y - 14} 160 ${y + (i % 2 ? 6 : -6)}`} />
    <circle className="tw" cx={40 + i * 28} cy={y} r="2.4" fill={i === 1 ? 'rgb(var(--amber))' : 'currentColor'} style={{ animationDelay: `${i * 0.5}s` }} /></g>))}</svg>);
}
const MAP = { brain: BrainNet, spine: Spine, vessel: Vessels, nerve: Nerves, neuron: Neurons };
const SERVICE_PHOTOS = {
  brain: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?auto=format&fit=crop&w=1400&q=85',
  spine: 'https://images.unsplash.com/photo-1579684385127-1ef15d508118?auto=format&fit=crop&w=1400&q=85',
  vessel: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=1400&q=85',
  nerve: 'https://images.unsplash.com/photo-1584982751601-97dcc096659c?auto=format&fit=crop&w=1400&q=85',
  neuron: 'https://images.unsplash.com/photo-1530497610245-94d3c16cda28?auto=format&fit=crop&w=1400&q=85',
};
export function ServiceArt({ kind }) {
  const A = MAP[kind] || Neurons;
  return <div className={`svc-art svc-art-photo svc-art-${kind || 'neuron'}`}>
    <img className="svc-photo-img" src={SERVICE_PHOTOS[kind] || SERVICE_PHOTOS.neuron} alt="" loading="lazy" />
    <div className="svc-photo-shade" aria-hidden="true" />
    <div className="svc-photo-art"><A /></div>
    <span className="svc-photo-label">NEUROSCIENCE <i aria-hidden="true">/</i> {String(kind || 'neuron').toUpperCase()}</span>
  </div>;
}
