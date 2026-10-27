import { motion, useReducedMotion } from 'framer-motion';
import { Brain } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Page from '../components/Page';
import { Magnetic } from '../components/ui';

export default function NotFound() {
  const { t } = useTranslation();
  const r = useReducedMotion();
  return (
    <Page title="404" description="Page not found">
      <motion.p className="big404" animate={r ? {} : { rotate: [0, -2, 2, 0] }} transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}>404</motion.p>
      <Brain aria-hidden="true" size={28} style={{ margin: 'var(--s3) 0 var(--s2)' }} />
      <h1 className="h2">{t('nf.title')}</h1>
      <p className="muted" style={{ marginTop: '.5rem', maxWidth: '32rem' }}>{t('nf.text')}</p>
      <div className="btns"><Magnetic to="/" fill>{t('nav.home')}</Magnetic><Magnetic to="/appointment">{t('nav.appointment')}</Magnetic></div>
    </Page>
  );
}
