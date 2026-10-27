import { motion, useReducedMotion } from 'framer-motion';
import { ArrowRight, Play } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Page from '../components/Page';
import Reveal from '../components/Reveal';
import Faq from '../components/Faq';
import { ServiceArt } from '../components/Illustrations';
import InteractiveBrain from '../components/InteractiveBrain';
import { Item, Magnetic, Stagger } from '../components/ui';
import { SERVICES, SITE } from '../data/site';
import { serviceInfo } from '../data/services';
import { ease } from '../motion';

function Words({ text, start, strong }) {
  const r = useReducedMotion();
  const Tag = strong ? 'strong' : 'span';
  return (
    <Tag className={strong ? undefined : undefined} aria-label={text}>
      {text.split(' ').map((w, i) => (<motion.span key={i} className="w" aria-hidden="true" initial={{ opacity: 0, y: r ? 0 : '0.45em' }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease, delay: start + i * 0.08 }}>{w}</motion.span>))}
    </Tag>
  );
}

export default function Home() {
  const { t } = useTranslation();
  const values = t('m.values');
  const stack = [...SITE.credentials, ...t('about.memberships').map((m) => m.abbr)];
  const faq = t('chat.faq').filter((f) => f.id !== 'emergency').slice(0, 4);

  return (
    <Page title={t('nav.home')} description={t('m.intro')} top={false}>
      <section className="hero">
        <video className="hero-background-video" autoPlay muted loop playsInline preload="metadata" poster="/images/neural-video-poster.jpg" aria-hidden="true" tabIndex={-1}>
          <source src="/videos/neural-cinematic.mp4" type="video/mp4" />
        </video>
        <div className="hero-video-overlay" aria-hidden="true" />
        <div className="wrap hero-grid">
          <div>
            <motion.p className="eyebrow" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.3 }}>{t('m.eyebrow')}</motion.p>
            <h1>
              <span className="l"><Words text={t('m.h1a')} start={0.5} /></span>
              <span className="l"><Words text={t('m.h1b')} start={0.8} /> <Words text={t('m.h1c')} start={1} strong /></span>
            </h1>
            <motion.p className="intro" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.3, duration: 0.8 }}>{t('m.intro')}</motion.p>
            <motion.div className="btns" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5, duration: 0.8 }}>
              <Magnetic to="/services" fill>{t('m.explore')} <ArrowRight size={16} aria-hidden="true" /></Magnetic>
              <Link to="/about" className="arrow-link" style={{ fontSize: '.92rem' }}>{t('m.learn')}<span className="pill round" style={{ width: '2.2rem', height: '2.2rem' }}><Play size={11} aria-hidden="true" /></span></Link>
            </motion.div>
            <motion.div className="scrollhint" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2, duration: 0.8 }}><span className="mouse" aria-hidden="true" /><span>{t('m.scroll')}<br />{t('m.scrollSub')}</span></motion.div>
          </div>

          <motion.div className="hv" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 1, ease, delay: 0.4 }}>
            <div className="hv-photo"><img src={SITE.photo} alt={t('hero.photoAlt')} fetchpriority="high" /></div>
            <motion.div className="hv-brain" animate={{ y: [0, -8, 0] }} transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}>
              <div className="orbit" aria-hidden="true" /><div className="orbit o2" aria-hidden="true" /><InteractiveBrain />
            </motion.div>
            <div className="glass"><b>{t('brand')}</b><small>{t('m.role')}</small><hr /><p>{values.map((v) => <span key={v}>{v}</span>)}</p></div>
          </motion.div>
        </div>
      </section>

      <section className="sec wrap">
        <div className="svc-grid">
          <Reveal>
            <span className="eyebrow line">{t('m.svcEyebrow')}</span>
            <h2 className="h2" style={{ margin: '1.2rem 0 1.4rem' }}>{t('m.svcA')}<br />{t('m.svcB')} <span className="acc">{t('m.svcC')}</span></h2>
            <p className="muted" style={{ maxWidth: '24rem' }}>{t('m.svcText')}</p>
            <Link to="/services" className="arrow-link" style={{ marginTop: '2rem' }}>{t('m.viewAll')}<ArrowRight size={16} aria-hidden="true" /></Link>
          </Reveal>
          <Stagger className="cards c3">
            {SERVICES.slice(0, 3).map((s) => { const it = serviceInfo(t, s); return (
              <Item key={s.slug}><motion.div whileHover={{ y: -6 }} transition={{ duration: 0.3, ease }} style={{ height: '100%' }}>
                <Link to={`/services/${s.slug}`} className="svc"><ServiceArt kind={s.art} /><div className="svc-body"><h3>{it.title}</h3><p>{it.text}</p><span className="go"><ArrowRight size={15} aria-hidden="true" /></span></div></Link>
              </motion.div></Item>); })}
          </Stagger>
        </div>
      </section>

      <section className="wrap" aria-label={t('k.stack')}><div className="marquee"><div className="track">{[...stack, ...stack].map((s, i) => <span key={i} aria-hidden={i >= stack.length}>{s}</span>)}</div></div></section>

      <section className="cinematic-band wrap" aria-label={t('m.svcEyebrow')}>
        <video className="cinematic-video" autoPlay muted loop playsInline preload="metadata" aria-hidden="true" tabIndex={-1}>
          <source src="/videos/clinical-cinematic.mp4" type="video/mp4" />
        </video>
        <div className="cinematic-shade" aria-hidden="true" />
        <div className="cinematic-content">
          <span className="eyebrow">{t('m.svcEyebrow')}</span>
          <p>{t('m.svcText')}</p>
          <Link to="/services" className="cinematic-link">{t('m.viewAll')} <ArrowRight size={16} aria-hidden="true" /></Link>
        </div>
        <span className="cinematic-index" aria-hidden="true">NEUROSCIENCE / KABUL</span>
      </section>

      <section className="sec wrap">
        <div className="grid2">
          <Reveal><div className="photo"><img src={SITE.photo} alt={t('hero.photoAlt')} loading="lazy" /></div></Reveal>
          <Reveal>
            <span className="eyebrow line">{t('m.aboutEyebrow')}</span>
            <h2 className="h2" style={{ margin: '1.2rem 0 1.4rem' }}>{t('about.title')}</h2>
            <p className="muted">{t('about.bio1')}</p>
            <ul className="chips" style={{ listStyle: 'none', padding: 0 }}>{SITE.credentials.map((c) => <li key={c} className="chip">{c}</li>)}</ul>
            <Link to="/about" className="arrow-link" style={{ marginTop: '2rem' }}>{t('m.learn')}<ArrowRight size={16} aria-hidden="true" /></Link>
          </Reveal>
        </div>
      </section>

      <section className="sec wrap" style={{ paddingTop: 0 }}>
        <Reveal className="head" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: '1rem', marginBottom: '1.5rem' }}>
          <h2 className="h2">{t('m.faqTitle')}</h2><Link to="/faq" className="link muted">{t('m.moreFaq')}</Link>
        </Reveal>
        <div>{faq.map((f) => <Faq key={f.id} q={f.q} a={f.a} />)}</div>
      </section>

      <section className="wrap" style={{ paddingBottom: '5rem' }}>
        <Reveal className="cta">
          <h2 className="h2">{t('k.ctaTitle')}</h2><p className="muted" style={{ margin: '1rem 0 0', maxWidth: '34rem' }}>{t('contact.intro')}</p>
          <div className="btns"><Magnetic to="/appointment" fill>{t('hero.book')}</Magnetic><Magnetic href={SITE.phoneHref}>{t('contact.call')}</Magnetic></div>
        </Reveal>
      </section>
    </Page>
  );
}
