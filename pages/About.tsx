
import React from 'react';
import { useApp } from '../App';

const About: React.FC = () => {
  const { data, t, lang } = useApp();
  const about = data.content.about;

  return (
    <div className="pt-20">
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="relative">
              <img 
                src={about.image} 
                alt="Hospital" 
                className="rounded-3xl shadow-2xl relative z-10 w-full"
              />
              <div className="absolute -top-6 -left-6 w-32 h-32 bg-emerald-500/20 rounded-full z-0 blur-2xl"></div>
              <div className="absolute -bottom-6 -right-6 w-48 h-48 bg-blue-500/10 rounded-full z-0 blur-3xl"></div>
            </div>
            
            <div>
              <span className="text-emerald-600 font-bold tracking-widest uppercase text-sm mb-4 block">
                {t('about')}
              </span>
              <h2 className="text-4xl font-bold text-slate-800 mb-8 leading-tight">
                {lang === 'en' ? 'Your Journey to Serenity Starts Here' : 'رحلتك إلى الصفاء تبدأ من هنا'}
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                {/* Fix: Pass LocalizedString to t() */}
                {t('', about.story)}
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4 text-xl">🎯</div>
                  <h4 className="font-bold text-slate-800 mb-2">{lang === 'en' ? 'Our Mission' : 'مهمتنا'}</h4>
                  {/* Fix: Pass LocalizedString to t() */}
                  <p className="text-sm text-slate-500">{t('', about.mission)}</p>
                </div>
                <div className="p-6 bg-white rounded-2xl shadow-sm border border-slate-100">
                  <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-4 text-xl">👁️</div>
                  <h4 className="font-bold text-slate-800 mb-2">{lang === 'en' ? 'Our Vision' : 'رؤيتنا'}</h4>
                  {/* Fix: Pass LocalizedString to t() */}
                  <p className="text-sm text-slate-500">{t('', about.vision)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
             <h2 className="text-3xl font-bold text-slate-800 mb-4">
               {lang === 'en' ? 'Our Core Values' : 'قيمنا الأساسية'}
             </h2>
             <div className="w-20 h-1 bg-emerald-500 mx-auto rounded-full"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { icon: '🤝', title: { en: 'Compassion', ar: 'التعاطف' }, desc: { en: 'Treating everyone with kindness.', ar: 'معاملة الجميع بلطف.' } },
              { icon: '🛡️', title: { en: 'Integrity', ar: 'النزاهة' }, desc: { en: 'Upholding ethical standards.', ar: 'الحفاظ على المعايير الأخلاقية.' } },
              { icon: '💎', title: { en: 'Excellence', ar: 'التميز' }, desc: { en: 'Continuous pursuit of perfection.', ar: 'السعي المستمر للكمال.' } },
            ].map((v, i) => (
              <div key={i} className="text-center p-8 bg-slate-50 rounded-3xl hover:bg-emerald-50 transition-colors group">
                <div className="text-5xl mb-6 transform transition-transform group-hover:scale-110">{v.icon}</div>
                {/* Fix: Pass LocalizedString to t() */}
                <h4 className="text-xl font-bold text-slate-800 mb-4">{t('', v.title)}</h4>
                <p className="text-slate-600">{t('', v.desc)}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
