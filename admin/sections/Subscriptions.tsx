
import React, { useState } from 'react';
import { useApp } from '../../App';

const Subscriptions: React.FC = () => {
  const { data, setData } = useApp();
  const [searchTerm, setSearchTerm] = useState('');

  const deleteSub = (email: string) => {
    if (confirm(`Unsubscribe ${email}?`)) {
      setData({ ...data, subscribers: data.subscribers.filter((s: any) => s.email !== email) });
    }
  };

  const filteredSubscribers = data.subscribers.filter((s: any) => 
    s.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8">
      <div className="border-b border-slate-100 pb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Subscription Management</h2>
        <p className="text-slate-500 mt-1 font-medium">Manage your mailing list and newsletter reach.</p>
      </div>

      <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 shadow-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-10">
          <div>
            <h3 className="text-4xl font-black text-emerald-600">{data.subscribers.length}</h3>
            <p className="text-xs font-black text-slate-400 uppercase tracking-widest mt-1">Total Active Members</p>
          </div>
          <div className="w-full md:w-96 relative">
            <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400">🔍</span>
            <input 
              type="text" 
              placeholder="Search subscribers..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-white border border-slate-200 rounded-2xl pl-12 pr-5 py-4 focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-sm"
            />
          </div>
          <button className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-4 rounded-2xl text-xs font-black uppercase tracking-widest shadow-lg transition-all active:scale-95">
            Export Contacts
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {filteredSubscribers.map((s: any, i: number) => (
            <div key={i} className="flex flex-col md:flex-row justify-between items-start md:items-center p-6 bg-white border border-slate-100 rounded-2xl hover:shadow-md transition-all group">
              <div className="flex items-center gap-4 mb-4 md:mb-0">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center font-black">
                  {s.email[0].toUpperCase()}
                </div>
                <div>
                  <span className="font-bold text-slate-800 block">{s.email}</span>
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Added on {new Date(s.date).toLocaleDateString()}</span>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="bg-emerald-100 text-emerald-700 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Verified</div>
                <button 
                  onClick={() => deleteSub(s.email)} 
                  className="text-slate-300 hover:text-red-500 transition-colors p-2"
                  title="Remove Subscriber"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                  </svg>
                </button>
              </div>
            </div>
          ))}
          {filteredSubscribers.length === 0 && (
            <div className="py-20 text-center flex flex-col items-center justify-center border-4 border-dashed border-slate-200 rounded-[2rem]">
               <span className="text-5xl mb-4 opacity-20">📭</span>
               <p className="font-bold text-slate-400 uppercase tracking-widest">No subscribers found.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Subscriptions;
