import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import Page from '../components/Page';
import Reveal from '../components/Reveal';
import Faq from '../components/Faq';

export default function FaqPage() {
  const { t } = useTranslation();
  return (
    <Page title={t('nav.faq')} description={t('m.faqTitle')}>
      <Reveal><span className="eyebrow line">{t('nav.faq')}</span><h1 className="heading" style={{ margin: '1.2rem 0 2.5rem' }}>{t('m.faqTitle')}</h1></Reveal>
      <div style={{ maxWidth: '52rem' }}>{t('chat.faq').map((f) => <Faq key={f.id} q={f.q} a={f.a} />)}</div>
      <div className="btns"><Link to="/appointment" className="btn fill">{t('hero.book')}</Link><Link to="/contact" className="btn">{t('hero.contact')}</Link></div>
    </Page>
  );
}
