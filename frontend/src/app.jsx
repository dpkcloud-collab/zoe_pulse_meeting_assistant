import { useState, useEffect } from 'react';
import { getTranslation } from './translations';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ArchitectureSection from './components/ArchitectureSection';
import FeaturesSection from './components/FeaturesSection';
import UseCasesSection from './components/UseCasesSection';
import SecuritySection from './components/SecuritySection';
import Footer from './components/Footer';

function App() {
  const [lang, setLang] = useState('en');
  const t = getTranslation(lang);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  return (
    <div className="min-h-screen bg-zoe-deep-navy text-white overflow-x-hidden">
      <Navbar lang={lang} setLang={setLang} t={t} />
      <main>
        <HeroSection t={t} />
        <ArchitectureSection t={t} />
        <FeaturesSection t={t} />
        <UseCasesSection t={t} />
        <SecuritySection t={t} />
      </main>
      <Footer t={t} />
    </div>
  );
}

export default App;
