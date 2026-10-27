# Dr. Khalid Khan Zadran — Portfolio (v7)

Built from the supplied hero design: light airy theme, top navbar (language menu, theme toggle, Book Appointment), hero with the doctor's photo, animated SVG brain network, glass card, and a services row.

React + Vite + Tailwind (colour tokens) + Framer Motion + React Router.
```bash
npm install
npm run dev
npm run build
```
Pages: Home, About, Services (+ detail pages), Education, FAQ, Appointment, Contact, 404. English / Dari / Pashto with RTL, FAQ chat assistant, light/dark (saved).

- Tokens: top of `src/index.css`. Routes: `src/App.jsx`. Nav + services: `src/data/site.js`. Text: `src/i18n/locales/*.js`.
- New strings (`m.*`, `svc.*`, `k.*`, `appt.*`, `form.*`, `nf.*`, new `nav.*`) are English only; Dari/Pashto fall back to English until a native speaker translates them.
- The brain, spine, neurovascular and nerve visuals are generated SVG. Swap `ServiceArt` for real images if you have licensed ones.
- Replace the Facebook link in `src/data/site.js` with the official page. SPA hosting needs a rewrite of all paths to `index.html`.
