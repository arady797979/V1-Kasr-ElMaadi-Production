
import React, { useState } from 'react';
import { useApp } from '../../App';
import { TeamMember } from '../../types';

const TeamManager: React.FC = () => {
  const { data, setData, lang } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<TeamMember>({
    id: '',
    name: { en: '', ar: '' },
    role: { en: '', ar: '' },
    bio: { en: '', ar: '' },
    email: '',
    phone: '',
    image: ''
  });

  const handleSave = () => {
    let newItems;
    if (editingId) {
      newItems = data.team.map((t: any) => t.id === editingId ? { ...formData, id: editingId } : t);
    } else {
      newItems = [...data.team, { ...formData, id: Date.now().toString() }];
    }
    setData({ ...data, team: newItems });
    setEditingId(null);
    setFormData({ id: '', name: { en: '', ar: '' }, role: { en: '', ar: '' }, bio: { en: '', ar: '' }, email: '', phone: '', image: '' });
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

  const handleEdit = (t: TeamMember) => {
    setEditingId(t.id);
    setFormData(t);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this team member?")) {
      setData({ ...data, team: data.team.filter((t: any) => t.id !== id) });
    }
  };

  const inputClass = "w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1";

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Staff Management</h2>
        <p className="text-slate-500 mt-1 font-medium">Manage hospital personnel, roles, and contact details.</p>
      </div>

      <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm space-y-8 animate-in fade-in duration-500">
        <h3 className="text-xl font-black text-slate-800 flex items-center gap-3">
          <span className="w-8 h-8 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center text-sm">
            {editingId ? '✏️' : '👤'}
          </span>
          {editingId ? 'Edit Team Member' : 'Add New Team Member'}
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label className={labelClass}>Name (EN)</label>
            <input value={formData.name.en} onChange={(e) => setFormData({...formData, name: {...formData.name, en: e.target.value}})} className={inputClass}/>
          </div>
          <div>
            <label className={labelClass}>Name (AR)</label>
            <input value={formData.name.ar} onChange={(e) => setFormData({...formData, name: {...formData.name, ar: e.target.value}})} className={inputClass}/>
          </div>
          <div>
            <label className={labelClass}>Role (EN)</label>
            <input value={formData.role.en} onChange={(e) => setFormData({...formData, role: {...formData.role, en: e.target.value}})} className={inputClass}/>
          </div>
          <div>
            <label className={labelClass}>Role (AR)</label>
            <input value={formData.role.ar} onChange={(e) => setFormData({...formData, role: {...formData.role, ar: e.target.value}})} className={inputClass}/>
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input type="email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className={inputClass}/>
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input type="tel" value={formData.phone} onChange={(e) => setFormData({...formData, phone: e.target.value})} className={inputClass}/>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>Bio (EN)</label>
            <textarea rows={2} value={formData.bio.en} onChange={(e) => setFormData({...formData, bio: {...formData.bio, en: e.target.value}})} className={inputClass}/>
          </div>
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>Bio (AR)</label>
            <textarea rows={2} value={formData.bio.ar} onChange={(e) => setFormData({...formData, bio: {...formData.bio, ar: e.target.value}})} className={inputClass}/>
          </div>
          
          <div className="md:col-span-2 lg:col-span-3">
            <label className={labelClass}>Profile Photo</label>
            <div className="flex items-center gap-6 bg-white p-4 rounded-2xl border border-slate-200">
              <div className="w-16 h-16 rounded-full overflow-hidden flex-shrink-0 bg-slate-100 border border-slate-200 shadow-inner">
                {formData.image ? <img src={formData.image} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-slate-300">👤</div>}
              </div>
              <input type="file" accept="image/*" onChange={handleFileUpload} className="text-xs file:bg-slate-900 file:text-white file:border-0 file:py-2 file:px-4 file:rounded-lg file:mr-4 file:cursor-pointer" />
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-4">
          {editingId && <button onClick={() => {
            setEditingId(null);
            setFormData({ id: '', name: { en: '', ar: '' }, role: { en: '', ar: '' }, bio: { en: '', ar: '' }, email: '', phone: '', image: '' });
          }} className="px-6 py-3 font-bold text-slate-400">Cancel</button>}
          <button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-xl font-black shadow-lg transition-all active:scale-95 text-sm uppercase tracking-widest">
            {editingId ? 'Update Member' : 'Save Member'}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.team.map((t: any) => (
          <div key={t.id} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-all">
            <div className="flex items-center gap-4 mb-6">
              <img src={t.image || "https://via.placeholder.com/150"} className="w-16 h-16 rounded-full object-cover border-2 border-slate-100" alt="" />
              <div>
                <h4 className="font-black text-slate-900">{t.name[lang]}</h4>
                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">{t.role[lang]}</p>
              </div>
            </div>
            <div className="space-y-2 mb-6">
               <p className="text-xs text-slate-500 flex items-center gap-2">✉️ {t.email || 'No email'}</p>
               <p className="text-xs text-slate-500 flex items-center gap-2">📞 {t.phone || 'No phone'}</p>
            </div>
            <div className="flex gap-4 pt-4 border-t border-slate-50">
              <button onClick={() => handleEdit(t)} className="flex-grow bg-slate-50 hover:bg-blue-50 text-blue-600 font-black py-2 rounded-xl text-[10px] uppercase tracking-widest transition-colors">Edit</button>
              <button onClick={() => handleDelete(t.id)} className="flex-grow bg-slate-50 hover:bg-red-50 text-red-500 font-black py-2 rounded-xl text-[10px] uppercase tracking-widest transition-colors">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamManager;
