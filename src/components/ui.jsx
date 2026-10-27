import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion, useMotionValue, useReducedMotion, useSpring } from 'framer-motion';
import { fade, stagger, vp } from '../motion';

export function Stagger({ children, className, as = 'div' }) { const T = motion[as]; return <T className={className} variants={stagger} initial="hidden" whileInView="show" viewport={vp}>{children}</T>; }
export function Item({ children, className, as = 'div' }) { const r = useReducedMotion(); const T = motion[as]; return <T className={className} variants={fade(r)}>{children}</T>; }

// Soft magnetic pull on buttons (off for reduced motion).
export function Magnetic({ to, href, children, fill, ...p }) {
  const r = useReducedMotion(); const ref = useRef(null);
  const x = useMotionValue(0), y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 16 }), sy = useSpring(y, { stiffness: 220, damping: 16 });
  const move = (e) => { if (r) return; const b = ref.current.getBoundingClientRect(); x.set((e.clientX - b.left - b.width / 2) * 0.25); y.set((e.clientY - b.top - b.height / 2) * 0.35); };
  const leave = () => { x.set(0); y.set(0); };
  const cls = `btn${fill ? ' fill' : ''}`;
  return (
    <motion.span ref={ref} style={{ x: sx, y: sy, display: 'inline-block' }} onMouseMove={move} onMouseLeave={leave} whileTap={{ scale: 0.97 }}>
      {to ? <Link to={to} className={cls} {...p}>{children}</Link> : href ? <a href={href} className={cls} {...p}>{children}</a> : <button className={cls} {...p}>{children}</button>}
    </motion.span>
  );
}

// Generated monochrome art with a second variant on hover; optional icon badge.
function shapes(seed, inv) {
  let s = seed * 9301 + (inv ? 7 : 0); const rnd = () => ((s = (s * 16807) % 2147483647) / 2147483647);
  return Array.from({ length: 7 }, (_, i) => {
    const x = rnd() * 80, y = rnd() * 70, w = 10 + rnd() * 40, h = 6 + rnd() * 30;
    return i % 3 === 0 ? <circle key={i} cx={x + 10} cy={y + 10} r={w / 4} fill="currentColor" opacity=".85" /> : <rect key={i} x={x} y={y} width={w} height={h} fill={i % 2 ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth=".6" opacity=".7" />;
  });
}
export function Thumb({ seed, Icon }) {
  return (
    <div className="thumb" aria-hidden="true">
      <svg className="a" viewBox="0 0 100 75" preserveAspectRatio="xMidYMid slice">{shapes(seed)}</svg>
      <svg className="b" viewBox="0 0 100 75" preserveAspectRatio="xMidYMid slice">{shapes(seed, true)}</svg>
      {Icon && <span className="thumb-i"><span><Icon size={30} strokeWidth={1.25} /></span></span>}
    </div>
  );
}
