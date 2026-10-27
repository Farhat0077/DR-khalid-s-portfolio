/** @type {import('tailwindcss').Config} */
// Colours come from CSS variables (index.css) so the light/dark toggle themes every component.
const v = (n) => `rgb(var(--c-${n}) / <alpha-value>)`;
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        paper: v('bg'), surface: v('card'), accent: v('accent'),
        sage: { 100: v('soft'), 200: v('line'), 400: v('line'), 500: v('muted'), 700: v('accent') },
        ink: { 900: v('fg'), 600: v('fg'), 500: v('muted') },
      },
      fontFamily: { sans: ['Outfit', 'ui-sans-serif', 'system-ui', 'sans-serif'], arabic: ['"Noto Sans Arabic"', 'Tahoma', 'sans-serif'] },
    },
  },
  plugins: [],
};
