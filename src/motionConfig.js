// One shared timing/easing source so every section moves the same way.
export const ease = [0.25, 0.1, 0.25, 1];
export const dur = { fast: 0.25, base: 0.5, slow: 1.1 };
export const spring = { type: 'spring', stiffness: 260, damping: 28 };
export const viewport = { once: true, amount: 0.3 };

export const fadeUp = (reduce) => ({
  hidden: { opacity: 0, y: reduce ? 0 : 12 },
  show: { opacity: 1, y: 0, transition: { duration: dur.base, ease } },
});
export const stagger = { hidden: {}, show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } } };
export const pageVariants = (reduce) => ({
  initial: { opacity: 0, y: reduce ? 0 : 12 },
  animate: { opacity: 1, y: 0, transition: { duration: dur.base, ease } },
  exit: { opacity: 0, transition: { duration: dur.fast } },
});
export const press = {};
