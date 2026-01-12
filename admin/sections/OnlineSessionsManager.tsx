
import React, { useState } from 'react';
import { useApp } from '../../App';
import { OnlineSession, TeamMember, SocialLink, PatientBooking, AvailabilitySlot } from '../../types';

const OnlineSessionsManager: React.FC = () => {
  const { data, setData, lang } = useApp();
  const [activeTab, setActiveTab] = useState<'broadcasts' | 'availability' | 'bookings'>('bookings');
  const [editingId, setEditingId] = useState<string | null>(null);

  // Broadcast State
  const [formData, setFormData] = useState<Partial<OnlineSession>>({
    title: { en: '', ar: '' },
    description: { en: '', ar: '' },
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    platform: 'Zoom',
    meetingLink: '',
    memberId: '',
    status: 'scheduled',
    socialLinks: []
  });

  // Availability State
  const [availMemberId, setAvailMemberId] = useState('');
  const [newSlot, setNewSlot] = useState<Partial<AvailabilitySlot>>({ day: 'Monday', startTime: '09:00', endTime: '10:00' });

  const handleBroadcastSave = () => {
    if (!formData.memberId || !formData.title?.en) return alert("Specialist and Title (EN) are mandatory.");
    const sessionToSave = { ...formData, id: editingId || Date.now().toString() } as OnlineSession;
    const newList = editingId 
      ? data.onlineSessions.map((s: any) => s.id === editingId ? sessionToSave : s)
      : [...(data.onlineSessions || []), sessionToSave];
    setData({ ...data, onlineSessions: newList });
    resetBroadcastForm();
  };

  const resetBroadcastForm = () => {
    setEditingId(null);
    setFormData({ title: { en: '', ar: '' }, description: { en: '', ar: '' }, date: new Date().toISOString().split('T')[0], time: '14:00', platform: 'Zoom', meetingLink: '', memberId: '', status: 'scheduled', socialLinks: [] });
  };

  const handleUpdateBookingStatus = (id: string, status: PatientBooking['status']) => {
    const newList = data.patientBookings.map((b: any) => b.id === id ? { ...b, status } : b);
    setData({ ...data, patientBookings: newList });
  };

  const handleAddAvailability = () => {
    if (!availMemberId) return alert("Select a staff member.");
    const slot: AvailabilitySlot = {
      id: Date.now().toString(),
      day: newSlot.day as any,
      startTime: newSlot.startTime as any,
      endTime: newSlot.endTime as any
    };
    const newTeam = data.team.map((m: TeamMember) => {
      if (m.id === availMemberId) {
        return { ...m, availability: [...(m.availability || []), slot] };
      }
      return m;
    });
    setData({ ...data, team: newTeam });
  };

  const handleRemoveAvailability = (memberId: string, slotId: string) => {
    const newTeam = data.team.map((m: TeamMember) => {
      if (m.id === memberId) {
        return { ...m, availability: m.availability?.filter(s => s.id !== slotId) };
      }
      return m;
    });
    setData({ ...data, team: newTeam });
  };

  const inputClass = "w-full p-4 bg-white border border-zinc-200 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm placeholder:text-zinc-300";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 px-1";

  return (
    <div className="space-y-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 border-b border-zinc-100 pb-8">
        <div>
          <h2 className="text-4xl font-black text-slate-900 tracking-tight">Virtual Care Command Center</h2>
          <p className="text-slate-500 font-medium mt-1">Manage private consultations and public health broadcasts.</p>
        </div>
        <div className="flex bg-zinc-100 p-1.5 rounded-2xl border border-zinc-200 shadow-inner">
           {(['bookings', 'availability', 'broadcasts'] as const).map(tab => (
             <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-6 py-3 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-400 hover:text-slate-600'}`}
             >
               {tab}
             </button>
           ))}
        </div>
      </div>

      {activeTab === 'bookings' && (
        <div className="space-y-8 animate-in fade-in duration-500">
           <div className="grid grid-cols-1 gap-6">
              {data.patientBookings?.length > 0 ? (
                data.patientBookings.sort((a:any, b:any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()).map((b: PatientBooking) => {
                  const expert = data.team.find((t: any) => t.id === b.memberId);
                  return (
                    <div key={b.id} className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-10 group relative overflow-hidden">
                       <div className="flex-grow space-y-4">
                          <div className="flex items-center gap-4">
                             <div className="w-14 h-14 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black text-xl shadow-lg">
                               {b.patientName[0].toUpperCase()}
                             </div>
                             <div>
                                <h4 className="text-2xl font-black text-slate-900">{b.patientName}</h4>
                                <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Requested on {new Date(b.createdAt).toLocaleDateString()}</span>
                             </div>
                             <span className={`ml-4 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
                               b.status === 'confirmed' ? 'bg-emerald-50 text-emerald-600' : 
                               b.status === 'pending' ? 'bg-blue-50 text-blue-600' : 'bg-zinc-100 text-slate-400'
                             }`}>
                               {b.status}
                             </span>
                          </div>
                          
                          <div className="flex flex-wrap gap-6 text-sm text-slate-600 font-medium p-6 bg-zinc-50 rounded-[2rem] border border-zinc-100">
                             <span className="flex items-center gap-2">👨‍⚕️ Expert: <span className="text-slate-900 font-black">{expert?.name[lang]}</span></span>
                             <span className="flex items-center gap-2">📅 Date: <span className="text-slate-900 font-black">{b.date}</span></span>
                             <span className="flex items-center gap-2">⏰ Slot: <span className="text-slate-900 font-black">{b.timeSlot}</span></span>
                             <span className="flex items-center gap-2">📞 Phone: <span className="text-slate-900 font-black">{b.patientPhone}</span></span>
                             <span className="flex items-center gap-2">✉️ Email: <span className="text-slate-900 font-black">{b.patientEmail}</span></span>
                          </div>

                          <div className="p-5 text-slate-500 italic text-sm leading-relaxed">
                            " {b.reason} "
                          </div>
                       </div>

                       <div className="flex flex-col gap-3 min-w-[180px]">
                          {b.status === 'pending' && (
                            <button onClick={() => handleUpdateBookingStatus(b.id, 'confirmed')} className="w-full bg-emerald-600 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest shadow-lg shadow-emerald-100 hover:scale-105 transition-all">Approve Session</button>
                          )}
                          <button onClick={() => handleUpdateBookingStatus(b.id, 'cancelled')} className="w-full bg-zinc-100 text-slate-400 font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:text-red-500 transition-all">Cancel Booking</button>
                          <button onClick={() => setData({...data, patientBookings: data.patientBookings.filter((pb:any) => pb.id !== b.id)})} className="text-[10px] font-black text-slate-300 hover:text-red-500 uppercase tracking-widest text-center mt-2">Permanently Delete</button>
                       </div>
                    </div>
                  );
                })
              ) : (
                <div className="py-40 bg-zinc-50 border-4 border-dashed border-zinc-200 rounded-[4rem] text-center flex flex-col items-center justify-center grayscale opacity-30">
                   <span className="text-9xl mb-8">📥</span>
                   <p className="text-2xl font-black text-slate-400 uppercase tracking-widest">No patient bookings queue</p>
                </div>
              )}
           </div>
        </div>
      )}

      {activeTab === 'availability' && (
        <div className="space-y-12 animate-in fade-in duration-500">
           {/* Add Availability Form */}
           <div className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200 shadow-sm space-y-10">
              <h3 className="text-2xl font-black text-slate-800">Assign Clinic Availability</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-end">
                 <div className="md:col-span-1">
                    <label className={labelClass}>Specialist</label>
                    <select value={availMemberId} onChange={(e) => setAvailMemberId(e.target.value)} className={inputClass}>
                       <option value="">Select Staff</option>
                       {data.team.map((m: any) => <option key={m.id} value={m.id}>{m.name[lang]}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className={labelClass}>Weekday</label>
                    <select value={newSlot.day} onChange={(e) => setNewSlot({...newSlot, day: e.target.value as any})} className={inputClass}>
                       {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                 </div>
                 <div>
                    <label className={labelClass}>Start Time</label>
                    <input type="time" value={newSlot.startTime} onChange={(e) => setNewSlot({...newSlot, startTime: e.target.value})} className={inputClass} />
                 </div>
                 <div>
                    <label className={labelClass}>End Time</label>
                    <input type="time" value={newSlot.endTime} onChange={(e) => setNewSlot({...newSlot, endTime: e.target.value})} className={inputClass} />
                 </div>
              </div>
              <button onClick={handleAddAvailability} className="bg-slate-900 text-white px-12 py-5 rounded-2xl font-black shadow-xl active:scale-95 uppercase tracking-widest text-xs transition-all hover:bg-emerald-600">
                Register Slot to Staff
              </button>
           </div>

           {/* Availability List per Staff */}
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {data.team.map((m: TeamMember) => (
                <div key={m.id} className="bg-white p-10 rounded-[3rem] border border-zinc-100 shadow-sm">
                   <div className="flex items-center gap-4 mb-8">
                      <img src={m.image} className="w-12 h-12 rounded-xl object-cover grayscale" />
                      <div>
                        <h4 className="font-black text-slate-900 leading-none mb-1">{m.name[lang]}</h4>
                        <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">{m.role[lang]}</span>
                      </div>
                   </div>
                   <div className="space-y-3">
                      {m.availability?.map(slot => (
                        <div key={slot.id} className="flex items-center justify-between p-4 bg-zinc-50 rounded-2xl border border-zinc-100 group">
                           <div className="flex items-center gap-4 text-xs font-black text-slate-700 uppercase tracking-widest">
                              <span className="text-emerald-500">●</span> {slot.day}
                              <span className="text-slate-300">|</span>
                              <span>{slot.startTime} - {slot.endTime}</span>
                           </div>
                           <button onClick={() => handleRemoveAvailability(m.id, slot.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-all font-black">×</button>
                        </div>
                      ))}
                      {(!m.availability || m.availability.length === 0) && (
                         <div className="py-6 text-center text-slate-300 font-bold uppercase tracking-widest text-[10px]">No slots registered</div>
                      )}
                   </div>
                </div>
              ))}
           </div>
        </div>
      )}

      {activeTab === 'broadcasts' && (
        <div className="space-y-12 animate-in fade-in duration-500">
          {/* ... existing broadcast manager content from previous turns ... */}
          <div className="bg-zinc-50 p-10 rounded-[3rem] border border-zinc-200 shadow-sm space-y-10">
             <h3 className="text-2xl font-black text-slate-800">Launch Webinar Broadcast</h3>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="space-y-6">
                   <div>
                     <label className={labelClass}>Broadcast Title (EN)</label>
                     <input value={formData.title?.en} onChange={(e) => setFormData({...formData, title: {...formData.title!, en: e.target.value}})} className={inputClass} />
                   </div>
                   <div>
                     <label className={labelClass}>Clinical Expert</label>
                     <select value={formData.memberId} onChange={(e) => setFormData({...formData, memberId: e.target.value})} className={inputClass}>
                        <option value="">Select Staff</option>
                        {data.team.map((m: any) => <option key={m.id} value={m.id}>{m.name[lang]}</option>)}
                     </select>
                   </div>
                </div>
                {/* ... other broadcast inputs ... */}
             </div>
             <button onClick={handleBroadcastSave} className="bg-emerald-600 text-white px-12 py-5 rounded-2xl font-black shadow-xl active:scale-95 uppercase tracking-widest text-xs">Publish Broadcast</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineSessionsManager;
