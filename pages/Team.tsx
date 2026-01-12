
import React from 'react';
import { useApp } from '../App';

const Team: React.FC = () => {
  const { data, t, lang } = useApp();

  return (
    <div className="pt-20 pb-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">{t('team')}</h1>
          <p className="text-slate-500 max-w-xl mx-auto">{lang === 'en' ? 'Meet the world-class professionals dedicated to your recovery and mental wellness.' : 'قابل المحترفين من الطراز العالمي المكرسين لتعافيك وعافيتك النفسية.'}</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
          {data.team.map((member: any) => (
            <div key={member.id} className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center group hover:shadow-lg transition-all">
              <div className="w-48 h-48 mx-auto mb-8 relative">
                <div className="absolute inset-0 bg-emerald-100 rounded-full scale-105 group-hover:scale-110 transition-transform"></div>
                <img 
                  src={member.image} 
                  className="w-full h-full object-cover rounded-full relative z-10 border-4 border-white shadow-inner" 
                  /* Fix: Pass LocalizedString to t() */
                  alt={t('', member.name)}
                />
              </div>
              {/* Fix: Pass LocalizedString to t() */}
              <h3 className="text-2xl font-bold text-slate-800 mb-2">{t('', member.name)}</h3>
              <p className="text-emerald-600 font-semibold mb-6">{t('', member.role)}</p>
              <p className="text-slate-500 italic leading-relaxed">
                "{t('', member.bio)}"
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Team;
