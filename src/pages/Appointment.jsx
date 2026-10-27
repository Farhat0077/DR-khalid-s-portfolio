import { useMemo, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import Page from '../components/Page';
import Reveal from '../components/Reveal';
import { SITE } from '../data/site';
import { dur, ease } from '../motionConfig';

const PARTS = ['morning', 'afternoon', 'evening'];

// Front-end request flow. There is no backend: it never claims a slot is free or booked,
// and the clinic confirms by phone. Details are not asked before the time step.
export default function Appointment() {
  const { t, i18n } = useTranslation();
  const reduce = useReducedMotion();
  const [step, setStep] = useState(0);
  const [reason, setReason] = useState('');
  const [day, setDay] = useState('');
  const [part, setPart] = useState('');
  const [form, setForm] = useState({ name: '', phone: '', notes: '' });
  const [copied, setCopied] = useState(false);

  const days = useMemo(() => {
    const fmt = new Intl.DateTimeFormat(i18n.language === 'en' ? 'en' : i18n.language, { weekday: 'long' });
    return Array.from({ length: 7 }, (_, i) => { const d = new Date(); d.setDate(d.getDate() + i + 1); return fmt.format(d); });
  }, [i18n.language]);
  const reasons = [...t('specs.items').map((s) => s.title), t('appt.other')];
  const when = `${day}, ${part && t(`appt.parts.${part}`)}`;
  const summary = `${t('brand')}\n${t('appt.reason')}: ${reason}\n${t('appt.when')}: ${when}\n${t('appt.name')}: ${form.name}\n${t('appt.phone')}: ${form.phone}${form.notes ? `\n${form.notes}` : ''}`;
  const canNext = [!!reason, !!day && !!part, form.name.trim() && form.phone.trim()][step];

  const choice = (active) => `w-full  border px-4 py-3 text-start ${active ? 'border-ink-900 bg-sage-100 text-ink-900' : 'border-sage-400 bg-surface'}`;
  const slide = { initial: { opacity: 0, x: reduce ? 0 : 16 }, animate: { opacity: 1, x: 0, transition: { duration: dur.fast, ease } }, exit: { opacity: 0, transition: { duration: 0.15 } } };

  const copy = async () => { try { await navigator.clipboard.writeText(summary); setCopied(true); } catch (e) { /* clipboard unavailable */ } };

  return (
    <Page title={t('nav.appointment')} description={t('appt.intro')}>
      <section className="section max-w-3xl">
        <Reveal>
          <h1 className="heading">{t('appt.title')}</h1>
          <p className="mt-5 text-lg">{t('appt.intro')}</p>
          <p className="mt-3">{t('appt.how')}</p>
        </Reveal>

        <div className="card mt-10  p-6 sm:p-10">
          <ol className="mb-8 flex gap-2 text-xs" aria-label="Progress">
            {t('appt.steps').map((s, i) => (<li key={s} aria-current={i === step ? 'step' : undefined} className={`flex-1 border-t-2 pt-2 ${i <= step ? 'border-ink-900 text-ink-900' : 'border-sage-200'}`}>{s}</li>))}
          </ol>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={step} {...slide}>
              {step === 0 && (
                <fieldset><legend className=" text-2xl text-ink-900">{t('appt.stepReason')}</legend>
                  <div className="mt-5 space-y-3">{reasons.map((r) => (<button type="button" key={r} aria-pressed={reason === r} onClick={() => setReason(r)} className={choice(reason === r)}>{r}</button>))}</div></fieldset>
              )}
              {step === 1 && (
                <div><h2 className=" text-2xl text-ink-900">{t('appt.stepTime')}</h2><p className="mt-1 text-sm">{t('appt.timeNote')}</p>
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">{days.map((d) => (<button type="button" key={d} aria-pressed={day === d} onClick={() => setDay(d)} className={choice(day === d)}>{d}</button>))}</div>
                  <div className="mt-6 grid gap-3 sm:grid-cols-3">{PARTS.map((p) => (<button type="button" key={p} aria-pressed={part === p} onClick={() => setPart(p)} className={choice(part === p)}>{t(`appt.parts.${p}`)}</button>))}</div></div>
              )}
              {step === 2 && (
                <div><h2 className=" text-2xl text-ink-900">{t('appt.stepDetails')}</h2>
                  <label className="mt-5 block font-medium text-ink-900">{t('appt.name')}<input className="field" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} autoComplete="name" required /></label>
                  <label className="mt-4 block font-medium text-ink-900">{t('appt.phone')}<input dir="ltr" type="tel" className="field text-start" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} autoComplete="tel" required /></label>
                  <label className="mt-4 block font-medium text-ink-900">{t('appt.notes')}<textarea rows={3} className="field" value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} /></label></div>
              )}
              {step === 3 && (
                <div><h2 className=" text-2xl text-ink-900">{t('appt.doneTitle')}</h2><p className="mt-2">{t('appt.doneText')}</p>
                  <pre className="mt-5 whitespace-pre-wrap  bg-sage-100 p-4 font-sans text-ink-900">{summary}</pre>
                  <div className="mt-6 flex flex-wrap gap-3"><a href={SITE.phoneHref} className="btn-primary"><Phone size={16} aria-hidden="true" />{t('appt.call')} · <span dir="ltr">{SITE.phoneDisplay}</span></a>
                    <button type="button" onClick={copy} className="btn-secondary">{copied ? t('appt.copied') : t('appt.copy')}</button></div></div>
              )}
            </motion.div>
          </AnimatePresence>
          {step < 3 && (
            <div className="mt-10 flex justify-between gap-3">
              <button type="button" onClick={() => setStep(step - 1)} disabled={step === 0} className="btn-secondary disabled:invisible">{t('appt.back')}</button>
              <button type="button" onClick={() => setStep(step + 1)} disabled={!canNext} className="btn-primary disabled:opacity-40">{step === 2 ? t('appt.submit') : t('appt.next')}</button>
            </div>
          )}
        </div>

        <Reveal className="mt-14">
          <h2 className=" text-2xl text-ink-900">{t('appt.faqTitle')}</h2>
          <div className="mt-4 divide-y divide-sage-200 border-y border-sage-200">
            {t('chat.faq').filter((f) => f.id !== 'emergency').slice(0, 4).map((f) => (<Faq key={f.id} q={f.q} a={f.a} />))}
          </div>
        </Reveal>
      </section>
    </Page>
  );
}

function Faq({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button type="button" aria-expanded={open} onClick={() => setOpen(!open)} className="flex w-full items-center justify-between gap-4 py-4 text-start font-medium text-ink-900">{q}<span aria-hidden="true">{open ? '−' : '+'}</span></button>
      <AnimatePresence initial={false}>{open && (<motion.p initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pb-4">{a}</motion.p>)}</AnimatePresence>
    </div>
  );
}
