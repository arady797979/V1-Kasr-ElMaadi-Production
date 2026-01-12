
import React, { useState } from 'react';
import { useApp } from '../App';
import { Link } from 'react-router-dom';

const Home: React.FC = () => {
  const { data, setData, t, lang } = useApp();
  const [subEmail, setSubEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);
  const [contactSent, setContactSent] = useState(false);
  const hero = data.content.hero;

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (subEmail) {
      const newSubscribers = [...data.subscribers, { email: subEmail, date: new Date().toISOString() }];
      setData({ ...data, subscribers: newSubscribers });
      setSubEmail('');
      setSubscribed(true);
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  const handleContactRequest = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const name = (form.elements.namedItem('name') as HTMLInputElement).value;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const phone = (form.elements.namedItem('phone') as HTMLInputElement).value;
    const message = (form.elements.namedItem('message') as HTMLTextAreaElement).value;

    const newRequest = {
      id: Date.now().toString(),
      name,
      email,
      phone,
      message,
      status: 'new',
      createdAt: new Date().toISOString()
    };

    setData({ ...data, contactRequests: [...data.contactRequests, newRequest] });
    setContactSent(true);
    form.reset();
    setTimeout(() => setContactSent(false), 5000);
  };

  return (
    <div className="overflow-hidden bg-white">
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src={hero.image} 
            alt="Hero" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-[2px]"></div>
        </div>
        
        <div className="container mx-auto px-6 relative z-10 text-white text-center md:text-left">
          <div className="max-w-3xl animate-in fade-in slide-in-from-left-10 duration-1000">
            <h1 className="text-5xl md:text-7xl font-extrabold mb-6 leading-tight tracking-tight">
              <span className="typewriter-text typing-cursor">{t('', hero.title)}</span>
            </h1>
            <p className="text-xl md:text-2xl mb-10 text-slate-100 font-medium text-shadow-sm opacity-90">
              {t('', hero.subtitle)}
            </p>
            <div className="flex flex-wrap gap-4 justify-center md:justify-start">
              <Link to="/contact" className="bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-full font-bold transition-all transform hover:scale-105 shadow-2xl uppercase tracking-widest text-sm">
                {t('book')}
              </Link>
              <Link to="/about" className="bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/40 px-10 py-5 rounded-full font-bold transition-all uppercase tracking-widest text-sm">
                {t('readMore')}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Services */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">{t('services')}</h2>
            <div className="w-20 h-2 bg-emerald-500 mx-auto rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {data.services.slice(0, 3).map((service: any) => (
              <div key={service.id} className="group overflow-hidden rounded-[2.5rem] bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-white transition-all shadow-sm hover:shadow-2xl">
                <div className="clean-image-crop h-64">
                  <img src={service.image || "https://picsum.photos/800/450"} alt={t('', service.title)} className="w-full h-full object-cover" />
                </div>
                <div className="p-10">
                  <div className="text-4xl mb-6 group-hover:scale-110 transition-transform inline-block">{service.icon}</div>
                  <h3 className="text-2xl font-black mb-4 text-slate-900 tracking-tight">{t('', service.title)}</h3>
                  <p className="text-slate-500 mb-8 line-clamp-2 text-base leading-relaxed">{t('', service.description)}</p>
                  <Link to="/services" className="text-emerald-600 font-black hover:text-emerald-700 flex items-center gap-2 group/link uppercase tracking-widest text-xs">
                    {t('readMore')} <span className="transform transition-transform group-hover/link:translate-x-2">&rarr;</span>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Suggestion Box */}
      <section className="py-24 bg-slate-900 overflow-hidden relative border-b border-slate-800">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -mr-48 -mt-48"></div>
        <div className="container mx-auto px-6 max-w-4xl relative z-10">
          <div className="bg-slate-800/40 backdrop-blur-xl p-10 md:p-16 rounded-[3rem] shadow-2xl border border-slate-700/50">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4 text-center">
              {lang === 'en' ? 'Shape Our Future' : 'ساهم في تشكيل مستقبلنا'}
            </h2>
            <p className="text-center text-slate-400 mb-12 text-lg">
              {lang === 'en' ? 'Your feedback directly impacts our patient care standards.' : 'ملاحظاتك تؤثر بشكل مباشر على معايير رعاية المرضى لدينا.'}
            </p>
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.target as HTMLFormElement;
                const nameInput = form.elements.namedItem('name') as HTMLInputElement;
                const messageInput = form.elements.namedItem('message') as HTMLTextAreaElement;
                const name = nameInput.value;
                const msg = messageInput.value;
                const newSuggestions = [...data.suggestions, { id: Date.now().toString(), name, message: msg, createdAt: new Date().toISOString() }];
                setData({ ...data, suggestions: newSuggestions });
                form.reset();
                alert(lang === 'en' ? 'Thank you for your valuable feedback!' : 'شكراً جزيلاً لتعليقاتك القيمة!');
              }}
              className="space-y-8"
            >
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <label className="block text-xs font-black text-emerald-500 uppercase tracking-widest mb-3 ml-1">{lang === 'en' ? 'Full Name' : 'الاسم الكامل'}</label>
                  <input name="name" type="text" className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all shadow-inner" placeholder={lang === 'en' ? "e.g. John Doe" : "مثال: أحمد محمد"} required />
                </div>
                <div>
                  <label className="block text-xs font-black text-emerald-500 uppercase tracking-widest mb-3 ml-1">{lang === 'en' ? 'Subject' : 'الموضوع'}</label>
                  <select className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white focus:ring-2 focus:ring-emerald-500 outline-none transition-all appearance-none shadow-inner cursor-pointer">
                    <option className="bg-slate-900">{lang === 'en' ? 'General Feedback' : 'ملاحظات عامة'}</option>
                    <option className="bg-slate-900">{lang === 'en' ? 'Service Improvement' : 'تحسين الخدمات'}</option>
                    <option className="bg-slate-900">{lang === 'en' ? 'Support Inquiry' : 'استفسار عن الدعم'}</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-black text-emerald-500 uppercase tracking-widest mb-3 ml-1">{lang === 'en' ? 'Detailed Message' : 'الرسالة بالتفصيل'}</label>
                <textarea name="message" rows={5} className="w-full bg-slate-900/50 border border-slate-700 rounded-2xl px-6 py-4 text-white placeholder:text-slate-600 focus:ring-2 focus:ring-emerald-500 focus:border-transparent outline-none transition-all resize-none shadow-inner" placeholder={lang === 'en' ? "Tell us how we can improve..." : "أخبرنا كيف يمكننا التحسن..."} required></textarea>
              </div>
              <button className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-black py-5 rounded-2xl transition-all shadow-[0_10px_30px_rgba(16,185,129,0.3)] active:scale-[0.98] uppercase tracking-widest text-sm">
                {lang === 'en' ? 'Submit Suggestion' : 'إرسال الاقتراح'}
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Subscription Section */}
      <section className="py-24 bg-slate-900 relative">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl -ml-48 -mb-48"></div>
        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
           <div className="max-w-2xl mx-auto">
             <div className="w-24 h-24 bg-emerald-500/20 rounded-[2rem] flex items-center justify-center mx-auto mb-10 text-5xl shadow-xl border border-emerald-500/20">📧</div>
             <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
               {lang === 'en' ? 'Stay Informed' : 'ابق على اطلاع'}
             </h2>
             <p className="text-slate-400 text-lg md:text-xl mb-12 leading-relaxed opacity-80">
               {lang === 'en' ? 'Join 5,000+ subscribers receiving recovery tips, hospital news, and mental health resources directly in their inbox.' : 'انضم إلى أكثر من 5000 مشترك يتلقون نصائح التعافي وأخبار المستشفى وموارد الصحة النفسية مباشرة في بريدهم الوارد.'}
             </p>
             <form onSubmit={handleSubscribe} className="flex flex-col md:flex-row gap-4">
                <input 
                  type="email" 
                  value={subEmail}
                  onChange={(e) => setSubEmail(e.target.value)}
                  placeholder={lang === 'en' ? "Your email address" : "بريدك الإلكتروني"} 
                  className="flex-grow bg-slate-800 border border-slate-700 rounded-2xl px-10 py-6 text-white placeholder:text-slate-500 focus:ring-2 focus:ring-emerald-500 outline-none transition-all shadow-inner text-lg"
                  required
                />
                <button className="bg-emerald-600 hover:bg-emerald-500 text-white font-black px-12 py-6 rounded-2xl transition-all shadow-xl active:scale-[0.98] uppercase tracking-widest text-sm">
                  {lang === 'en' ? 'Subscribe Now' : 'اشترك الآن'}
                </button>
             </form>
             {subscribed && (
               <div className="mt-8 text-emerald-400 font-bold animate-bounce flex items-center justify-center gap-3">
                 <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                 <span className="text-lg">{lang === 'en' ? 'Successfully Subscribed!' : 'تم الاشتراك بنجاح!'}</span>
               </div>
             )}
           </div>
        </div>
      </section>

      {/* Compact Callback Request - RELOCATED & RESIZED */}
      <section className="py-20 bg-slate-50 border-t border-slate-100">
        <div className="container mx-auto px-6 max-w-4xl">
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden flex flex-col md:flex-row">
             <div className="md:w-1/3 p-8 bg-emerald-600 text-white flex flex-col justify-center text-center md:text-left">
                <h3 className="text-2xl font-black mb-4 leading-tight">
                  {lang === 'en' ? 'Expert Callback' : 'اتصال الخبراء'}
                </h3>
                <p className="text-emerald-50 text-sm opacity-90 leading-relaxed">
                  {lang === 'en' ? 'Speak with our clinical advisors within 24 hours.' : 'تحدث مع مستشارينا في غضون 24 ساعة.'}
                </p>
             </div>
             <div className="md:w-2/3 p-8">
                <form onSubmit={handleContactRequest} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <input name="name" type="text" placeholder={lang === 'en' ? "Full Name" : "الاسم الكامل"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm" required />
                  <input name="phone" type="tel" placeholder={lang === 'en' ? "Phone" : "الهاتف"} className="w-full bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm" required />
                  <div className="md:col-span-2 flex flex-col md:flex-row gap-4">
                     <input name="email" type="email" placeholder={lang === 'en' ? "Email" : "البريد"} className="flex-grow bg-slate-50 border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-emerald-500 transition-all text-sm" required />
                     <button type="submit" className="bg-slate-900 hover:bg-emerald-600 text-white font-black px-8 py-3 rounded-xl transition-all shadow-md active:scale-95 uppercase tracking-widest text-[10px]">
                        {lang === 'en' ? 'Request Call' : 'طلب اتصال'}
                     </button>
                  </div>
                </form>
                {contactSent && (
                  <p className="mt-4 text-xs text-emerald-600 font-bold text-center">
                    {lang === 'en' ? 'Request sent successfully!' : 'تم إرسال الطلب بنجاح!'}
                  </p>
                )}
             </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
