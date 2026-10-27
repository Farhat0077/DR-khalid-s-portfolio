// Shared motion language: one easing, one duration scale.
export const ease = [0.22, 1, 0.36, 1];
export const fade = (r) => ({ hidden: { opacity: 0, y: r ? 0 : 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.7, ease } } });
export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
export const vp = { once: true, amount: 0.25 };
