
import React, { useState } from 'react';
import { useApp } from '../../App';

const ChatSettings: React.FC = () => {
  const { data, setData, lang } = useApp();
  const [localConfig, setLocalConfig] = useState(data.chatConfig || {
    systemInstructions: '',
    prompts: { patient: '', family: '', inquiry: '' },
    aiNote: { en: 'Cleo is Online', ar: 'كليو متصلة الآن' },
    liveAgentEnabled: true,
    liveAgentStatus: { en: 'Live Support Available', ar: 'الدعم المباشر متاح' }
  });

  const handleSave = () => {
    setData({ 
      ...data, 
      chatConfig: localConfig
    });
    alert("Cleo's intelligence updated successfully!");
  };

  const updatePrompt = (persona: string, val: string) => {
    setLocalConfig({
      ...localConfig,
      prompts: { ...localConfig.prompts, [persona]: val }
    });
  };

  const inputClass = "w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1";

  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-slate-100 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Cleo Intelligence Settings</h2>
          <p className="text-slate-500 mt-1 font-medium">Define Cleo's personality, boundaries, and clinical wisdom.</p>
        </div>
        <button 
          onClick={handleSave}
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-[1.5rem] font-black shadow-2xl shadow-emerald-200 transition-all active:scale-95 text-xs uppercase tracking-widest"
        >
          Publish AI Logic
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 space-y-10">
           {/* Global Intelligence Editor */}
           <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200 shadow-sm space-y-8">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-xl shadow-lg">🧠</div>
                 <h3 className="text-2xl font-black text-slate-800">Global System Guidance</h3>
              </div>
              <div>
                <label className={labelClass}>Master Cleo Prompt (Instructions)</label>
                <textarea 
                  rows={10}
                  value={localConfig.systemInstructions}
                  onChange={(e) => setLocalConfig({...localConfig, systemInstructions: e.target.value})}
                  className={inputClass}
                  placeholder="Define Cleo's master behavior here..."
                />
                <p className="mt-4 text-[10px] text-slate-400 font-bold leading-relaxed">
                   PRO-TIP: Mentioning leaders like Mohamed Makled or Dr. Samir here ensures Cleo speaks highly of them when relevant. This is the "brain" of the chatbot.
                </p>
              </div>
           </section>

           {/* Appearance & Live Support */}
           <section className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm space-y-8">
              <h3 className="text-xl font-bold text-slate-800 flex items-center gap-3">
                 <span className="text-2xl">🎨</span> Interface & Feedback
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className={labelClass}>Cleo Floating Note (EN)</label>
                  <input 
                    value={localConfig.aiNote.en} 
                    onChange={(e) => setLocalConfig({...localConfig, aiNote: {...localConfig.aiNote, en: e.target.value}})}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label className={labelClass}>Cleo Floating Note (AR)</label>
                  <input 
                    value={localConfig.aiNote.ar} 
                    onChange={(e) => setLocalConfig({...localConfig, aiNote: {...localConfig.aiNote, ar: e.target.value}})}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-200 space-y-6">
                <div className="flex items-center justify-between">
                   <span className="font-black text-slate-700 uppercase tracking-widest text-xs">Direct Support Access</span>
                   <button 
                      onClick={() => setLocalConfig({...localConfig, liveAgentEnabled: !localConfig.liveAgentEnabled})}
                      className={`w-14 h-8 rounded-full transition-all relative ${localConfig.liveAgentEnabled ? 'bg-emerald-500' : 'bg-slate-300'}`}
                   >
                      <div className={`absolute top-1 w-6 h-6 bg-white rounded-full transition-all ${localConfig.liveAgentEnabled ? 'left-7' : 'left-1'}`}></div>
                   </button>
                </div>
                {localConfig.liveAgentEnabled && (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 animate-in fade-in slide-in-from-top-2 duration-300">
                    <div>
                      <label className={labelClass}>Agent Badge Text (EN)</label>
                      <input 
                        value={localConfig.liveAgentStatus.en} 
                        onChange={(e) => setLocalConfig({...localConfig, liveAgentStatus: {...localConfig.liveAgentStatus, en: e.target.value}})}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Agent Badge Text (AR)</label>
                      <input 
                        value={localConfig.liveAgentStatus.ar} 
                        onChange={(e) => setLocalConfig({...localConfig, liveAgentStatus: {...localConfig.liveAgentStatus, ar: e.target.value}})}
                        className="w-full p-3 bg-white border border-slate-200 rounded-xl text-xs font-bold"
                      />
                    </div>
                  </div>
                )}
              </div>
           </section>
        </div>

        <div className="space-y-8">
           <div className="bg-slate-900 p-8 rounded-[2.5rem] text-white space-y-6">
              <h4 className="text-xs font-black uppercase tracking-[0.2em] text-emerald-400">Persona Specializations</h4>
              {(['patient', 'family', 'inquiry'] as const).map((persona) => (
                <div key={persona} className="space-y-3">
                   <label className="text-[9px] font-black uppercase tracking-widest text-slate-500">{persona} Context Layer</label>
                   <textarea 
                      rows={3}
                      value={localConfig.prompts[persona]}
                      onChange={(e) => updatePrompt(persona, e.target.value)}
                      className="w-full p-4 bg-white/5 border border-white/10 rounded-2xl text-white text-xs font-medium focus:ring-2 focus:ring-emerald-500 outline-none"
                      placeholder={`Special rules for ${persona}s...`}
                   />
                </div>
              ))}
           </div>
           
           <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem]">
              <h4 className="font-black text-emerald-800 text-[10px] uppercase tracking-widest mb-3">AI Safety Notice</h4>
              <p className="text-xs text-emerald-700 leading-relaxed font-medium">
                Cleo's logic is updated in real-time. Changes made here will affect how Cleo responds to patients immediately upon saving. Ensure clinical accuracy in your instructions.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default ChatSettings;
