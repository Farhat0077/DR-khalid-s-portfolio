import { useEffect, useState } from 'react';
import { AnimatePresence, MotionConfig, motion } from 'framer-motion';
import { Route, Routes, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import ServiceDetail from './pages/ServiceDetail';
import Education from './pages/Education';
import FaqPage from './pages/FAQ';
import Appointment from './pages/Appointment';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';

export default function App() {
  const location = useLocation();
  const { t } = useTranslation();
  const [loading, setLoading] = useState(true);
  useEffect(() => { const id = setTimeout(() => setLoading(false), 900); return () => clearTimeout(id); }, []);
  return (
    <MotionConfig reducedMotion="user">
      <AnimatePresence>
        {loading && (
          <motion.div key="splash" className="splash" role="status" aria-label="Loading" exit={{ opacity: 0, transition: { duration: 0.5 } }}>
            <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} style={{ fontSize: 'var(--fs-h2)', textAlign: 'center', padding: '0 1rem', fontWeight: 300 }}>{t('brand')}</motion.span>
          </motion.div>
        )}
      </AnimatePresence>
      <Layout>
        <AnimatePresence mode="wait" initial={false}>
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/education" element={<Education />} />
            <Route path="/faq" element={<FaqPage />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />
            <Route path="/appointment" element={<Appointment />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AnimatePresence>
      </Layout>
    </MotionConfig>
  );
}
