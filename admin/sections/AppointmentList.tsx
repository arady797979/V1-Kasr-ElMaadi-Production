
import React from 'react';
import { useApp } from '../../App';

const AppointmentList: React.FC = () => {
  const { data, setData, lang } = useApp();

  const updateStatus = (id: string, status: string) => {
    const newAppointments = data.appointments.map((a: any) => a.id === id ? { ...a, status } : a);
    setData({ ...data, appointments: newAppointments });
  };

  const deleteAppt = (id: string) => {
    if (confirm("Delete this appointment?")) {
      setData({ ...data, appointments: data.appointments.filter((a: any) => a.id !== id) });
    }
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-800">Appointment Management</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="bg-slate-50 text-slate-600 text-sm uppercase">
              <th className="p-4">Name</th>
              <th className="p-4">Service</th>
              <th className="p-4">Date</th>
              <th className="p-4">Status</th>
              <th className="p-4">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {data.appointments.map((a: any) => (
              <tr key={a.id} className="hover:bg-slate-50 transition-colors">
                <td className="p-4">
                  <div className="font-bold">{a.name}</div>
                  <div className="text-xs text-slate-400">{a.email}</div>
                </td>
                <td className="p-4 text-sm">
                  {data.services.find((s: any) => s.id === a.serviceId)?.title[lang] || 'General'}
                </td>
                <td className="p-4 text-sm">{a.date}</td>
                <td className="p-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-bold ${
                    a.status === 'confirmed' ? 'bg-emerald-100 text-emerald-700' : 
                    a.status === 'cancelled' ? 'bg-red-100 text-red-700' : 'bg-yellow-100 text-yellow-700'
                  }`}>
                    {a.status.toUpperCase()}
                  </span>
                </td>
                <td className="p-4 space-x-2">
                  <button onClick={() => updateStatus(a.id, 'confirmed')} className="text-emerald-600 hover:underline text-sm">Confirm</button>
                  <button onClick={() => updateStatus(a.id, 'cancelled')} className="text-red-600 hover:underline text-sm">Cancel</button>
                  <button onClick={() => deleteAppt(a.id)} className="text-slate-400 hover:underline text-sm">Delete</button>
                </td>
              </tr>
            ))}
            {data.appointments.length === 0 && (
              <tr>
                <td colSpan={5} className="p-10 text-center text-slate-400">No appointments scheduled yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AppointmentList;
