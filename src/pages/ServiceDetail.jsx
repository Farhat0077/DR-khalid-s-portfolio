import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Page from '../components/Page';
import Reveal from '../components/Reveal';
import { ServiceArt } from '../components/Illustrations';
import { Magnetic } from '../components/ui';
import { SERVICES } from '../data/site';
import { serviceInfo } from '../data/services';

export default function ServiceDetail() {
  const { slug } = useParams();
  const { t } = useTranslation();
  const idx = SERVICES.findIndex((s) => s.slug === slug);
  if (idx < 0) return <Navigate to="/services" replace />;
  const s = SERVICES[idx]; const it = serviceInfo(t, s); const next = SERVICES[(idx + 1) % SERVICES.length];
  const bring = t('chat.faq').find((f) => f.id === 'bring');
  return (
    <Page title={it.title} description={it.text}>
      <Link to="/services" className="link muted">← {t('m.back')}</Link>
      <div className="grid2" style={{ marginTop: '2rem' }}>
        <Reveal><div className="svc" style={{ boxShadow: 'none' }}><ServiceArt kind={s.art} /></div></Reveal>
        <Reveal><span className="eyebrow line">{t('m.svcEyebrow')}</span><h1 className="heading" style={{ fontSize: 'clamp(2.2rem,4.4vw,3.4rem)', margin: '1.2rem 0 1.2rem' }}>{it.title}</h1><p className="lead">{it.text}</p>
          <div className="btns"><Magnetic to="/appointment" fill>{t('hero.book')}</Magnetic></div></Reveal>
      </div>
      <div className="cards c2" style={{ marginTop: '3.5rem' }}>
        <Reveal className="card"><h2 style={{ fontSize: '1.2rem', fontWeight: 400 }}>{t('specs.tech.title')}</h2><p className="muted" style={{ marginTop: '.5rem' }}>{t('specs.tech.text')}</p></Reveal>
        {bring && <Reveal className="card"><h2 style={{ fontSize: '1.2rem', fontWeight: 400 }}>{bring.q}</h2><p className="muted" style={{ marginTop: '.5rem' }}>{bring.a}</p></Reveal>}
      </div>
      <Link to={`/services/${next.slug}`} className="arrow-link" style={{ marginTop: '3rem' }}>{t('m.next')}: {serviceInfo(t, next).title}<ArrowRight size={16} aria-hidden="true" /></Link>
    </Page>
  );
}
