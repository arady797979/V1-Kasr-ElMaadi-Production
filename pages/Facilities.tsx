
import React from 'react';
import { useApp } from '../App';

const Facilities: React.FC = () => {
  const { data, t, lang } = useApp();

  return (
    <div className="pt-20 pb-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-20 max-w-3xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6 tracking-tight">{t('facilities')}</h1>
          <p className="text-slate-600 text-lg leading-relaxed">
            {lang === 'en' 
              ? 'Our facilities are designed to be a sanctuary for healing, combining modern clinical environments with tranquil natural spaces.' 
              : 'تم تصميم مرافقنا لتكون ملاذاً للشفاء، حيث تجمع بين البيئات السريرية الحديثة والمساحات الطبيعية الهادئة.'}
          </p>
          <div className="w-24 h-1.5 bg-emerald-500 mx-auto rounded-full mt-8"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {data.facilities.map((facility: any) => (
            <div key={facility.id} className="group bg-white rounded-[2.5rem] shadow-xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500">
              <div className="h-80 relative overflow-hidden">
                <img 
                  src={facility.image} 
                  className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-1000" 
                  alt={t('', facility.name)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 to-transparent"></div>
              </div>
              <div className="p-10">
                <h3 className="text-2xl font-black text-slate-900 mb-4">{t('', facility.name)}</h3>
                <p className="text-slate-500 leading-relaxed text-base">
                  {t('', facility.description)}
                </p>
              </div>
            </div>
          ))}
          {data.facilities.length === 0 && (
            <div className="col-span-full py-40 text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
               <span className="text-6xl mb-6 block grayscale opacity-30">🏢</span>
               <h3 className="text-2xl font-bold text-slate-300 uppercase tracking-widest">Facility information is being updated.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Facilities;
