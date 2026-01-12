
import React, { useState } from 'react';
import { useApp } from '../App';

const Contact: React.FC = () => {
  const { data, setData, t, lang } = useApp();
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const date = (form.elements.namedItem('date') as HTMLInputElement).value;
    const serviceId = (form.elements.namedItem('service') as HTMLSelectElement).value;

    const newAppointment = {
      id: Date.now().toString(),
      name,
      email,
      date,
      serviceId,
      status: 'pending',
      persona: 'inquiry'
    };

    setData({ ...data, appointments: [...data.appointments, newAppointment] });
    setSent(true);
    form.reset();
    setTimeout(() => setSent(false), 5000);
  };

  return (
    <div className="pt-20 pb-24">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <h1 className="text-4xl font-bold text-slate-800 mb-8">{t('contact')}</h1>
            <p className="text-slate-600 mb-12 text-lg">We are here to listen and help. Reach out to us anytime for a confidential consultation or to schedule a visit.</p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-6 p-6 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0">📍</div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">{lang === 'en' ? 'Address' : 'العنوان'}</h4>
                  {/* Fix: Pass LocalizedString to t() */}
                  <p className="text-slate-500">{t('', data.content.contact.address)}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 p-6 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0">📞</div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">{lang === 'en' ? 'Phone' : 'الهاتف'}</h4>
                  <p className="text-slate-500">{data.content.contact.phone}</p>
                </div>
              </div>
              <div className="flex items-start gap-6 p-6 bg-slate-50 rounded-2xl">
                <div className="w-12 h-12 bg-emerald-600 text-white rounded-full flex items-center justify-center flex-shrink-0">✉️</div>
                <div>
                  <h4 className="font-bold text-slate-800 mb-1">{lang === 'en' ? 'Email' : 'البريد'}</h4>
                  <p className="text-slate-500">{data.content.contact.email}</p>
                </div>
              </div>
            </div>

            <div className="mt-12 w-full h-80 rounded-3xl overflow-hidden border border-slate-200">
               <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3454.1234567890!2d31.2357!3d30.0444!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMzDCsDAyJzQwLjAiTiAzMcKwMTQnMDguNSJF!5e0!3m2!1sen!2seg!4v1620000000000!5m2!1sen!2seg" 
                width="100%" height="100%" frameBorder="0" style={{border:0}} allowFullScreen={true} aria-hidden="false" tabIndex={0} title="Hospital Location"></iframe>
          </div>
          </div>

          <div className="bg-white p-10 rounded-3xl shadow-xl border border-slate-100">
            <h2 className="text-3xl font-bold text-slate-800 mb-8">{t('book')}</h2>
            {sent && (
              <div className="mb-6 p-4 bg-emerald-50 text-emerald-700 rounded-xl border border-emerald-100 text-center font-bold">
                {lang === 'en' ? 'Your appointment request has been received! We will contact you soon.' : 'تم استلام طلب موعدك! سنتصل بك قريباً.'}
              </div>
            )}
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{lang === 'en' ? 'Full Name' : 'الاسم الكامل'}</label>
                <input name="name" type="text" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{lang === 'en' ? 'Email Address' : 'البريد الإلكتروني'}</label>
                <input name="email" type="email" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{lang === 'en' ? 'Preferred Date' : 'التاريخ المفضل'}</label>
                  <input name="date" type="date" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">{lang === 'en' ? 'Service Interested In' : 'الخدمة المهتم بها'}</label>
                  <select name="service" className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all" required>
                    {data.services.map((s: any) => (
                      /* Fix: Pass LocalizedString to t() */
                      <option key={s.id} value={s.id}>{t('', s.title)}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">{lang === 'en' ? 'Message / Note' : 'رسالة / ملاحظة'}</label>
                <textarea rows={4} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all"></textarea>
              </div>
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-4 rounded-xl shadow-lg transition-all transform hover:-translate-y-1">
                {t('book')}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
