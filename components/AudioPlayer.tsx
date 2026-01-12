
import React, { useState, useEffect, useRef } from 'react';
import { useApp } from '../App';

const AudioPlayer: React.FC = () => {
  const { data, setData } = useApp();
  const music = data.music;
  const [isMuted, setIsMuted] = useState(!music.isEnabled);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    const newState = !isMuted;
    setIsMuted(newState);
    setData({
      ...data,
      music: { ...music, isEnabled: !newState }
    });
  };

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = music.volume / 100;
      if (!isMuted && music.sourceType === 'mp3') {
        audioRef.current.play().catch(e => console.log("Auto-play blocked"));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isMuted, music.volume, music.sourceType, music.mp3Data]);

  const youtubeUrl = `https://www.youtube.com/embed/${music.youtubeId}?autoplay=${music.isEnabled ? 1 : 0}&loop=${music.loop ? 1 : 0}&playlist=${music.youtubeId}&controls=0&mute=${isMuted ? 1 : 0}`;

  return (
    <div className="fixed bottom-64 right-6 z-40 transition-all duration-500 transform">
      <div className="flex flex-col items-center gap-2">
        <button
          onClick={toggleMusic}
          className={`w-14 h-14 rounded-2xl shadow-2xl flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 ${
            !isMuted 
              ? 'bg-emerald-600 text-white animate-pulse ring-4 ring-emerald-500/20 shadow-emerald-500/40' 
              : 'bg-white text-slate-400 border border-slate-200 hover:text-slate-600'
          }`}
          title={!isMuted ? "Mute Background Music" : "Play Background Music"}
        >
          {!isMuted ? (
            <div className="relative">
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zm-2 0L7 7H3v10h4l5 3.77V3.23z"/>
              </svg>
              {/* Animated Bars */}
              <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 flex gap-0.5 h-1 items-end">
                <div className="w-0.5 bg-white h-1 animate-[bounce_0.6s_infinite]"></div>
                <div className="w-0.5 bg-white h-2 animate-[bounce_0.4s_infinite]"></div>
                <div className="w-0.5 bg-white h-1.5 animate-[bounce_0.8s_infinite]"></div>
              </div>
            </div>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.37.28-.76.53-1.18.73l.07 2.06c.96-.24 1.86-.67 2.65-1.24L19.73 21 21 19.73l-8-8L4.27 3zM12 4L9.91 6.09 12 8.18V4z"/>
            </svg>
          )}
        </button>
        {!isMuted && (
          <span className="text-[9px] font-black text-emerald-600 uppercase tracking-tighter bg-white px-2 py-1 rounded-lg shadow-sm border border-emerald-100 whitespace-nowrap">
            {music.sourceType === 'mp3' ? 'MP3 Active' : 'YT Stream'}
          </span>
        )}
      </div>

      {/* Hidden Players Area */}
      <div className="hidden pointer-events-none opacity-0 w-0 h-0 overflow-hidden">
        {music.isEnabled && music.sourceType === 'youtube' && (
          <iframe
            width="560"
            height="315"
            src={youtubeUrl}
            title="Background Music"
            frameBorder="0"
            allow="autoplay; encrypted-media"
            allowFullScreen
          ></iframe>
        )}
        
        {music.sourceType === 'mp3' && music.mp3Data && (
          <audio
            ref={audioRef}
            src={music.mp3Data}
            loop={music.loop}
          />
        )}
      </div>
    </div>
  );
};

export default AudioPlayer;
