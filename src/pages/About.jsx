import { motion, useReducedMotion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import Page from '../components/Page';
import { Item, Stagger } from '../components/ui';
import { SITE } from '../data/site';
import { ease } from '../motion';

// Only verified facts. No dates are shown because none were provided.
export default function About() {
  const { t } = useTranslation();
  const r = useReducedMotion();
  return (
    <Page title={t('nav.about')} description={t('about.title')}>
      <div className="grid2" style={{ alignItems: 'start' }}>
        <motion.div className="photo" initial={{ opacity: 0, clipPath: r ? 'none' : 'inset(0 0 100% 0)' }} animate={{ opacity: 1, clipPath: r ? 'none' : 'inset(0 0 0% 0)' }} transition={{ duration: 1, ease, delay: 0.2 }}>
          <img src={SITE.photo} alt={t('hero.photoAlt')} />
        </motion.div>
        <Stagger>
          <Item><span className="eyebrow line">{t('about.kicker')}</span><h1 className="heading" style={{ fontSize: 'clamp(2.2rem,4.4vw,3.6rem)', marginTop: '1.2rem' }}>{t('about.title')}</h1></Item>
          <Item><p className="lead" style={{ marginTop: '1.6rem' }}>{t('about.bio1')}</p></Item>
          <Item><p className="muted" style={{ marginTop: '1rem', maxWidth: '36rem' }}>{t('about.bio2')}</p></Item>
          <Item><ul className="chips" style={{ listStyle: 'none', padding: 0 }}>{SITE.credentials.map((c) => <li key={c} className="chip">{c}</li>)}</ul></Item>
        </Stagger>
      </div>
    </Page>
  );
}
