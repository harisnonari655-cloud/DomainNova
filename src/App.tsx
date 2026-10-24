import React, { useState, useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { ToastProvider } from './components/Toast';
import { Home } from './pages/Home';
import { Directory } from './pages/Directory';
import { Checker } from './pages/Checker';
import { ProviderDetail } from './pages/ProviderDetail';
import { Compare } from './pages/Compare';
import { Guides } from './pages/Guides';
import { AiAdvisorPage } from './pages/AiAdvisorPage';
import { About } from './pages/About';
import { Privacy } from './pages/Privacy';
import { Terms } from './pages/Terms';
import { Contact } from './pages/Contact';
import { NotFound } from './pages/NotFound';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('domainnova_theme');
      if (saved === 'light' || saved === 'dark') return saved;
    }
    return 'dark';
  });

  useEffect(() => {
    const root = document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    localStorage.setItem('domainnova_theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ToastProvider>
      <ScrollToTop />
      <div className="flex flex-col min-h-screen bg-slate-950 text-slate-100 selection:bg-cyan-500 selection:text-slate-950 transition-colors">
        <Navbar theme={theme} onToggleTheme={toggleTheme} />
        
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/domains" element={<Directory />} />
            <Route path="/checker" element={<Checker />} />
            <Route path="/providers/:id" element={<ProviderDetail />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/guides" element={<Guides />} />
            <Route path="/guides/:id" element={<Guides />} />
            <Route path="/advisor" element={<AiAdvisorPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        <Footer />
      </div>
    </ToastProvider>
  );
}
