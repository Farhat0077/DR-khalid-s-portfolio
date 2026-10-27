import { useTranslation } from 'react-i18next';
import Page from '../components/Page';
import Reveal from '../components/Reveal';
import { Item, Stagger } from '../components/ui';

export default function Education() {
  const { t } = useTranslation();
  return (
    <Page title={t('nav.education')} description={t('about.eduText')}>
      <Reveal><span className="eyebrow line">{t('m.eduTitle')}</span><h1 className="heading" style={{ margin: '1.2rem 0 1.4rem' }}>{t('about.eduTitle')}</h1><p className="lead">{t('about.eduText')}</p></Reveal>
      <section style={{ marginTop: '4.5rem' }}><h2 className="h2" style={{ marginBottom: '1.5rem' }}>{t('exp.title')}</h2>
        <Stagger>{t('exp.items').map((it, i) => (<Item key={it.title} className="row"><span className="n">{String(i + 1).padStart(2, '0')}</span><h3>{it.title}</h3><p className="muted">{it.text}</p></Item>))}</Stagger></section>
      <section style={{ marginTop: '4.5rem' }}><h2 className="h2" style={{ marginBottom: '1.5rem' }}>{t('about.memTitle')}</h2>
        <Stagger>{t('about.memberships').map((m, i) => (<Item key={m.abbr} className="row"><span className="n">{m.abbr}</span><h3 style={{ fontSize: '1.05rem' }}>{m.name}</h3><span /></Item>))}</Stagger></section>
    </Page>
  );
}
