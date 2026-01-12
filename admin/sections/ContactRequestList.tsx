
import React from 'react';
import { useApp } from '../../App';

const ContactRequestList: React.FC = () => {
  const { data, setData } = useApp();

  const updateStatus = (id: string, status: string) => {
    const newRequests = data.contactRequests.map((r: any) => r.id === id ? { ...r, status } : r);
    setData({ ...data, contactRequests: newRequests });
  };

  const deleteRequest = (id: string) => {
    if (confirm("Remove this callback request?")) {
      setData({ ...data, contactRequests: data.contactRequests.filter((r: any) => r.id !== id) });
    }
  };

  return (
    <div className="space-y-12">
      <div className="border-b border-slate-100 pb-8">
        <h2 className="text-3xl font-black text-slate-900 tracking-tight">Callback Requests</h2>
        <p className="text-slate-500 mt-1 font-medium">Inquiries from the homepage "Request to be Contacted" section.</p>
      </div>

      <div className="grid grid-cols-1 gap-6">
        {data.contactRequests.map((r: any) => (
          <div key={r.id} className={`p-8 rounded-[2.5rem] border transition-all flex flex-col md:flex-row justify-between items-start md:items-center gap-8 ${r.status === 'contacted' ? 'bg-slate-50 border-slate-100 opacity-70' : 'bg-white border-emerald-100 shadow-md'}`}>
            <div className="space-y-4 max-w-2xl">
              <div className="flex items-center gap-4">
                 <div className="w-12 h-12 bg-slate-900 text-white rounded-2xl flex items-center justify-center font-black">
                   {r.name[0].toUpperCase()}
                 </div>
                 <div>
                   <h4 className="text-xl font-black text-slate-900">{r.name}</h4>
                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest">Requested {new Date(r.createdAt).toLocaleString()}</p>
                 </div>
              </div>
              <div className="flex flex-wrap gap-6 text-sm text-slate-600 font-medium">
                 <span className="flex items-center gap-2">📞 {r.phone}</span>
                 <span className="flex items-center gap-2">✉️ {r.email}</span>
              </div>
              <div className="p-5 bg-slate-50 rounded-2xl text-slate-700 italic text-sm leading-relaxed border border-slate-100">
                "{r.message}"
              </div>
            </div>
            <div className="flex flex-col gap-3 min-w-[150px]">
               {r.status === 'new' ? (
                 <button 
                  onClick={() => updateStatus(r.id, 'contacted')}
                  className="bg-emerald-600 text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-emerald-100 hover:bg-emerald-700 transition-all"
                 >
                   Mark Contacted
                 </button>
               ) : (
                 <span className="text-center py-3 text-xs font-black text-slate-400 uppercase tracking-widest">Responded</span>
               )}
               <button 
                onClick={() => deleteRequest(r.id)}
                className="text-xs font-black text-red-500 hover:text-red-700 uppercase tracking-widest py-2"
               >
                 Delete Request
               </button>
            </div>
          </div>
        ))}
        {data.contactRequests.length === 0 && (
          <div className="py-20 text-center flex flex-col items-center justify-center border-4 border-dashed border-slate-100 rounded-[3rem]">
             <span className="text-6xl mb-6 grayscale opacity-20">📞</span>
             <p className="font-bold text-slate-300 uppercase tracking-widest">No callback requests yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ContactRequestList;
