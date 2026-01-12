import React, { useState, useEffect, createContext, useContext } from 'react';
import { HashRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { getStore, saveStore } from './store';
import { Language, PersonaType } from './types';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Chatbot from './components/Chatbot';
import AudioPlayer from './components/AudioPlayer';

// Pages
import Home from './pages/Home';
import About from './pages/About';
import Services from './pages/Services';
import Facilities from './pages/Facilities';
import Programs from './pages/Programs';
import Team from './pages/Team';
import Contact from './pages/Contact';
import OnlineSessions from './pages/OnlineSessions';

// Admin
import AdminDashboard from './admin/AdminDashboard';

interface AppContextType {
  data: any;
  setData: (data: any) => void;
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string, obj?: any) => string;
}

export const AppContext = createContext<AppContextType | null>(null);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [data, setDataState] = useState(getStore());
  const [lang, setLang] = useState<Language>('en');

  const setData = (newData: any) => {
    setDataState(newData);
    saveStore(newData);
  };

  const t = (key: string, obj?: any) => {
    if (obj && obj[lang]) return obj[lang];
    // Simple static translations for UI
    const staticStrings: any = {
      home: { en: "Home", ar: "الرئيسية" },
      about: { en: "About Us", ar: "من نحن" },
      services: { en: "Services", ar: "خدماتنا" },
      facilities: { en: "Facilities", ar: "مرافقنا" },
      programs: { en: "Programs", ar: "البرامج" },
      team: { en: "Our Team", ar: "فريقنا" },
      contact: { en: "Contact", ar: "اتصل بنا" },
      online: { en: "Online Sessions", ar: "الجلسات الأونلاين" },
      admin: { en: "Admin", ar: "لوحة التحكم" },
      book: { en: "Book Appointment", ar: "احجز موعد" },
      call: { en: "Call Us", ar: "اتصل بنا" },
      emergency: { en: "Emergency Call", ar: "اتصال طوارئ" },
      readMore: { en: "Read More", ar: "اقرأ المزيد" },
    };
    return staticStrings[key] ? staticStrings[key][lang] : key;
  };

  return (
    <AppContext.Provider value={{ data, setData, lang, setLang, t }}>
      <div className={lang === 'ar' ? 'rtl' : ''}>
        {children}
      </div>
    </AppContext.Provider>
  );
};

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {!isAdmin && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      {!isAdmin && <Footer />}
      {!isAdmin && <Chatbot />}
      {!isAdmin && <AudioPlayer />}
    </div>
  );
};

const App: React.FC = () => {
  return (
    <AppProvider>
      <HashRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/services" element={<Services />} />
            <Route path="/facilities" element={<Facilities />} />
            <Route path="/programs" element={<Programs />} />
            <Route path="/team" element={<Team />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/online-sessions" element={<OnlineSessions />} />
            <Route path="/admin/*" element={<AdminDashboard />} />
          </Routes>
        </Layout>
      </HashRouter>
    </AppProvider>
  );
};

export default App;