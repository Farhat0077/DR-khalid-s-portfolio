import { useEffect } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { ease } from '../motion';

// Page transition + per-page <title>/description. `top` clears the fixed header on inner pages.
export default function Page({ title, description, children, top = true }) {
  const reduce = useReducedMotion();
  const { t } = useTranslation();
  useEffect(() => {
    document.title = `${title} — ${t('brand')}`;
    const m = document.querySelector('meta[name="description"]');
    if (m && description) m.setAttribute('content', description);
    window.scrollTo(0, 0);
  }, [title, description, t]);
  return (
    <motion.div className={top ? 'wrap page-top sec' : undefined} initial={{ opacity: 0, y: reduce ? 0 : 14 }} animate={{ opacity: 1, y: 0, transition: { duration: 0.6, ease } }} exit={{ opacity: 0, transition: { duration: 0.2 } }}>
      {children}
    </motion.div>
  );
}
