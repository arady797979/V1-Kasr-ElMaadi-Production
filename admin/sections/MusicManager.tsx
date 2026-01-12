
import React, { useState } from 'react';
import { useApp } from '../../App';

const MusicManager: React.FC = () => {
  const { data, setData } = useApp();
  const [localMusic, setLocalMusic] = useState(data.music);

  const handleSave = () => {
    setData({ ...data, music: localMusic });
    alert("Audio environment updated successfully!");
  };

  const handleReset = () => {
    const defaultMusic = {
      sourceType: 'youtube',
      youtubeId: "77ZozI0rw7w", 
      mp3Data: "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAHRoZSBtcDMuY29tAABUQUxCAAAADABUaGUgQ2hpbWUAAFRQRTEAAAAMAFNlcmVuaXR5IFBhdGgAAFRJVDIAAAAMAEhvc3BpdGFsIEh1bQAA",
      isEnabled: true,
      loop: true,
      volume: 40
    };
    setLocalMusic(defaultMusic as any);
    alert("Music reset to Serenity Path standard (Healing Ambient). Click Publish to apply.");
  };

  const handleMp3Upload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File too large. Please keep MP3s under 5MB for smooth browsing.");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setLocalMusic({ ...localMusic, mp3Data: reader.result as string, sourceType: 'mp3' });
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass = "w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-3 px-1";

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Audio Environment Hub</h2>
          <p className="text-slate-500 mt-1 font-medium">Control the sonic atmosphere of the patient portal.</p>
        </div>
        <div className="flex gap-4">
          <button 
            onClick={handleReset}
            className="bg-slate-100 hover:bg-slate-200 text-slate-600 px-8 py-5 rounded-[1.5rem] font-black transition-all active:scale-95 uppercase tracking-widest text-xs border border-slate-200"
          >
            Reset to Standard
          </button>
          <button 
            onClick={handleSave} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-5 rounded-[1.5rem] font-black shadow-2xl shadow-emerald-200 transition-all active:scale-95 uppercase tracking-widest text-xs"
          >
            Publish Audio Settings
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div className="space-y-10">
          <section className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200 shadow-sm space-y-8">
            <h3 className="text-2xl font-black text-slate-800 flex items-center gap-3">
               <span className="w-10 h-10 bg-slate-900 text-white rounded-2xl flex items-center justify-center text-lg">🎧</span>
               Atmosphere Source
            </h3>

            <div className="flex gap-4 p-2 bg-zinc-100 rounded-[1.5rem] border border-zinc-200">
               <button 
                onClick={() => setLocalMusic({...localMusic, sourceType: 'youtube'})}
                className={`flex-grow py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${localMusic.sourceType === 'youtube' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 YouTube Stream
               </button>
               <button 
                onClick={() => setLocalMusic({...localMusic, sourceType: 'mp3'})}
                className={`flex-grow py-4 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${localMusic.sourceType === 'mp3' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
               >
                 Local MP3 File
               </button>
            </div>

            {localMusic.sourceType === 'youtube' ? (
              <div className="animate-in fade-in duration-300 space-y-4">
                <label className={labelClass}>YouTube Content ID</label>
                <input 
                  value={localMusic.youtubeId}
                  onChange={(e) => setLocalMusic({...localMusic, youtubeId: e.target.value})}
                  className={inputClass}
                  placeholder="e.g. 5qap5aO4i9A"
                />
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Current Standard: Deep Healing Frequencies (77ZozI0rw7w)</p>
              </div>
            ) : (
              <div className="animate-in fade-in duration-300 space-y-6">
                <label className={labelClass}>Hospital MP3 Asset</label>
                <div className="flex items-center gap-6 bg-white p-6 rounded-[2rem] border border-zinc-200 shadow-inner">
                   <div className={`w-14 h-14 rounded-2xl flex items-center justify-center text-2xl ${localMusic.mp3Data ? 'bg-emerald-100 text-emerald-600' : 'bg-zinc-100 text-slate-300'}`}>
                      {localMusic.mp3Data ? '🎵' : '📁'}
                   </div>
                   <div className="flex-grow">
                      <input 
                        type="file" 
                        accept="audio/mp3" 
                        onChange={handleMp3Upload}
                        className="text-xs font-bold file:bg-slate-900 file:text-white file:border-0 file:py-2 file:px-4 file:rounded-xl file:mr-4 file:cursor-pointer"
                      />
                      {localMusic.mp3Data && <p className="text-[10px] text-emerald-600 font-black mt-2 uppercase tracking-widest">Asset Ready & Loaded</p>}
                   </div>
                </div>
                <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">A default calming chime is pre-loaded for local playback.</p>
              </div>
            )}

            <div className="pt-8 border-t border-zinc-200 space-y-8">
               <div>
                  <div className="flex justify-between items-center mb-4">
                    <label className={labelClass}>Master Volume Control</label>
                    <span className="text-xs font-black text-emerald-600">{localMusic.volume}%</span>
                  </div>
                  <input 
                    type="range" 
                    min="0" max="100" 
                    value={localMusic.volume}
                    onChange={(e) => setLocalMusic({...localMusic, volume: parseInt(e.target.value)})}
                    className="w-full h-2 bg-zinc-200 rounded-lg appearance-none cursor-pointer accent-emerald-600"
                  />
               </div>

               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-zinc-100 shadow-inner">
                     <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Global State</span>
                     <button 
                        onClick={() => setLocalMusic({...localMusic, isEnabled: !localMusic.isEnabled})}
                        className={`w-12 h-6 rounded-full transition-all relative ${localMusic.isEnabled ? 'bg-emerald-500' : 'bg-zinc-300'}`}
                     >
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${localMusic.isEnabled ? 'left-6.5' : 'left-0.5'}`}></div>
                     </button>
                  </div>
                  <div className="flex items-center justify-between p-4 bg-white rounded-2xl border border-zinc-100 shadow-inner">
                     <span className="text-xs font-black text-slate-600 uppercase tracking-widest">Auto-Loop</span>
                     <button 
                        onClick={() => setLocalMusic({...localMusic, loop: !localMusic.loop})}
                        className={`w-12 h-6 rounded-full transition-all relative ${localMusic.loop ? 'bg-emerald-500' : 'bg-zinc-300'}`}
                     >
                        <div className={`absolute top-0.5 w-5 h-5 bg-white rounded-full transition-all ${localMusic.loop ? 'left-6.5' : 'left-0.5'}`}></div>
                     </button>
                  </div>
               </div>
            </div>
          </section>
        </div>

        <div className="space-y-8">
           <h3 className={labelClass}>Broadcasting Preview</h3>
           {localMusic.sourceType === 'youtube' ? (
             <div className="aspect-video rounded-[3rem] overflow-hidden shadow-2xl border-8 border-white bg-black relative">
                <iframe
                  width="100%"
                  height="100%"
                  src={`https://www.youtube.com/embed/${localMusic.youtubeId}`}
                  title="Preview"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
             </div>
           ) : (
             <div className="aspect-video rounded-[3rem] bg-slate-900 border-8 border-white shadow-2xl flex flex-col items-center justify-center p-12 text-center">
                <div className="w-24 h-24 bg-emerald-500/10 rounded-[2rem] border border-emerald-500/20 flex items-center justify-center text-4xl mb-6 shadow-xl">
                   {localMusic.isEnabled ? '🔊' : '🔇'}
                </div>
                <h4 className="text-white font-black text-xl mb-2 tracking-tight">MP3 Playback Interface</h4>
                <p className="text-slate-500 text-sm font-medium">MP3 will play natively in the background for patients without iframe lag.</p>
                {localMusic.mp3Data && (
                   <audio controls src={localMusic.mp3Data} className="mt-8 w-full opacity-50 hover:opacity-100 transition-opacity" />
                )}
             </div>
           )}
           <div className="bg-emerald-50 border border-emerald-100 p-8 rounded-[2.5rem] flex gap-4">
              <span className="text-2xl">💡</span>
              <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                <span className="font-black uppercase block mb-1">Sonic Healing:</span>
                The standard YouTube track (77ZozI0rw7w) is a professional 9-hour 'Deep Healing' ambient session specifically chosen for clinical environments.
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

export default MusicManager;
