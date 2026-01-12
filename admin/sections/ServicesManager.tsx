
import React, { useState } from 'react';
import { useApp } from '../../App';
import { Service } from '../../types';

const ServicesManager: React.FC = () => {
  const { data, setData, lang } = useApp();
  const [editingId, setEditingId] = useState<string | null>(null);

  const [formData, setFormData] = useState<Service>({
    id: '',
    title: { en: '', ar: '' },
    description: { en: '', ar: '' },
    icon: '🏥',
    image: ''
  });

  const handleSave = () => {
    let newServices;
    if (editingId) {
      newServices = data.services.map((s: any) => s.id === editingId ? { ...formData, id: editingId } : s);
    } else {
      newServices = [...data.services, { ...formData, id: Date.now().toString() }];
    }
    setData({ ...data, services: newServices });
    setEditingId(null);
    setFormData({ id: '', title: { en: '', ar: '' }, description: { en: '', ar: '' }, icon: '🏥', image: '' });
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

  const handleEdit = (service: Service) => {
    setEditingId(service.id);
    setFormData(service);
  };

  const handleDelete = (id: string) => {
    if (confirm("Delete this service?")) {
      setData({ ...data, services: data.services.filter((s: any) => s.id !== id) });
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center border-b pb-4">
        <h2 className="text-2xl font-bold text-slate-800">Services Management</h2>
      </div>

      {/* Form */}
      <div className="bg-slate-50 p-6 rounded-xl border border-slate-200 space-y-4">
        <h3 className="font-bold text-slate-700">{editingId ? 'Edit Service' : 'Add New Service'}</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input 
            placeholder="Title (EN)" 
            value={formData.title.en} 
            onChange={(e) => setFormData({ ...formData, title: { ...formData.title, en: e.target.value } })}
            className="p-2 border rounded"
          />
          <input 
            placeholder="Title (AR)" 
            value={formData.title.ar} 
            onChange={(e) => setFormData({ ...formData, title: { ...formData.title, ar: e.target.value } })}
            className="p-2 border rounded"
          />
          <textarea 
            placeholder="Description (EN)" 
            value={formData.description.en} 
            onChange={(e) => setFormData({ ...formData, description: { ...formData.description, en: e.target.value } })}
            className="p-2 border rounded"
          />
          <textarea 
            placeholder="Description (AR)" 
            value={formData.description.ar} 
            onChange={(e) => setFormData({ ...formData, description: { ...formData.description, ar: e.target.value } })}
            className="p-2 border rounded"
          />
          <input 
            placeholder="Icon (Emoji)" 
            value={formData.icon} 
            onChange={(e) => setFormData({ ...formData, icon: e.target.value })}
            className="p-2 border rounded"
          />
          <div className="space-y-2">
            <label className="block text-xs font-bold text-slate-500 uppercase">Service Image</label>
            <input 
              type="file"
              accept="image/*"
              onChange={handleFileUpload}
              className="text-xs w-full"
            />
            {formData.image && (
              <img src={formData.image} className="w-20 h-20 object-cover rounded border" alt="Preview" />
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <button onClick={handleSave} className="bg-emerald-600 text-white px-6 py-2 rounded font-bold">{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button onClick={() => {
            setEditingId(null);
            setFormData({ id: '', title: { en: '', ar: '' }, description: { en: '', ar: '' }, icon: '🏥', image: '' });
          }} className="text-slate-500 underline">Cancel</button>}
        </div>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {data.services.map((s: any) => (
          <div key={s.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-slate-50 transition-colors">
            <div className="flex items-center gap-4">
              <span className="text-3xl">{s.icon}</span>
              <div className="w-12 h-12 rounded overflow-hidden flex-shrink-0 bg-slate-100">
                <img src={s.image} className="w-full h-full object-cover" alt="" />
              </div>
              <div>
                <h4 className="font-bold">{s.title[lang]}</h4>
                <p className="text-sm text-slate-500 line-clamp-1">{s.description[lang]}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button onClick={() => handleEdit(s)} className="text-blue-600 hover:underline">Edit</button>
              <button onClick={() => handleDelete(s.id)} className="text-red-600 hover:underline">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ServicesManager;
