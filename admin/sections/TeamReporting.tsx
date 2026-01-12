
import React, { useState } from 'react';
import { useApp } from '../../App';
import { StaffSession, TeamMember } from '../../types';

const TeamReporting: React.FC = () => {
  const { data, setData, lang } = useApp();
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showForm, setShowForm] = useState(false);

  const [formData, setFormData] = useState<Partial<StaffSession>>({
    title: '',
    type: 'note',
    content: '',
    date: new Date().toISOString().split('T')[0]
  });

  const handleSave = () => {
    if (!selectedMember || !formData.title || !formData.content) return;
    
    const newSession: StaffSession = {
      id: Date.now().toString(),
      memberId: selectedMember.id,
      title: formData.title,
      type: formData.type as 'note' | 'report' | 'session',
      content: formData.content,
      date: formData.date || new Date().toISOString().split('T')[0],
      createdAt: new Date().toISOString()
    };

    setData({
      ...data,
      staffSessions: [...data.staffSessions, newSession]
    });
    
    setShowForm(false);
    setFormData({ title: '', type: 'note', content: '', date: new Date().toISOString().split('T')[0] });
    alert("Record added successfully!");
  };

  const deleteSession = (id: string) => {
    if (confirm("Delete this record?")) {
      setData({ ...data, staffSessions: data.staffSessions.filter((s: any) => s.id !== id) });
    }
  };

  const inputClass = "w-full p-3 bg-white border border-slate-200 rounded-xl text-slate-900 font-medium focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm";
  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1";

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Team Reporting & Activity</h2>
        <p className="text-slate-500 mt-1 font-medium">Log sessions, reports, and internal notes for clinical staff.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-10">
        {/* Sidebar: Staff List */}
        <div className="lg:col-span-1 space-y-4">
          <h3 className={labelClass}>Select Staff Member</h3>
          <div className="space-y-2 overflow-y-auto max-h-[60vh] pr-2 custom-scrollbar">
            {data.team.map((member: TeamMember) => (
              <button
                key={member.id}
                onClick={() => {
                  setSelectedMember(member);
                  setShowForm(false);
                }}
                className={`w-full flex items-center gap-3 p-4 rounded-2xl border transition-all text-left ${
                  selectedMember?.id === member.id 
                    ? 'bg-emerald-600 border-emerald-600 text-white shadow-lg' 
                    : 'bg-white border-slate-100 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <img src={member.image} className="w-10 h-10 rounded-full object-cover border border-white/20" />
                <div className="flex flex-col">
                  <span className="font-bold text-sm leading-none mb-1">{member.name[lang]}</span>
                  <span className={`text-[10px] font-black uppercase tracking-tighter ${selectedMember?.id === member.id ? 'text-emerald-100' : 'text-emerald-600'}`}>
                    {member.role[lang]}
                  </span>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Main Content: Logs & Form */}
        <div className="lg:col-span-3">
          {selectedMember ? (
            <div className="space-y-8 animate-in fade-in duration-300">
              <div className="flex justify-between items-center bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm">
                 <div>
                    <h3 className="text-xl font-black text-slate-900">Activity Log: {selectedMember.name[lang]}</h3>
                    <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mt-1">Total Records: {data.staffSessions.filter((s:any) => s.memberId === selectedMember.id).length}</p>
                 </div>
                 <button 
                  onClick={() => setShowForm(!showForm)}
                  className="bg-slate-900 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg transition-all active:scale-95"
                 >
                   {showForm ? 'Close Form' : 'Add Record'}
                 </button>
              </div>

              {showForm && (
                <div className="bg-slate-50 p-8 rounded-[2rem] border border-slate-100 shadow-inner space-y-6 animate-in slide-in-from-top-4 duration-500">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2">
                      <label className={labelClass}>Title / Subject</label>
                      <input 
                        value={formData.title} 
                        onChange={(e) => setFormData({...formData, title: e.target.value})}
                        className={inputClass}
                        placeholder="e.g. Afternoon Counseling Session"
                      />
                    </div>
                    <div>
                      <label className={labelClass}>Type</label>
                      <select 
                        value={formData.type} 
                        onChange={(e) => setFormData({...formData, type: e.target.value as any})}
                        className={inputClass}
                      >
                        <option value="note">Internal Note</option>
                        <option value="report">Clinical Report</option>
                        <option value="session">Scheduled Session</option>
                      </select>
                    </div>
                    <div className="md:col-span-1">
                      <label className={labelClass}>Date</label>
                      <input 
                        type="date"
                        value={formData.date} 
                        onChange={(e) => setFormData({...formData, date: e.target.value})}
                        className={inputClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label className={labelClass}>Details / Content</label>
                    <textarea 
                      rows={4}
                      value={formData.content} 
                      onChange={(e) => setFormData({...formData, content: e.target.value})}
                      className={inputClass}
                      placeholder="Write detailed observation or report content..."
                    />
                  </div>
                  <div className="flex justify-end">
                    <button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 rounded-xl font-black shadow-lg transition-all text-xs uppercase tracking-widest">
                      Submit Record
                    </button>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 gap-4">
                {data.staffSessions.filter((s:any) => s.memberId === selectedMember.id).sort((a:any, b:any) => new Date(b.date).getTime() - new Date(a.date).getTime()).map((session: StaffSession) => (
                  <div key={session.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm flex items-start gap-4 group">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl flex-shrink-0 ${
                      session.type === 'report' ? 'bg-blue-100 text-blue-600' : 
                      session.type === 'session' ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'
                    }`}>
                      {session.type === 'report' ? '📄' : session.type === 'session' ? '📅' : '📝'}
                    </div>
                    <div className="flex-grow">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-bold text-slate-900">{session.title}</h4>
                          <span className="text-[10px] font-black uppercase tracking-widest opacity-40">{session.date} • {session.type}</span>
                        </div>
                        <button onClick={() => deleteSession(session.id)} className="text-slate-300 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/></svg>
                        </button>
                      </div>
                      <p className="text-sm text-slate-600 leading-relaxed italic">"{session.content}"</p>
                    </div>
                  </div>
                ))}
                {data.staffSessions.filter((s:any) => s.memberId === selectedMember.id).length === 0 && (
                  <div className="py-20 text-center bg-slate-50 border-4 border-dashed border-slate-100 rounded-[2rem] flex flex-col items-center justify-center opacity-40">
                    <span className="text-6xl mb-4 grayscale">🗂️</span>
                    <p className="font-bold text-slate-400 uppercase tracking-widest">No activity recorded for this member.</p>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex flex-col items-center justify-center py-40 bg-slate-50 border border-slate-100 rounded-[2.5rem] text-slate-300">
               <span className="text-7xl mb-6">🩺</span>
               <h3 className="text-xl font-black uppercase tracking-widest">Select a staff member to view logs</h3>
               <p className="text-sm font-medium mt-2">Activity and reporting history will appear here.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TeamReporting;
