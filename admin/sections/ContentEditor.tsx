
import React, { useState } from 'react';
import { useApp } from '../../App';

const ContentEditor: React.FC = () => {
  const { data, setData, lang } = useApp();
  const [localContent, setLocalContent] = useState(data.content);

  const handleSave = () => {
    setData({ ...data, content: localContent });
    alert("Content updated successfully!");
  };

  const updateNested = (path: string[], value: string) => {
    const newContent = { ...localContent };
    let curr: any = newContent;
    for (let i = 0; i < path.length - 1; i++) {
      curr = curr[path[i]];
    }
    curr[path[path.length - 1]] = value;
    setLocalContent(newContent);
  };

  const handleFileUpload = (path: string[], e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateNested(path, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const inputClass = "w-full p-4 bg-white border border-slate-300 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all shadow-sm placeholder:text-slate-400";
  const sectionClass = "bg-slate-50 border border-slate-200 rounded-3xl p-8 shadow-sm space-y-8";
  const labelClass = "block text-sm font-bold text-slate-600 uppercase tracking-widest mb-3";

  return (
    <div className="space-y-12 pb-20">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 border-b border-slate-200 pb-8">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Website Content Manager</h2>
          <p className="text-slate-500 mt-1 font-medium">Editing content in {lang === 'en' ? 'English' : 'Arabic'}</p>
        </div>
        <button 
          onClick={handleSave} 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-black shadow-lg hover:shadow-emerald-200 transition-all active:scale-95"
        >
          Publish All Changes
        </button>
      </div>

      {/* Branding Section */}
      <section className={sectionClass}>
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <span className="text-2xl">🏷️</span>
          <h3 className="text-xl font-bold text-slate-800">Hospital Branding</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Hospital Name (EN)</label>
              <input 
                value={localContent.hospitalName?.en || ''} 
                onChange={(e) => updateNested(['hospitalName', 'en'], e.target.value)}
                className={inputClass}
                placeholder="Hospital name in English"
              />
            </div>
            <div>
              <label className={labelClass}>Hospital Name (AR)</label>
              <input 
                value={localContent.hospitalName?.ar || ''} 
                onChange={(e) => updateNested(['hospitalName', 'ar'], e.target.value)}
                className={inputClass}
                placeholder="اسم المستشفى بالعربية"
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Tagline / Subtext (EN)</label>
              <input 
                value={localContent.tagline?.en || ''} 
                onChange={(e) => updateNested(['tagline', 'en'], e.target.value)}
                className={inputClass}
                placeholder="Tagline under logo (English)"
              />
            </div>
            <div>
              <label className={labelClass}>Tagline / Subtext (AR)</label>
              <input 
                value={localContent.tagline?.ar || ''} 
                onChange={(e) => updateNested(['tagline', 'ar'], e.target.value)}
                className={inputClass}
                placeholder="العبارة الترويجية بالعربية"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-10 pt-8 border-t border-slate-200">
           <div className="w-40 h-40 bg-white border-2 border-dashed border-slate-300 rounded-3xl flex items-center justify-center overflow-hidden shadow-inner group relative">
             {localContent.logo ? (
               <img src={localContent.logo} className="w-full h-full object-contain p-4" alt="Logo Preview" />
             ) : (
               <div className="text-center p-4">
                 <div className="text-3xl mb-2">🖼️</div>
                 <span className="text-xs font-bold text-slate-400 uppercase">No Logo</span>
               </div>
             )}
             <label className="absolute inset-0 bg-slate-900/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer">
                <span className="text-white text-xs font-bold uppercase">Update</span>
                <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(['logo'], e)} />
             </label>
           </div>
           <div className="flex-grow space-y-4">
             <label className={labelClass}>Hospital Logo Image</label>
             <p className="text-sm text-slate-500 mb-4 leading-relaxed">This logo appears in the navigation bar and footer. Upload a transparent PNG for the best result on all backgrounds.</p>
             <input 
               type="file" 
               accept="image/*" 
               onChange={(e) => handleFileUpload(['logo'], e)}
               className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-sm file:font-bold file:bg-emerald-600 file:text-white hover:file:bg-emerald-700 file:transition-colors file:cursor-pointer"
             />
           </div>
        </div>
      </section>

      {/* Hero Section */}
      <section className={sectionClass}>
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <span className="text-2xl">✨</span>
          <h3 className="text-xl font-bold text-slate-800">Homepage Hero Section</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Hero Main Title</label>
              <input 
                value={localContent.hero.title[lang]} 
                onChange={(e) => updateNested(['hero', 'title', lang], e.target.value)}
                className={inputClass}
                placeholder="Enter a powerful headline..."
              />
            </div>
            <div>
              <label className={labelClass}>Hero Description Subtitle</label>
              <textarea 
                rows={4}
                value={localContent.hero.subtitle[lang]} 
                onChange={(e) => updateNested(['hero', 'subtitle', lang], e.target.value)}
                className={inputClass}
                placeholder="Briefly describe the hospital's primary mission..."
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>Background Impact Image</label>
            <div className="relative group rounded-3xl overflow-hidden shadow-2xl border-4 border-white aspect-video bg-slate-200">
               <img src={localContent.hero.image} className="w-full h-full object-cover" alt="Hero Preview" />
               <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-white text-slate-900 px-8 py-3 rounded-2xl font-black text-sm shadow-xl active:scale-95 transition-transform">
                    Upload New Image
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(['hero', 'image'], e)} />
                  </label>
               </div>
            </div>
            <div className="mt-4">
              <label className="text-[10px] font-bold text-slate-400 uppercase block mb-1">Direct URL (Optional)</label>
              <input 
                value={localContent.hero.image} 
                onChange={(e) => updateNested(['hero', 'image'], e.target.value)}
                className="w-full p-2 text-xs bg-white border border-slate-200 rounded-lg text-slate-400"
              />
            </div>
          </div>
        </div>
      </section>

      {/* About Us */}
      <section className={sectionClass}>
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <span className="text-2xl">📖</span>
          <h3 className="text-xl font-bold text-slate-800">Our Story & Mission</h3>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
           <div className="space-y-6">
              <div>
                <label className={labelClass}>Detailed Story (Arabic & English)</label>
                <textarea 
                  rows={8}
                  value={localContent.about.story[lang]} 
                  onChange={(e) => updateNested(['about', 'story', lang], e.target.value)}
                  className={inputClass}
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={labelClass}>Mission Statement</label>
                  <input 
                    value={localContent.about.mission[lang]} 
                    onChange={(e) => updateNested(['about', 'mission', lang], e.target.value)} 
                    className={inputClass} 
                  />
                </div>
                <div>
                  <label className={labelClass}>Vision Statement</label>
                  <input 
                    value={localContent.about.vision[lang]} 
                    onChange={(e) => updateNested(['about', 'vision', lang], e.target.value)} 
                    className={inputClass} 
                  />
                </div>
              </div>
           </div>
           <div>
             <label className={labelClass}>Section Illustration Image</label>
             <div className="relative group h-[420px] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-200">
               <img src={localContent.about.image} className="w-full h-full object-cover" alt="About Preview" />
               <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <label className="cursor-pointer bg-white text-slate-900 px-8 py-3 rounded-2xl font-black text-sm shadow-xl transition-all active:scale-95">
                    Select File
                    <input type="file" className="hidden" accept="image/*" onChange={(e) => handleFileUpload(['about', 'image'], e)} />
                  </label>
               </div>
             </div>
           </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className={sectionClass}>
        <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
          <span className="text-2xl">📞</span>
          <h3 className="text-xl font-bold text-slate-800">Contact & Support Channels</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <label className={labelClass}>Administrative Email</label>
            <input 
              value={localContent.contact.email} 
              onChange={(e) => updateNested(['contact', 'email'], e.target.value)}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>24/7 Support Hotline</label>
            <input 
              value={localContent.contact.phone} 
              onChange={(e) => updateNested(['contact', 'phone'], e.target.value)}
              className={inputClass}
            />
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContentEditor;
