
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useApp } from '../App';

const Navbar: React.FC = () => {
  const { data, lang, setLang, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    { label: 'home', path: '/' },
    { label: 'about', path: '/about' },
    { label: 'services', path: '/services' },
    { label: 'facilities', path: '/facilities' },
    { label: 'online', path: '/online-sessions' },
    { label: 'programs', path: '/programs' },
    { label: 'team', path: '/team' },
    { label: 'contact', path: '/contact' },
  ];

  const hospitalName = t('', data.content.hospitalName) || 'Serenity Path';
  const tagline = t('', data.content.tagline) || 'Hospital Center';

  return (
    <nav className="bg-white shadow-sm border-b border-slate-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-3 group">
              <div className="relative">
                {data.content.logo ? (
                  <img src={data.content.logo} alt="Logo" className="w-12 h-12 object-contain rounded-xl shadow-sm group-hover:scale-105 transition-transform" />
                ) : (
                  <div className="w-12 h-12 bg-emerald-600 rounded-xl flex items-center justify-center text-white font-black text-2xl shadow-lg shadow-emerald-200 group-hover:scale-105 transition-transform">
                    {hospitalName[0]}
                  </div>
                )}
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-emerald-500 border-2 border-white rounded-full"></div>
              </div>
              <div className="flex flex-col">
                <span className="font-black text-2xl text-slate-900 tracking-tighter leading-none group-hover:text-emerald-600 transition-colors">
                  {hospitalName}
                </span>
                <span className="text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] leading-none mt-1.5">
                  {tagline}
                </span>
              </div>
            </Link>
          </div>

          <div className="hidden md:flex items-center space-x-4 lg:space-x-6 rtl:space-x-reverse">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`text-sm font-bold transition-all relative py-2 ${
                  location.pathname === item.path 
                    ? 'text-emerald-600' 
                    : 'text-slate-500 hover:text-emerald-500'
                }`}
              >
                {t(item.label)}
                {location.pathname === item.path && (
                  <span className="absolute bottom-0 left-0 w-full h-0.5 bg-emerald-600 rounded-full animate-in fade-in zoom-in duration-300"></span>
                )}
              </Link>
            ))}
            
            <button
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="bg-emerald-600 text-white px-4 py-2 rounded-xl text-xs font-black hover:bg-emerald-700 transition-all uppercase tracking-widest shadow-md shadow-emerald-100 active:scale-95 flex items-center gap-2"
            >
              {lang === 'en' ? 'Arabic' : 'English'}
            </button>

            <Link
              to="/admin"
              className="w-10 h-10 bg-slate-100 rounded-xl flex items-center justify-center text-slate-500 hover:text-emerald-600 hover:bg-emerald-50 transition-all border border-slate-200"
              title="Admin Panel"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
              </svg>
            </Link>
          </div>

          <div className="md:hidden flex items-center gap-2">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600 p-2 hover:bg-slate-50 rounded-lg transition-colors">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"/></svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-white border-t py-6 px-6 space-y-4 animate-in fade-in slide-in-from-top-4">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              onClick={() => setIsOpen(false)}
              className={`block text-lg font-bold ${location.pathname === item.path ? 'text-emerald-600' : 'text-slate-600 hover:text-emerald-600'}`}
            >
              {t(item.label)}
            </Link>
          ))}
          <div className="pt-4 border-t border-slate-100 flex flex-col gap-4">
            <Link to="/admin" onClick={() => setIsOpen(false)} className="block py-2 text-slate-400 font-bold uppercase tracking-widest text-xs">Admin Panel</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
