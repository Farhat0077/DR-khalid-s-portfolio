import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ChevronDown, Globe } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { LANGUAGES } from '../i18n';

// Globe + code pill that opens a small language list (as in the design).
export default function LangMenu() {
  const { t, i18n } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  useEffect(() => {
    const out = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
    const esc = (e) => { if (e.key === 'Escape') setOpen(false); };
    document.addEventListener('mousedown', out); document.addEventListener('keydown', esc);
    return () => { document.removeEventListener('mousedown', out); document.removeEventListener('keydown', esc); };
  }, []);
  return (
    <div ref={ref} style={{ position: 'relative' }}>
      <button type="button" className="pill" aria-haspopup="listbox" aria-expanded={open} aria-label={t('language')} onClick={() => setOpen(!open)}>
        <Globe size={16} aria-hidden="true" />{i18n.language.toUpperCase()}<ChevronDown size={14} aria-hidden="true" />
      </button>
      <AnimatePresence>
        {open && (
          <motion.ul className="menu-list" role="listbox" initial={{ opacity: 0, y: -6 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.18 }}>
            {LANGUAGES.map((l) => (
              <li key={l.code} role="presentation"><button type="button" role="option" aria-selected={i18n.language === l.code} lang={l.code === 'en' ? 'en' : l.code === 'fa' ? 'fa-AF' : 'ps-AF'} onClick={() => { i18n.changeLanguage(l.code); setOpen(false); }}>{l.label}</button></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
}
