
import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../App';
import { simulatedAuth } from '../auth';

// Admin Sections
import OnlineSessionsManager from './sections/OnlineSessionsManager';
import ContentEditor from './sections/ContentEditor';
import ServicesManager from './sections/ServicesManager';
import FacilitiesManager from './sections/FacilitiesManager';
import ProgramsManager from './sections/ProgramsManager';
import TeamManager from './sections/TeamManager';
import TeamReporting from './sections/TeamReporting';
import UniversalCalendar from './sections/UniversalCalendar';
import ChatSettings from './sections/ChatSettings';
import AppointmentList from './sections/AppointmentList';
import ContactRequestList from './sections/ContactRequestList';
import Subscriptions from './sections/Subscriptions';
import SuggestionList from './sections/SuggestionList';
import MusicManager from './sections/MusicManager';

const AdminDashboard: React.FC = () => {
  const { lang, setLang } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [isAuthenticated, setIsAuthenticated] = useState(simulatedAuth.isAuthenticated());
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    const success = await simulatedAuth.login(email, password);
    if (success) {
      setIsAuthenticated(true);
    } else {
      setError('Invalid credentials. Access Denied.');
    }
    setLoading(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-6">
        <div className="w-full max-w-md animate-in fade-in zoom-in duration-500">
          <div className="bg-white rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="bg-emerald-600 p-10 text-white text-center">
              <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4 text-2xl shadow-xl border border-white/10">🔐</div>
              <h2 className="text-2xl font-black tracking-tight uppercase">Admin Gateway</h2>
              <p className="text-emerald-100 text-[10px] font-bold uppercase tracking-[0.2em] mt-2 opacity-80">Hospital Management System</p>
            </div>
            <form onSubmit={handleLogin} className="p-10 space-y-6">
              {error && (
                <div className="bg-red-50 text-red-500 p-4 rounded-xl text-xs font-bold text-center border border-red-100 animate-pulse">
                  {error}
                </div>
              )}
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Admin Identity</label>
                <input 
                  type="email" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="admin@serenitypath.com"
                  required 
                />
              </div>
              <div>
                <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 ml-1">Security Key</label>
                <input 
                  type="password" 
                  value={password} 
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
                  placeholder="••••••••"
                  required 
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full bg-slate-900 hover:bg-emerald-600 text-white font-black py-5 rounded-2xl transition-all shadow-xl active:scale-95 uppercase tracking-widest text-xs disabled:opacity-50"
              >
                {loading ? 'Authenticating...' : 'Establish Connection'}
              </button>
              <button 
                type="button"
                onClick={() => navigate('/')}
                className="w-full text-[10px] font-black text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors pt-2"
              >
                Return to Public Site
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  const menuItems = [
    { label: 'Online Sessions Hub', path: '/admin/online-sessions', icon: '📡' },
    { label: 'General Content', path: '/admin', icon: '📝' },
    { label: 'Services Catalog', path: '/admin/services', icon: '🧠' },
    { label: 'Clinical Facilities', path: '/admin/facilities', icon: '🏢' },
    { label: 'Programs Hub', path: '/admin/programs', icon: '📅' },
    { label: 'Staff Directory', path: '/admin/team', icon: '👥' },
    { label: 'Internal Reporting', path: '/admin/reporting', icon: '📋' },
    { label: 'Master Calendar', path: '/admin/calendar', icon: '🗓️' },
    { label: 'AI Chat Logic', path: '/admin/chat', icon: '💬' },
    { label: 'Patient Appointments', path: '/admin/appointments', icon: '📅' },
    { label: 'Callback Inbox', path: '/admin/callback-requests', icon: '📞' },
    { label: 'Mailing List', path: '/admin/subscriptions', icon: '📧' },
    { label: 'User Feedback', path: '/admin/suggestions', icon: '💡' },
    { label: 'Ambient Music', path: '/admin/music', icon: '🎵' },
  ];

  return (
    <div className="flex h-screen bg-slate-100 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-72 bg-slate-900 text-white flex flex-col flex-shrink-0 shadow-2xl z-50">
        <div className="p-8 border-b border-slate-800">
          <h2 className="text-2xl font-black flex items-center gap-3 tracking-tighter">
            <span className="w-10 h-10 bg-emerald-500 rounded-2xl flex items-center justify-center text-lg shadow-lg shadow-emerald-500/20">S</span>
            Admin <span className="text-slate-500">Path</span>
          </h2>
        </div>
        <nav className="flex-grow p-6 space-y-1 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`flex items-center gap-4 p-3.5 rounded-2xl transition-all duration-300 group ${
                location.pathname === item.path 
                  ? 'bg-emerald-600 shadow-lg shadow-emerald-600/20 translate-x-1' 
                  : 'hover:bg-slate-800 hover:translate-x-1'
              }`}
            >
              <span className="text-xl group-hover:scale-110 transition-transform">{item.icon}</span>
              <span className="font-bold text-[10px] tracking-widest uppercase">{item.label}</span>
            </Link>
          ))}
        </nav>
        <div className="p-8 border-t border-slate-800 space-y-4">
          <button 
            onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
            className="w-full text-[10px] font-black bg-slate-800 py-3 rounded-xl hover:bg-slate-700 transition-colors uppercase tracking-widest border border-slate-700"
          >
            Switch to {lang === 'en' ? 'Arabic' : 'English'}
          </button>
          <button onClick={() => simulatedAuth.logout()} className="w-full text-[10px] font-bold text-slate-500 hover:text-white transition-colors uppercase tracking-tighter">
            Logout & Exit
          </button>
        </div>
      </aside>

      {/* Main Area */}
      <main className="flex-grow overflow-y-auto bg-slate-100 p-6 md:p-12">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.05)] min-h-[85vh] p-8 md:p-12 border border-white">
            <Routes>
              <Route path="/online-sessions" element={<OnlineSessionsManager />} />
              <Route path="/" element={<ContentEditor />} />
              <Route path="/services" element={<ServicesManager />} />
              <Route path="/facilities" element={<FacilitiesManager />} />
              <Route path="/programs" element={<ProgramsManager />} />
              <Route path="/team" element={<TeamManager />} />
              <Route path="/reporting" element={<TeamReporting />} />
              <Route path="/calendar" element={<UniversalCalendar />} />
              <Route path="/chat" element={<ChatSettings />} />
              <Route path="/appointments" element={<AppointmentList />} />
              <Route path="/callback-requests" element={<ContactRequestList />} />
              <Route path="/subscriptions" element={<Subscriptions />} />
              <Route path="/suggestions" element={<SuggestionList />} />
              <Route path="/music" element={<MusicManager />} />
            </Routes>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
