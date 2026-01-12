
import React from 'react';
import { useApp } from '../App';

const Programs: React.FC = () => {
  const { data, t, lang } = useApp();

  return (
    <div className="pt-20 pb-24 bg-slate-50">
      <div className="container mx-auto px-6">
        <div className="text-center mb-24 max-w-3xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter">{t('programs')}</h1>
          <p className="text-slate-500 text-lg md:text-xl leading-relaxed">
            {lang === 'en' 
              ? 'Our recovery paths are immersive, structured experiences designed to guide you through every stage of healing with dignity and clinical excellence.' 
              : 'مسارات التعافي لدينا هي تجارب غامرة ومنظمة مصممة لإرشادك خلال كل مرحلة من مراحل الشفاء بكرامة وتميز سريري.'}
          </p>
          <div className="w-24 h-2 bg-emerald-500 mx-auto rounded-full mt-10"></div>
        </div>

        <div className="grid grid-cols-1 gap-20">
          {data.programs.map((program: any, index: number) => (
            <div 
              key={program.id} 
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} bg-white rounded-[3.5rem] shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] border border-white/80 overflow-hidden group hover:shadow-2xl transition-all duration-700`}
            >
              {/* Increased height and width ratio for the image container */}
              <div className="lg:w-[65%] h-[500px] lg:h-[750px] relative overflow-hidden">
                <img 
                  src={program.image} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[2s] ease-out" 
                  alt={t('', program.title)}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity"></div>
                <div className="absolute top-8 left-8 lg:top-12 lg:left-12 bg-white/10 backdrop-blur-2xl border border-white/30 text-white text-[10px] lg:text-xs font-black tracking-[0.4em] px-8 py-4 rounded-full uppercase shadow-2xl">
                  {t('', program.schedule)}
                </div>
              </div>
              <div className="p-12 lg:p-20 lg:w-[35%] flex flex-col justify-center bg-white">
                <span className="text-emerald-600 font-black uppercase tracking-widest text-xs mb-6 block">Specialized Care 0{index + 1}</span>
                <h3 className="text-4xl lg:text-5xl font-black text-slate-900 mb-8 leading-tight tracking-tighter">
                  {t('', program.title)}
                </h3>
                <p className="text-slate-500 mb-12 leading-relaxed text-lg lg:text-xl font-medium opacity-80">
                  {t('', program.description)}
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <button className="bg-slate-900 hover:bg-emerald-600 text-white font-black py-5 px-10 rounded-[1.5rem] transition-all shadow-xl active:scale-95 text-xs uppercase tracking-widest">
                    {lang === 'en' ? 'Admission Details' : 'تفاصيل القبول'}
                  </button>
                  <button className="bg-slate-50 hover:bg-slate-100 text-slate-500 font-black py-5 px-10 rounded-[1.5rem] transition-all text-xs uppercase tracking-widest">
                    {lang === 'en' ? 'Download PDF' : 'تحميل PDF'}
                  </button>
                </div>
              </div>
            </div>
          ))}
          
          {data.programs.length === 0 && (
            <div className="py-40 text-center bg-white rounded-[3rem] border-4 border-dashed border-slate-100">
               <span className="text-6xl mb-6 block grayscale opacity-30">📂</span>
               <h3 className="text-2xl font-bold text-slate-300 uppercase tracking-widest">Our program list is currently being updated.</h3>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Programs;
