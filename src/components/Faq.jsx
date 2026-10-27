import { useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

export default function Faq({ q, a }) {
  const [o, setO] = useState(false);
  return (
    <div className="faq">
      <button type="button" aria-expanded={o} onClick={() => setO(!o)}><span>{q}</span><span aria-hidden="true">{o ? '−' : '+'}</span></button>
      <AnimatePresence initial={false}>{o && <motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }}>{a}</motion.p>}</AnimatePresence>
    </div>
  );
}
