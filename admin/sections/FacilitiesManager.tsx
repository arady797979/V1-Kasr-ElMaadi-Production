
import React, { useState } from 'react';
import { useApp } from '../../App';
import { Facility } from '../../types';

const FacilitiesManager: React.FC = () => {
  const { data, setData, lang } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Facility>({
    id: '',
    name: { en: '', ar: '' },
    description: { en: '', ar: '' },
    image: ''
  });

  const handleSave = () => {
    let newItems;
    if (editingId) {
      newItems = data.facilities.map((f: any) => f.id === editingId ? { ...formData, id: editingId } : f);
    } else {
      newItems = [...data.facilities, { ...formData, id: Date.now().toString() }];
    }
    setData({ ...data, facilities: newItems });
    setEditingId(null);
    setFormData({ id: '', name: { en: '', ar: '' }, description: { en: '', ar: '' }, image: '' });
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

  const handleEdit = (f: Facility) => {
    setEditingId(f.id);
    setFormData(f);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this facility entry?")) {
      setData({ ...data, facilities: data.facilities.filter((f: any) => f.id !== id) });
    }
  };

  const inputClass = "w-full p-4 bg-white border border-slate-200 rounded-2xl text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1";

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Facility Management</h2>
        <p className="text-slate-500 mt-1 font-medium">Manage images and descriptions for hospital wings and grounds.</p>
      </div>

      <div className="bg-slate-50 p-10 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8 animate-in fade-in duration-500">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
          <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-sm">
            {editingId ? '✏️' : '✨'}
          </span>
          {editingId ? 'Edit Facility' : 'Add New Facility Area'}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Facility Name (EN)</label>
              <input value={formData.name.en} onChange={(e) => setFormData({...formData, name: {...formData.name, en: e.target.value}})} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Facility Name (AR)</label>
              <input value={formData.name.ar} onChange={(e) => setFormData({...formData, name: {...formData.name, ar: e.target.value}})} className={inputClass} />
            </div>
          </div>
          <div className="space-y-6">
            <div>
              <label className={labelClass}>Description (EN)</label>
              <textarea rows={3} value={formData.description.en} onChange={(e) => setFormData({...formData, description: {...formData.description, en: e.target.value}})} className={inputClass} />
            </div>
            <div>
              <label className={labelClass}>Description (AR)</label>
              <textarea rows={3} value={formData.description.ar} onChange={(e) => setFormData({...formData, description: {...formData.description, ar: e.target.value}})} className={inputClass} />
            </div>
          </div>
          <div className="col-span-full">
            <label className={labelClass}>Facility Photo</label>
            <div className="flex items-center gap-6 bg-white p-6 rounded-[2rem] border border-slate-200 shadow-inner">
               <div className="w-32 h-32 rounded-2xl overflow-hidden shadow-md border-4 border-white bg-slate-50 flex-shrink-0">
                  {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-200 text-3xl">🖼️</div>}
               </div>
               <input type="file" accept="image/*" onChange={handleFileUpload} className="text-sm file:mr-4 file:py-3 file:px-6 file:rounded-xl file:border-0 file:text-xs file:font-black file:bg-slate-900 file:text-white hover:file:bg-emerald-600 file:cursor-pointer" />
            </div>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          {editingId && <button onClick={() => setEditingId(null)} className="px-6 font-bold text-slate-400">Cancel</button>}
          <button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-4 rounded-2xl font-black shadow-lg transition-all active:scale-95">
            {editingId ? 'Update Facility' : 'Save Facility'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {data.facilities.map((f: any) => (
          <div key={f.id} className="p-6 bg-white border border-slate-100 rounded-[2.5rem] shadow-sm flex items-start gap-6 group hover:shadow-lg transition-all">
             <div className="w-24 h-24 rounded-2xl overflow-hidden flex-shrink-0">
               <img src={f.image} className="w-full h-full object-cover" />
             </div>
             <div className="flex-grow">
               <h4 className="font-black text-slate-900 text-lg mb-1">{f.name[lang]}</h4>
               <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">{f.description[lang]}</p>
               <div className="mt-4 flex gap-4">
                 <button onClick={() => handleEdit(f)} className="text-[10px] font-black text-blue-600 uppercase tracking-widest hover:text-blue-800">Edit</button>
                 <button onClick={() => handleDelete(f.id)} className="text-[10px] font-black text-red-500 uppercase tracking-widest hover:text-red-700">Delete</button>
               </div>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FacilitiesManager;
