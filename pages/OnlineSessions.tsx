
import React, { useState } from 'react';
import { useApp } from '../App';
import { OnlineSession, TeamMember, PatientBooking, AvailabilitySlot } from '../types';

const OnlineSessions: React.FC = () => {
  const { data, setData, t, lang } = useApp();
  const [selectedExpert, setSelectedExpert] = useState<string | 'all'>('all');
  const [bookingExpert, setBookingExpert] = useState<TeamMember | null>(null);
  const [bookingStep, setBookingStep] = useState<1 | 2>(1);
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: new Date().toISOString().split('T')[0],
    slotId: '',
    reason: ''
  });

  const sessions = data.onlineSessions || [];
  const filteredSessions = selectedExpert === 'all' 
    ? sessions 
    : sessions.filter((s: OnlineSession) => s.memberId === selectedExpert);

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!bookingExpert) return;

    const slot = bookingExpert.availability?.find(s => s.id === bookingData.slotId);
    const timeString = slot ? `${slot.startTime} - ${slot.endTime}` : 'TBD';

    const newBooking: PatientBooking = {
      id: Date.now().toString(),
      patientName: bookingData.name,
      patientEmail: bookingData.email,
      patientPhone: bookingData.phone,
      reason: bookingData.reason,
      memberId: bookingExpert.id,
      date: bookingData.date,
      timeSlot: timeString,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    setData({
      ...data,
      patientBookings: [...(data.patientBookings || []), newBooking]
    });

    alert(lang === 'en' ? 'Booking request submitted! We will contact you shortly.' : 'تم إرسال طلب الحجز! سنتصل بك قريباً.');
    setBookingExpert(null);
    setBookingStep(1);
    setBookingData({ name: '', email: '', phone: '', date: new Date().toISOString().split('T')[0], slotId: '', reason: '' });
  };

  return (
    <div className="min-h-screen bg-zinc-100 pt-20 pb-24">
      <div className="container mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16 max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-6 py-2 rounded-full text-xs font-black uppercase tracking-widest mb-6 border border-emerald-200 shadow-sm">
            <span className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></span>
            {lang === 'en' ? 'Telehealth Center' : 'مركز الرعاية عن بعد'}
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-slate-900 mb-8 tracking-tighter leading-tight">
            {lang === 'en' ? 'Virtual Care Hub' : 'محور الرعاية الافتراضية'}
          </h1>
          <p className="text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto font-medium">
            {lang === 'en' 
              ? 'Book private sessions with our experts or join upcoming clinical broadcasts.' 
              : 'احجز جلسات خاصة مع خبرائنا أو انضم إلى البث السريري القادم.'}
          </p>
        </div>

        {/* Private Booking Section */}
        <div className="bg-white rounded-[3rem] p-12 mb-20 shadow-xl border border-white">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12">
            <div>
              <h2 className="text-3xl font-black text-slate-900 tracking-tight">{lang === 'en' ? 'Private 1:1 Consultations' : 'استشارات خاصة 1:1'}</h2>
              <p className="text-slate-500 font-medium">Select an expert to view their clinical availability.</p>
            </div>
            <div className="w-20 h-2 bg-emerald-500 rounded-full hidden md:block"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {data.team.map((member: TeamMember) => (
              <div key={member.id} className="p-8 bg-zinc-50 rounded-[2.5rem] border border-zinc-100 hover:shadow-lg transition-all flex flex-col items-center text-center group">
                <img src={member.image} className="w-24 h-24 rounded-3xl object-cover mb-6 shadow-md grayscale group-hover:grayscale-0 transition-all border-4 border-white" alt="" />
                <h3 className="text-xl font-black text-slate-900 leading-tight mb-1">{member.name[lang]}</h3>
                <p className="text-[10px] text-emerald-600 font-black uppercase tracking-widest mb-4">{member.role[lang]}</p>
                <p className="text-xs text-slate-400 mb-8 line-clamp-2 px-4 italic leading-relaxed">"{member.bio[lang]}"</p>
                
                <button 
                  onClick={() => setBookingExpert(member)}
                  className="w-full bg-slate-900 text-white font-black py-4 rounded-2xl text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all active:scale-95"
                >
                  {lang === 'en' ? 'Check Availability' : 'تحقق من التوفر'}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Public Sessions Feed */}
        <div className="mb-20">
          <div className="flex items-center gap-4 mb-12">
             <span className="w-12 h-1 bg-emerald-500 rounded-full"></span>
             <h2 className="text-2xl font-black text-slate-900 uppercase tracking-widest">{lang === 'en' ? 'Upcoming Broadcasts' : 'البث القادم'}</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {filteredSessions.map((session: OnlineSession) => {
              const expert = data.team.find((t: TeamMember) => t.id === session.memberId);
              return (
                <div key={session.id} className="bg-white rounded-[2.5rem] border border-white shadow-sm overflow-hidden flex flex-col group relative">
                   {/* status logic from previous turn */}
                   <div className="p-10 flex-grow">
                      <h3 className="text-2xl font-black text-slate-900 mb-4">{session.title[lang]}</h3>
                      <div className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl mb-6">
                         <img src={expert?.image} className="w-10 h-10 rounded-xl object-cover" alt="" />
                         <span className="text-xs font-black text-slate-700">{expert?.name[lang]}</span>
                      </div>
                      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400">
                        <span>📅 {session.date}</span>
                        <span>⏰ {session.time}</span>
                      </div>
                   </div>
                   <button className="m-6 bg-slate-900 text-white py-4 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-emerald-600 transition-all">Join Session</button>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Booking Modal */}
      {bookingExpert && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-slate-900/80 backdrop-blur-sm animate-in fade-in duration-300">
          <div className="bg-white w-full max-w-2xl rounded-[3rem] shadow-2xl overflow-hidden animate-in slide-in-from-bottom-10 duration-500 border-4 border-white">
            <div className="bg-emerald-600 p-8 text-white flex justify-between items-center">
              <div className="flex items-center gap-4">
                <img src={bookingExpert.image} className="w-16 h-16 rounded-2xl object-cover border-2 border-white/20" alt="" />
                <div>
                   <h3 className="text-2xl font-black tracking-tighter">{lang === 'en' ? 'Booking Session' : 'حجز جلسة'}</h3>
                   <p className="text-xs font-bold text-emerald-100 uppercase tracking-widest opacity-80">{bookingExpert.name[lang]}</p>
                </div>
              </div>
              <button onClick={() => setBookingExpert(null)} className="w-12 h-12 bg-white/10 rounded-2xl flex items-center justify-center hover:bg-white/20 transition-all font-black">×</button>
            </div>

            <form onSubmit={handleBookingSubmit} className="p-10 space-y-8 max-h-[70vh] overflow-y-auto custom-scrollbar">
              {bookingStep === 1 ? (
                <div className="space-y-6 animate-in fade-in slide-in-from-right-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Preferred Date</label>
                      <input type="date" value={bookingData.date} onChange={(e) => setBookingData({...bookingData, date: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none shadow-inner" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Available Slots</label>
                      <select value={bookingData.slotId} onChange={(e) => setBookingData({...bookingData, slotId: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none shadow-inner" required>
                        <option value="">Select Time Slot</option>
                        {bookingExpert.availability?.map((s: AvailabilitySlot) => (
                          <option key={s.id} value={s.id}>{s.day}: {s.startTime} - {s.endTime}</option>
                        ))}
                        {(!bookingExpert.availability || bookingExpert.availability.length === 0) && (
                           <option disabled>No recurring slots available</option>
                        )}
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Reason for consultation</label>
                    <textarea value={bookingData.reason} onChange={(e) => setBookingData({...bookingData, reason: e.target.value})} rows={3} className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none shadow-inner" placeholder="Briefly describe what you would like to discuss..." required />
                  </div>
                  <button type="button" onClick={() => setBookingStep(2)} className="w-full bg-slate-900 text-white font-black py-5 rounded-[1.5rem] shadow-xl hover:bg-emerald-600 transition-all uppercase tracking-widest text-xs">
                    Next: Patient Details &rarr;
                  </button>
                </div>
              ) : (
                <div className="space-y-6 animate-in fade-in slide-in-from-left-4">
                  <div>
                    <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Patient Full Name</label>
                    <input type="text" value={bookingData.name} onChange={(e) => setBookingData({...bookingData, name: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none shadow-inner" required />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Email Address</label>
                      <input type="email" value={bookingData.email} onChange={(e) => setBookingData({...bookingData, email: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none shadow-inner" required />
                    </div>
                    <div>
                      <label className="block text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">Phone Number</label>
                      <input type="tel" value={bookingData.phone} onChange={(e) => setBookingData({...bookingData, phone: e.target.value})} className="w-full p-4 bg-zinc-50 border border-zinc-100 rounded-2xl text-slate-900 font-bold focus:ring-2 focus:ring-emerald-500 outline-none shadow-inner" required />
                    </div>
                  </div>
                  <div className="flex gap-4 pt-4">
                    <button type="button" onClick={() => setBookingStep(1)} className="px-8 py-5 text-slate-400 font-black uppercase tracking-widest text-xs">Back</button>
                    <button type="submit" className="flex-grow bg-emerald-600 text-white font-black py-5 rounded-[1.5rem] shadow-xl hover:bg-emerald-700 transition-all uppercase tracking-widest text-xs">
                      Confirm Booking Request
                    </button>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default OnlineSessions;
