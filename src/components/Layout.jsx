import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Brain, Moon, Sun } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import LangMenu from './LangMenu';
import ChatWidget from './ChatWidget';
import { NAV, SITE } from '../data/site';

function useTheme() {
  const [dark, setDark] = useState(() => document.documentElement.dataset.theme === 'dark');
  const toggle = () => setDark((d) => { const n = !d; document.documentElement.dataset.theme = n ? 'dark' : 'light'; try { localStorage.setItem('theme', n ? 'dark' : 'light'); } catch (e) { /* storage unavailable */ } document.querySelector('meta[name="theme-color"]')?.setAttribute('content', n ? '#081119' : '#F6F8FA'); return n; });
  return [dark, toggle];
}

// One shared header + footer on every route.
export default function Layout({ children }) {
  const { t } = useTranslation();
  const { pathname } = useLocation();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [dark, toggle] = useTheme();
  useEffect(() => { setOpen(false); }, [pathname]);
  useEffect(() => { const f = () => setScrolled(window.scrollY > 12); f(); window.addEventListener('scroll', f, { passive: true }); return () => window.removeEventListener('scroll', f); }, []);
  const label = dark ? t('theme.toLight') : t('theme.toDark');
  const year = new Date().getFullYear();

  return (
    <>
      <a href="#main" className="sr">{t('nav.skip')}</a>
      <header className={`hdr${scrolled ? ' scrolled' : ''}${open ? ' menu' : ''}`}>
        <div className="wrap hdr-in">
          <Link to="/" className="brand"><Brain size={34} strokeWidth={1.2} aria-hidden="true" style={{ color: 'var(--accent)' }} /><span><b>{t('brand')}</b><small>{t('m.role')}</small></span></Link>
          <nav className="dnav" aria-label={t('nav.primary')}>
            {NAV.map((n) => (<NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => (isActive ? 'active' : '')}>{({ isActive }) => (<>{t(`nav.${n.key}`)}{isActive && <motion.span layoutId="nav-ul" className="ul" />}</>)}</NavLink>))}
          </nav>
          <div className="acts">
            <LangMenu />
            <button type="button" className="pill round" onClick={toggle} aria-label={label} title={label}>{dark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}</button>
            <Link to="/appointment" className="btn fill book">{t('nav.book')}</Link>
            <button type="button" className="pill round burger" aria-expanded={open} aria-controls="mpanel" aria-label={open ? t('nav.close') : t('nav.menu')} onClick={() => setOpen(!open)}>{open ? '✕' : '☰'}</button>
          </div>
        </div>
        {open && (
          <div id="mpanel" className="mpanel"><div className="wrap"><nav aria-label={t('nav.primary')}>
            {NAV.map((n) => (<NavLink key={n.to} to={n.to} end={n.end} className={({ isActive }) => `l${isActive ? ' active' : ''}`}>{t(`nav.${n.key}`)}</NavLink>))}
            <div style={{ padding: '1rem 0' }}><Link to="/appointment" className="btn fill">{t('nav.book')}</Link></div>
          </nav></div></div>
        )}
      </header>
      <main id="main">{children}</main>
      <footer className="ftr">
        <div className="wrap ftr-grid">
          <div><p className="brand" style={{ fontSize: '1.1rem' }}><Brain size={26} strokeWidth={1.2} aria-hidden="true" style={{ color: 'var(--accent)' }} />{t('brand')}</p><p className="muted" style={{ marginTop: '.8rem', maxWidth: '24rem', fontSize: '.9rem' }}>{t('footer.disclaimer')}</p></div>
          <nav aria-label={t('footer.quick')}><h4>{t('footer.quick')}</h4><ul>{NAV.map((n) => (<li key={n.to}><Link to={n.to} className="link">{t(`nav.${n.key}`)}</Link></li>))}</ul></nav>
          <div><h4>{t('contact.title')}</h4><ul>
            <li><a dir="ltr" href={SITE.phoneHref} className="link">{SITE.phoneDisplay}</a></li>
            <li><a href={SITE.mapsHref} target="_blank" rel="noopener noreferrer" className="link">{t('contact.directions')}</a></li>
            <li><a href={SITE.facebookHref} target="_blank" rel="noopener noreferrer" className="link">Facebook</a></li></ul></div>
        </div>
        <div className="wrap" style={{ borderTop: '1px solid var(--line)', padding: '1.2rem 1.5rem', fontSize: '.85rem' }}><span className="muted">© {year} {t('brand')}. {t('footer.rights')}</span></div>
      </footer>
      <ChatWidget />
    </>
  );
}
