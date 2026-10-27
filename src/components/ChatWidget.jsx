import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Bot, MessageCircle, Send, X } from 'lucide-react';
import { useTranslation } from 'react-i18next';

// Simple keyword-based FAQ bot. It only returns answers written in the locale files,
// so it never invents hours, fees or medical advice.
function findAnswer(text, faq) {
  const input = text.toLowerCase();
  let best = null;
  let bestScore = 0;
  faq.forEach((entry) => {
    const score = entry.k.reduce((n, kw) => (input.includes(kw.toLowerCase()) ? n + 1 : n), 0);
    if (score > bestScore) {
      best = entry;
      bestScore = score;
    }
  });
  return best;
}

export default function ChatWidget() {
  const { t, i18n } = useTranslation();
  const faq = t('chat.faq');
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([]); // { from: 'bot' | 'user', text }
  const [draft, setDraft] = useState('');
  const endRef = useRef(null);

  // Reset the conversation when the language changes so replies stay in the right language.
  useEffect(() => {
    setMessages([{ from: 'bot', text: t('chat.greeting') }]);
  }, [i18n.language, t]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ block: 'end' });
  }, [messages, open]);

  const ask = (question, answer) => {
    setMessages((m) => [...m, { from: 'user', text: question }, { from: 'bot', text: answer }]);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const text = draft.trim();
    if (!text) return;
    const match = findAnswer(text, faq);
    ask(text, match ? match.a : t('chat.fallback'));
    setDraft('');
  };

  return (
    <div className="fixed bottom-4 end-4 z-50 flex flex-col items-end gap-3">
      <AnimatePresence>
        {open && (
          <motion.div
            role="dialog"
            aria-label={t('chat.title')}
            className="flex h-[32rem] max-h-[75vh] w-[calc(100vw-2rem)] max-w-sm flex-col overflow-hidden  border border-sage-200 bg-surface "
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center gap-3 bg-ink-900 px-4 py-3 text-paper">
              <Bot size={22} aria-hidden="true" />
              <div className="flex-1">
                <p className="text-sm font-semibold">{t('chat.title')}</p>
                <p className="text-xs text-sage-200">{t('chat.subtitle')}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpen(false)}
                aria-label={t('chat.close')}
                className=" p-1 hover:bg-surface/20"
              >
                <X size={18} aria-hidden="true" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4" aria-live="polite">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <p
                    className={`max-w-[85%]  px-3.5 py-2 text-sm ${
                      m.from === 'user'
                        ? 'bg-ink-900 text-paper'
                        : 'bg-sage-100 text-ink-900'
                    }`}
                  >
                    {m.text}
                  </p>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="flex gap-2 overflow-x-auto border-t border-sage-200 px-3 py-2">
              {faq.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => ask(f.q, f.a)}
                  className="shrink-0  border border-sage-400 px-3 py-1 text-xs font-medium text-sage-700 hover:bg-sage-100"
                >
                  {f.q}
                </button>
              ))}
            </div>

            <form onSubmit={onSubmit} className="flex gap-2 border-t border-sage-200 p-3">
              <label htmlFor="chat-input" className="sr-only">
                {t('chat.placeholder')}
              </label>
              <input
                id="chat-input"
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                placeholder={t('chat.placeholder')}
                className="flex-1  border border-sage-400 bg-surface px-4 py-2 text-sm text-ink-900 placeholder:text-ink-500"
              />
              <button
                type="submit"
                aria-label={t('chat.send')}
                className="flex h-10 w-10 items-center justify-center  bg-ink-900 text-paper hover:bg-[#333333]"
              >
                <Send size={16} aria-hidden="true" className="rtl:-scale-x-100" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-label={open ? t('chat.close') : t('chat.open')}
        className="flex h-14 w-14 items-center justify-center  bg-ink-900 text-paper  hover:bg-[#333333]"
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.95 }}
      >
        {open ? <X size={24} aria-hidden="true" /> : <MessageCircle size={24} aria-hidden="true" />}
      </motion.button>
    </div>
  );
}
