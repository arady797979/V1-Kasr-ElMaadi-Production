
import React from 'react';
import { useApp } from '../App';

const Services: React.FC = () => {
  const { data, t, lang } = useApp();

  return (
    <div className="pt-20 pb-24 bg-white">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-8 tracking-tight">
            {t('services')}
          </h1>
          <p className="text-slate-500 text-lg leading-relaxed">
            {lang === 'en' 
              ? 'Our hospital provides specialized, compassionate support designed for lasting recovery. Each service is delivered by industry-leading experts using evidence-based practices.'
              : 'يوفر مستشفانا دعماً متخصصاً ورحيماً مصمماً للتعافي الدائم. يتم تقديم كل خدمة من قبل خبراء رائدين في الصناعة باستخدام ممارسات قائمة على الأدلة.'}
          </p>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mt-8"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          {data.services.map((service: any) => (
            <div key={service.id} className="group bg-white rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.04)] overflow-hidden flex flex-col md:flex-row border border-slate-100 hover:border-emerald-200 transition-all duration-500">
              <div className="md:w-2/5 relative overflow-hidden h-64 md:h-auto">
                <img 
                  src={service.image || "https://picsum.photos/600/800"} 
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  alt={t('', service.title)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
              </div>
              <div className="md:w-3/5 p-10 flex flex-col justify-center bg-white relative">
                <div className="absolute top-8 right-10 text-4xl opacity-10 group-hover:opacity-20 transition-opacity select-none">{service.icon}</div>
                <div className="flex items-center gap-3 mb-4">
                   <div className="w-10 h-10 bg-emerald-50 rounded-xl flex items-center justify-center text-emerald-600 font-bold shadow-sm">
                      {service.icon}
                   </div>
                   <h3 className="text-2xl font-bold text-slate-800 group-hover:text-emerald-700 transition-colors">
                    {t('', service.title)}
                  </h3>
                </div>
                <p className="text-slate-500 mb-8 leading-relaxed text-sm md:text-base">
                  {t('', service.description)}
                </p>
                <button className="flex items-center gap-2 text-emerald-600 font-bold hover:gap-3 transition-all text-sm group/btn">
                  <span>{t('readMore')}</span>
                  <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;
