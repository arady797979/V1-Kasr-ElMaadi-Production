
import React, { useState, useRef, useEffect } from 'react';
import { useApp } from '../App';
import { getChatResponse } from '../geminiService';
import { PersonaType, ChatMessage } from '../types';

const Chatbot: React.FC = () => {
  const { data, lang, t } = useApp();
  const [isOpen, setIsOpen] = useState(false);
  const [persona, setPersona] = useState<PersonaType | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const config = data.chatConfig;

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !persona) return;

    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', parts: userMsg }]);
    
    if (persona === 'live') {
      setTimeout(() => {
        setMessages(prev => [...prev, { role: 'model', parts: lang === 'en' ? "Connecting you to a live specialist... Cleo is staying with you." : "جاري توصيلك بأخصائي مباشر... كليو ستبقى معك." }]);
      }, 1000);
      return;
    }

    setIsTyping(true);
    const history = messages;
    const response = await getChatResponse(
      persona,
      userMsg,
      history,
      config.prompts[persona],
      config.systemInstructions,
      { content: data.content, team: data.team, services: data.services }
    );

    setIsTyping(false);
    setMessages(prev => [...prev, { role: 'model', parts: response || "" }]);
  };

  const resetChat = () => {
    setPersona(null);
    setMessages([]);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 flex flex-col items-center gap-3">
        {!isOpen && (
           <div className="bg-white px-4 py-2 rounded-full shadow-lg border border-slate-100 animate-bounce duration-[2000ms] flex items-center gap-2">
             <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
             <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest">{t('', config.aiNote)}</span>
           </div>
        )}
        
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="w-16 h-16 bg-emerald-600 text-white rounded-full shadow-2xl flex items-center justify-center hover:bg-emerald-700 transition-transform hover:scale-110 relative"
        >
          {isOpen ? (
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"/></svg>
          ) : (
            <>
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg>
              <div className="absolute -top-1 -right-1 w-5 h-5 bg-blue-500 text-white text-[8px] font-bold rounded-full border-2 border-white flex items-center justify-center animate-pulse">!</div>
            </>
          )}
        </button>
      </div>

      {isOpen && (
        <div className={`fixed bottom-24 right-6 w-96 max-h-[600px] h-[80vh] bg-zinc-100 rounded-3xl shadow-[0_20px_60px_-15px_rgba(0,0,0,0.3)] z-50 flex flex-col overflow-hidden border border-zinc-200 animate-in slide-in-from-bottom-5 duration-300 ${lang === 'ar' ? 'rtl' : ''}`}>
          <div className="bg-emerald-600 p-5 text-white flex justify-between items-center shadow-md z-10">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center text-2xl shadow-inner border border-white/10">🤖</div>
              <div>
                <h3 className="font-black text-lg leading-none tracking-tight">Cleo</h3>
                <p className="text-[10px] text-emerald-100 uppercase font-bold tracking-widest mt-1.5 opacity-90">{lang === 'en' ? 'Clinical Assistant' : 'مساعدة سريرية'}</p>
              </div>
            </div>
            {persona && (
              <button onClick={resetChat} className="text-[10px] font-black uppercase tracking-widest bg-white/10 hover:bg-white/20 px-4 py-2 rounded-xl transition-all border border-white/10">
                {lang === 'en' ? 'Reset' : 'إعادة'}
              </button>
            )}
          </div>

          {!persona ? (
            <div className="flex-grow p-8 flex flex-col justify-center gap-5 bg-zinc-100">
              <div className="text-center mb-4">
                <h4 className="font-black text-slate-800 uppercase tracking-tighter text-base">
                  {lang === 'en' ? 'Welcome back. How is Cleo helping?' : 'أهلاً بك. كيف يمكن لكليو المساعدة؟'}
                </h4>
                <p className="text-xs text-slate-500 mt-2">{lang === 'en' ? 'Your journey to wellness is important.' : 'رحلتك إلى العافية مهمة.'}</p>
              </div>
              
              <button 
                onClick={() => setPersona('patient')}
                className="p-5 bg-white border border-zinc-200 rounded-2xl hover:bg-emerald-50 hover:border-emerald-200 transition-all text-left shadow-sm group active:scale-[0.98]"
              >
                <span className="block font-black text-emerald-700 uppercase text-xs tracking-widest mb-1.5">{lang === 'en' ? 'Patient Support' : 'دعم المريض'}</span>
                <span className="text-[11px] text-slate-600 font-medium leading-relaxed block">{lang === 'en' ? 'Empathy, recovery, and treatment guidance.' : 'التعاطف والتعافي وإرشادات العلاج.'}</span>
              </button>

              <button 
                onClick={() => setPersona('family')}
                className="p-5 bg-white border border-zinc-200 rounded-2xl hover:bg-emerald-50 hover:border-emerald-200 transition-all text-left shadow-sm group active:scale-[0.98]"
              >
                <span className="block font-black text-emerald-700 uppercase text-xs tracking-widest mb-1.5">{lang === 'en' ? 'Family & Care' : 'العائلة والرعاية'}</span>
                <span className="text-[11px] text-slate-600 font-medium leading-relaxed block">{lang === 'en' ? 'Supporting loved ones on their journey.' : 'دعم الأحباء في رحلتهم.'}</span>
              </button>
              
              {config.liveAgentEnabled && (
                <div className="mt-4 pt-6 border-t border-zinc-300">
                  <button 
                    onClick={() => setPersona('live')}
                    className="w-full p-5 bg-slate-900 text-white rounded-2xl hover:bg-emerald-600 transition-all text-left flex items-center justify-between group shadow-xl active:scale-[0.98]"
                  >
                    <div>
                      <span className="block font-black uppercase text-xs tracking-widest mb-1.5">{lang === 'en' ? 'Specialist Live Chat' : 'دردشة حية مع أخصائي'}</span>
                      <span className="text-[10px] text-slate-400 group-hover:text-emerald-100 font-bold uppercase tracking-wider">{t('', config.liveAgentStatus)}</span>
                    </div>
                    <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center text-xl">🎧</div>
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <div ref={scrollRef} className="flex-grow p-5 overflow-y-auto space-y-5 bg-zinc-100 custom-scrollbar">
                {messages.length === 0 && (
                  <div className="bg-white p-5 rounded-2xl text-xs text-slate-700 border border-zinc-200 font-medium shadow-sm leading-relaxed">
                    {persona === 'live' 
                      ? (lang === 'en' ? "Cleo is connecting you to our live clinical team. Please hold on..." : "كليو تقوم بتوصيلك بفريقنا السريري المباشر. يرجى الانتظار...")
                      : (lang === 'en' ? `Hello! I'm Cleo. I'm here to offer support, empathy, and hope. How are you feeling today?` : `أهلاً! أنا كليو. أنا هنا لأقدم لك الدعم والتعاطف والأمل. كيف تشعر اليوم؟`)}
                  </div>
                )}
                {messages.map((m, idx) => (
                  <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'} animate-in fade-in slide-in-from-bottom-2 duration-300`}>
                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${
                      m.role === 'user' 
                        ? 'bg-emerald-600 text-white rounded-br-none font-medium' 
                        : 'bg-white text-slate-900 border border-zinc-200 rounded-bl-none font-medium'
                    }`}>
                      {m.parts}
                    </div>
                  </div>
                ))}
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-white p-4 rounded-2xl shadow-sm border border-zinc-200 flex gap-2">
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                  </div>
                )}
              </div>

              <form onSubmit={handleSend} className="p-5 border-t border-zinc-200 bg-white flex gap-3 shadow-[0_-5px_20px_rgba(0,0,0,0.03)]">
                <input
                  type="text"
                  placeholder={lang === 'en' ? 'Talk to Cleo...' : 'تحدث مع كليو...'}
                  className="flex-grow bg-zinc-100 border-none rounded-2xl px-5 py-4 text-sm focus:ring-2 focus:ring-emerald-500 outline-none text-slate-900 placeholder:text-slate-400"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                />
                <button 
                  disabled={!input.trim() || isTyping}
                  className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center disabled:opacity-50 transition-all hover:bg-emerald-600 hover:scale-105 active:scale-95 shadow-lg"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"/></svg>
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
};

export default Chatbot;
