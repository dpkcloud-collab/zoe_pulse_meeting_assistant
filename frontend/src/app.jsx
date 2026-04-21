import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { getTranslation } from './translations';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import ArchitectureSection from './components/ArchitectureSection';
import FeaturesSection from './components/FeaturesSection';
import UseCasesSection from './components/UseCasesSection';
import SecuritySection from './components/SecuritySection';
import Footer from './components/Footer';
import DashboardLayout from './components/dashboard/DashboardLayout';
import OverviewPage from './components/dashboard/OverviewPage';
import LiveTranscriptionPage from './components/dashboard/LiveTranscriptionPage';
import SmartSummaryPage from './components/dashboard/SmartSummaryPage';
import ActionItemsPage from './components/dashboard/ActionItemsPage';
import SentimentPage from './components/dashboard/SentimentPage';
import SpeakerAnalyticsPage from './components/dashboard/SpeakerAnalyticsPage';
import InsightsPage from './components/dashboard/InsightsPage';
import CalendarPage from './components/dashboard/CalendarPage';
import RecordingsPage from './components/dashboard/RecordingsPage';
import SettingsPage from './components/dashboard/SettingsPage';

function LandingPage({ lang, setLang, t }) {
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

function App() {
  const [lang, setLang] = useState('en');
  const t = getTranslation(lang);

  useEffect(() => {
    document.documentElement.dir = t.dir;
    document.documentElement.lang = lang;
  }, [lang, t.dir]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage lang={lang} setLang={setLang} t={t} />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route index element={<OverviewPage />} />
          <Route path="live-transcription" element={<LiveTranscriptionPage />} />
          <Route path="smart-summary" element={<SmartSummaryPage />} />
          <Route path="action-items" element={<ActionItemsPage />} />
          <Route path="sentiment" element={<SentimentPage />} />
          <Route path="speaker-analytics" element={<SpeakerAnalyticsPage />} />
          <Route path="insights" element={<InsightsPage />} />
          <Route path="calendar" element={<CalendarPage />} />
          <Route path="recordings" element={<RecordingsPage />} />
          <Route path="settings" element={<SettingsPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
