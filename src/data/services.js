// Returns { title, text } for a service in the active language.
export const serviceInfo = (t, s) => (s.key ? { title: t(`svc.${s.key}.title`), text: t(`svc.${s.key}.text`) } : t('specs.items')[s.index]);
