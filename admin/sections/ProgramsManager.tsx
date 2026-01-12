
import React, { useState } from 'react';
import { useApp } from '../../App';
import { Program } from '../../types';

const ProgramsManager: React.FC = () => {
  const { data, setData, lang } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Program>({
    id: '',
    title: { en: '', ar: '' },
    description: { en: '', ar: '' },
    schedule: { en: '', ar: '' },
    image: ''
  });

  const handleSave = () => {
    let newItems;
    if (editingId) {
      newItems = data.programs.map((p: any) => p.id === editingId ? { ...formData, id: editingId } : p);
    } else {
      newItems = [...data.programs, { ...formData, id: Date.now().toString() }];
    }
    setData({ ...data, programs: newItems });
    setEditingId(null);
    setFormData({ id: '', title: { en: '', ar: '' }, description: { en: '', ar: '' }, schedule: { en: '', ar: '' }, image: '' });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, image: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEdit = (p: Program) => {
    setEditingId(p.id);
    setFormData(p);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this program?")) {
      setData({ ...data, programs: data.programs.filter((p: any) => p.id !== id) });
    }
  };

  const inputClass = "w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1";

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Programs Management</h2>
        <p className="text-slate-500 mt-1 font-medium">Add and manage structured recovery paths.</p>
      </div>

      {/* Form */}
      <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8 animate-in fade-in duration-500">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
          <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-sm">
            {editingId ? '✏️' : '✨'}
          </span>
          {editingId ? 'Edit Program Details' : 'Design New Program'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Program Title (EN)</label>
              <input 
                placeholder="e.g. Intensive Outpatient Recovery" 
                value={formData.title.en} 
                onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Program Title (AR)</label>
              <input 
                placeholder="اسم البرنامج بالعربية" 
                value={formData.title.ar} 
                onChange={(e) => setFormData({ ...formData, title: { ...formData.title, ar: e.target.value } })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Weekly Schedule (EN)</label>
              <input 
                placeholder="Mon-Fri, 9AM-5PM" 
                value={formData.schedule.en} 
                onChange={(e) => setFormData({ ...formData, schedule: { ...formData.schedule, en: e.target.value } })}
                className={inputClass}
              />
            </div>
             <div>
              <label className={labelClass}>Weekly Schedule (AR)</label>
              <input 
                placeholder="الجدول الزمني" 
                value={formData.schedule.ar} 
                onChange={(e) => setFormData({ ...formData, schedule: { ...formData.schedule, ar: e.target.value } })}
                className={inputClass}
              />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Program Description (EN)</label>
              <textarea 
                rows={5}
                placeholder="Describe the goals and methodology..." 
                value={formData.description.en} 
                onChange={(e) => setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })}
                className={inputClass}
              />
            </div>
            <div>
              <label className={labelClass}>Program Description (AR)</label>
              <textarea 
                rows={5}
                placeholder="وصف البرنامج بالتفصيل" 
                value={formData.description.ar} 
                onChange={(e) => setFormData({ ...formData, description: { ...formData.description, ar: e.target.value } })}
                className={inputClass}
              />
            </div>
          </div>
          <div className="col-span-full">
            <label className={labelClass}>Promotional Header Image</label>
            <div className="flex flex-col md:flex-row items-start gap-8 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-inner">
               <div className="w-full md:w-64 h-40 bg-slate-100 rounded-2xl overflow-hidden shadow-md border-4 border-white">
                 {formData.image ? (
                   <img src={formData.image} className="w-full h-full object-cover" alt="Preview" />
                 ) : (
                   <div className="w-full h-full flex flex-col items-center justify-center text-slate-300">
                      <span className="text-4xl mb-2">🖼️</span>
                      <span className="text-[10px] font-black uppercase tracking-widest">No Image</span>
                   </div>
                 )}
               </div>
               <div className="flex-grow space-y-4 pt-2">
                  <p className="text-sm text-slate-500 font-medium">A high-quality 16:9 image works best for program headers. Upload a photo that captures the essence of the program environment.</p>
                  <input 
                    type="file" 
                    accept="image/*" 
                    onChange={handleFileUpload}
                    className="block w-full text-sm text-slate-500 file:mr-4 file:py-3 file:px-8 file:rounded-xl file:border-0 file:text-sm file:font-black file:bg-slate-900 file:text-white hover:file:bg-emerald-600 file:transition-all file:cursor-pointer"
                  />
               </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4 pt-4">
          {editingId && (
            <button 
              onClick={() => {
                setEditingId(null);
                setFormData({ id: '', title: { en: '', ar: '' }, description: { en: '', ar: '' }, schedule: { en: '', ar: '' }, image: '' });
              }} 
              className="px-8 py-4 text-slate-400 font-bold hover:text-slate-600 transition-colors uppercase tracking-widest text-sm"
            >
              Cancel
            </button>
          )}
          <button 
            onClick={handleSave} 
            className="bg-emerald-600 hover:bg-emerald-700 text-white px-12 py-4 rounded-2xl font-black shadow-lg shadow-emerald-200 transition-all active:scale-95 uppercase tracking-widest text-sm"
          >
            {editingId ? 'Save Program Changes' : 'Publish Program'}
          </button>
        </div>
      </div>

      {/* List */}
      <div className="space-y-6">
         <h4 className="text-sm font-black text-slate-400 uppercase tracking-widest px-1">Live Programs Catalog</h4>
         <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {data.programs.map((p: any) => (
            <div key={p.id} className="group bg-white p-4 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col">
              {/* Increased height for catalog images */}
              <div className="h-80 w-full overflow-hidden rounded-2xl mb-6 relative shadow-md">
                <img src={p.image} className="w-full h-full object-cover transition-transform group-hover:scale-105 duration-500" alt="" />
                <div className="absolute inset-0 bg-slate-900/10 group-hover:bg-transparent transition-colors"></div>
              </div>
              <div className="px-2 pb-2">
                <h4 className="text-xl font-black text-slate-900 mb-2 leading-tight">{p.title[lang]}</h4>
                <p className="text-xs text-emerald-600 font-black uppercase tracking-widest mb-6">{p.schedule[lang]}</p>
                <div className="flex gap-4 border-t border-slate-50 pt-4">
                  <button onClick={() => handleEdit(p)} className="flex-grow bg-slate-50 hover:bg-blue-50 text-blue-600 font-black py-3 rounded-xl text-xs uppercase tracking-widest transition-colors">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="flex-grow bg-slate-50 hover:bg-red-50 text-red-500 font-black py-3 rounded-xl text-xs uppercase tracking-widest transition-colors">Delete</button>
                </div>
              </div>
            </div>
          ))}
          {data.programs.length === 0 && (
            <div className="col-span-full py-20 bg-slate-50 rounded-[2.5rem] border-4 border-dashed border-slate-200 text-center flex flex-col items-center justify-center">
              <span className="text-5xl mb-4 grayscale">📑</span>
              <p className="font-bold text-slate-400 uppercase tracking-widest">No programs cataloged yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProgramsManager;
