
import React, { useState } from 'react';
import { useApp } from '../../App';
import { StaffSession, TeamMember } from '../../types';

const UniversalCalendar: React.FC = () => {
  const { data, lang } = useApp();
  const [filterType, setFilterType] = useState<'all' | 'session' | 'appointment'>('all');

  // Group everything by date
  const eventsByDate: Record<string, any[]> = {};

  // Add staff sessions
  data.staffSessions.forEach((s: StaffSession) => {
    if (!eventsByDate[s.date]) eventsByDate[s.date] = [];
    const member = data.team.find((t: TeamMember) => t.id === s.memberId);
    eventsByDate[s.date].push({ ...s, eventType: 'staff', member });
  });

  // Add patient appointments
  data.appointments.forEach((a: any) => {
    if (!eventsByDate[a.date]) eventsByDate[a.date] = [];
    eventsByDate[a.date].push({ ...a, title: `Appt: ${a.name}`, eventType: 'appointment' });
  });

  const sortedDates = Object.keys(eventsByDate).sort((a, b) => new Date(a).getTime() - new Date(b).getTime());

  const labelClass = "block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1.5 px-1";

  return (
    <div className="space-y-12 pb-20">
      <div className="border-b border-slate-100 pb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
        <div>
          <h2 className="text-3xl font-black text-slate-900 tracking-tight">Universal Team Calendar</h2>
          <p className="text-slate-500 mt-1 font-medium">Global view of all clinical sessions and patient appointments.</p>
        </div>
        <div className="flex bg-slate-100 p-1.5 rounded-2xl border border-slate-200">
           <button 
            onClick={() => setFilterType('all')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filterType === 'all' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
           >
             All Events
           </button>
           <button 
            onClick={() => setFilterType('session')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filterType === 'session' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
           >
             Staff Only
           </button>
           <button 
            onClick={() => setFilterType('appointment')}
            className={`px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${filterType === 'appointment' ? 'bg-white shadow-md text-emerald-600' : 'text-slate-500 hover:text-slate-700'}`}
           >
             Patient Only
           </button>
        </div>
      </div>

      <div className="space-y-10">
        {sortedDates.length > 0 ? (
          sortedDates.map((date) => {
            const filteredEvents = eventsByDate[date].filter(ev => {
              if (filterType === 'all') return true;
              if (filterType === 'session') return ev.eventType === 'staff';
              if (filterType === 'appointment') return ev.eventType === 'appointment';
              return true;
            });

            if (filteredEvents.length === 0) return null;

            return (
              <div key={date} className="animate-in fade-in slide-in-from-left-4 duration-500">
                <div className="flex items-center gap-6 mb-6">
                  <div className="flex flex-col items-center justify-center w-24 h-24 bg-slate-900 text-white rounded-[2rem] shadow-xl border-4 border-white">
                    <span className="text-2xl font-black leading-none">{new Date(date).getDate()}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest mt-1 opacity-60">
                      {new Date(date).toLocaleString('default', { month: 'short' })}
                    </span>
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-slate-900">{new Date(date).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</h3>
                    <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest">{filteredEvents.length} Scheduled Activities</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ml-4 md:ml-10 pl-6 md:pl-10 border-l-2 border-slate-100">
                  {filteredEvents.map((ev, i) => (
                    <div key={i} className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-lg transition-all border-l-8 hover:scale-[1.02]" style={{ borderLeftColor: ev.eventType === 'appointment' ? '#3b82f6' : '#10b981' }}>
                       <div className="flex justify-between items-start mb-4">
                          <span className={`text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full ${ev.eventType === 'appointment' ? 'bg-blue-50 text-blue-600' : 'bg-emerald-50 text-emerald-600'}`}>
                            {ev.eventType === 'appointment' ? 'Patient' : ev.type}
                          </span>
                       </div>
                       <h4 className="font-bold text-slate-800 mb-2">{ev.title}</h4>
                       {ev.member && (
                         <div className="flex items-center gap-2 mb-4">
                           <img src={ev.member.image} className="w-6 h-6 rounded-full object-cover" />
                           <span className="text-xs font-bold text-slate-500">{ev.member.name[lang]}</span>
                         </div>
                       )}
                       <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed italic">"{ev.content || (ev.status ? `Status: ${ev.status}` : 'No description')}"</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })
        ) : (
          <div className="py-40 text-center flex flex-col items-center justify-center bg-slate-50 border-4 border-dashed border-slate-100 rounded-[3rem]">
             <span className="text-7xl mb-6 grayscale opacity-20">📅</span>
             <h3 className="text-2xl font-black text-slate-300 uppercase tracking-widest">Global schedule is clear</h3>
             <p className="text-sm font-medium text-slate-400 mt-2">No future staff sessions or patient appointments found.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UniversalCalendar;
