import { motion } from 'framer-motion';
import { ArrowRight, ScanLine } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Page from '../components/Page';
import Reveal from '../components/Reveal';
import { ServiceArt } from '../components/Illustrations';
import { Item, Stagger } from '../components/ui';
import { SERVICES } from '../data/site';
import { serviceInfo } from '../data/services';
import { ease } from '../motion';

export default function Services() {
  const { t } = useTranslation();
  return (
    <Page title={t('nav.services')} description={t('m.svcText')}>
      <Reveal><span className="eyebrow line">{t('m.svcEyebrow')}</span><h1 className="heading" style={{ margin: '1.2rem 0 1.4rem' }}>{t('m.svcA')} {t('m.svcB')} <span className="acc">{t('m.svcC')}</span></h1><p className="lead">{t('m.svcText')}</p></Reveal>
      <Stagger className="cards c2" >
        {SERVICES.map((s) => { const it = serviceInfo(t, s); return (
          <Item key={s.slug}><motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease }} style={{ height: '100%', marginTop: '2.5rem' }}>
            <Link to={`/services/${s.slug}`} className="svc"><ServiceArt kind={s.art} /><div className="svc-body"><h3>{it.title}</h3><p>{it.text}</p><span className="go"><ArrowRight size={15} aria-hidden="true" /></span></div></Link>
          </motion.div></Item>); })}
      </Stagger>
      <Reveal className="card" style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', alignItems: 'flex-start' }}><ScanLine aria-hidden="true" style={{ color: 'var(--accent)', flexShrink: 0 }} /><div><h2 style={{ fontSize: '1.2rem', fontWeight: 400 }}>{t('specs.tech.title')}</h2><p className="muted" style={{ marginTop: '.4rem' }}>{t('specs.tech.text')}</p></div></Reveal>
    </Page>
  );
}
