import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import Page from '../components/Page';
import { SITE } from '../data/site';

// No mail server exists, so the form prepares the message to copy or to read out when calling the clinic.
export default function Contact() {
  const { t } = useTranslation();
  const [f, setF] = useState({ name: '', phone: '', message: '' });
  const [done, setDone] = useState(false);
  const [copied, setCopied] = useState(false);
  const text = `${t('brand')}\n${t('appt.name')}: ${f.name}\n${t('appt.phone')}: ${f.phone}\n${f.message}`;
  const copy = async () => { try { await navigator.clipboard.writeText(text); setCopied(true); } catch (e) { /* clipboard unavailable */ } };
  const set = (k) => (e) => setF({ ...f, [k]: e.target.value });

  return (
    <Page title={t('nav.contact')} description={t('contact.intro')}>
      <section className="section">
        <div className="max-w-[560px]">
          <h1 className="heading">{t('contact.title')}</h1>
          <p className="mt-6 text-ink-500">{t('contact.intro')}</p>
          {!done ? (
            <form className="mt-12 space-y-8" onSubmit={(e) => { e.preventDefault(); setDone(true); }}>
              <label className="block text-sm text-ink-500">{t('appt.name')}<input className="field text-base" value={f.name} onChange={set('name')} autoComplete="name" required /></label>
              <label className="block text-sm text-ink-500">{t('appt.phone')}<input dir="ltr" type="tel" className="field text-start text-base" value={f.phone} onChange={set('phone')} autoComplete="tel" required /></label>
              <label className="block text-sm text-ink-500">{t('form.message')}<textarea rows={4} className="field min-h-[120px] text-base" value={f.message} onChange={set('message')} required /></label>
              <button type="submit" className="btn-primary">{t('form.send')}</button>
            </form>
          ) : (
            <div className="mt-12">
              <p className="text-ink-500">{t('form.done')}</p>
              <pre className="mt-6 whitespace-pre-wrap border border-sage-200 bg-sage-100 p-4 font-sans">{text}</pre>
              <div className="mt-6 flex flex-wrap gap-3"><a href={SITE.phoneHref} className="btn-primary">{t('appt.call')}</a><button type="button" onClick={copy} className="btn-secondary">{copied ? t('appt.copied') : t('appt.copy')}</button></div>
            </div>
          )}
          <section className="mt-16 border-t border-sage-200 pt-8" aria-labelledby="clinic-map-title">
            <h2 id="clinic-map-title" className="text-xl font-medium">{t('contact.mapTitle', 'Clinic location')}</h2>
            <p className="mt-2 text-sm text-ink-500">{t('contact.mapNotice', 'The exact clinic address has not yet been verified. This map shows Kabul city only, not a confirmed clinic pin.')}</p>
            <div className="mt-5 overflow-hidden rounded-2xl border border-sage-200 bg-sage-100">
              <iframe
                title={t('contact.mapTitle', 'Map of Kabul, Afghanistan')}
                src="https://www.google.com/maps?q=Kabul%2C%20Afghanistan&output=embed"
                className="block h-[280px] w-full sm:h-[360px]"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </div>
            <a className="btn-secondary mt-4" href="https://www.google.com/maps/search/?api=1&query=Kabul%2C%20Afghanistan" target="_blank" rel="noopener noreferrer">{t('contact.mapDirections', 'Open Kabul in Google Maps')}</a>
          </section>
          <ul className="mt-10 space-y-3 border-t border-sage-200 pt-8">
            <li><span className="text-ink-500">{t('contact.phoneLabel')}: </span><a dir="ltr" href={SITE.phoneHref} className="link">{SITE.phoneDisplay}</a></li>
            <li><span className="text-ink-500">{t('contact.addressLabel')}: </span><a href={SITE.mapsHref} target="_blank" rel="noopener noreferrer" className="link">{t('contact.address')}</a></li>
            <li><span className="text-ink-500">Facebook: </span><a href={SITE.facebookHref} target="_blank" rel="noopener noreferrer" className="link">{t('contact.facebookText')}</a></li>
          </ul>
        </div>
      </section>
    </Page>
  );
}
