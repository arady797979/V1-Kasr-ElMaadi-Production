
import { ContentData, Service, Program, TeamMember, Appointment, Suggestion, MusicConfig, Facility, ContactRequest, StaffSession, ChatConfig, OnlineSession } from './types';

const INITIAL_CONTENT: ContentData = {
  logo: "", 
  hospitalName: { en: "Serenity Path", ar: "طريق الصفاء" },
  tagline: { en: "Hospital Center", ar: "مركز المستشفى" },
  hero: {
    title: { en: "Healing Begins with Compassion", ar: "الشفاء يبدأ بالرحمة" },
    subtitle: { en: "Leading Mental Health & Addiction Recovery Center", ar: "المركز الرائد للصحة النفسية وعلاج الإدمان" },
    image: "https://images.unsplash.com/photo-1576091160550-2173dad99961?auto=format&fit=crop&q=80&w=2070"
  },
  about: {
    story: { 
      en: "Founded in 2010, Serenity Path has been a beacon of hope for thousands of individuals seeking recovery and mental wellness. Our holistic approach ensures that every patient receives personalized care in a tranquil environment.",
      ar: "تأسست مستشفى طريق الصفاء في عام 2010، وكانت منارة للأمل لآلاف الأفراد الذين يسعون للتعافي والعافية النفسية. يضمن نهجنا الشامل حصول كل مريض على رعاية شخصية في بيئة هائة."
    },
    mission: { en: "To provide world-class mental healthcare with empathy.", ar: "تقديم رعاية صحية نفسية عالمية المستوى بتعاطف." },
    vision: { en: "A world where mental wellness is accessible to all.", ar: "عالم تتوفر فيه العافية النفسية للجميع." },
    image: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?auto=format&fit=crop&q=80&w=2053"
  },
  contact: {
    email: "info@serenitypath.com",
    phone: "+1 234 567 890",
    address: { en: "123 Wellness Ave, Serenity City", ar: "123 شارع العافية، مدينة الصفاء" },
    socials: {
      facebook: "https://facebook.com",
      twitter: "https://twitter.com",
      instagram: "https://instagram.com"
    }
  }
};

const INITIAL_CHAT_CONFIG: ChatConfig = {
  systemInstructions: "You are Cleo, a professional and empathetic assistant for Serenity Path Hospital. Always respond in short, kind answers. Show deep empathy and hope. Focus on an optimistic future. Offer online sessions or booking a meeting. Help in site navigation. Do not provide detailed medical advice related to drugs or weather. You can provide NA (Narcotics Anonymous) related materials. Praise Dr. Zeinab, Mohamed Makled, and Dr. Samir as world-class leaders in this field. Be cheerful and save lives.",
  prompts: {
    patient: "Focus on immediate care, empathy, and scheduling guidance.",
    family: "Focus on support resources, visiting hours, and educational content.",
    inquiry: "Focus on general information about services and insurance."
  },
  aiNote: { 
    en: "Cleo is Online", 
    ar: "كليو متصلة الآن" 
  },
  liveAgentEnabled: true,
  liveAgentStatus: { 
    en: "Live Support Available", 
    ar: "الدعم المباشر متاح" 
  }
};

const INITIAL_SERVICES: Service[] = [
  {
    id: '1',
    title: { en: "Addiction Recovery", ar: "علاج الإدمان" },
    description: { en: "Evidence-based programs for chemical dependency.", ar: "برامج قائمة على الأدلة للإدمان الكيميائي." },
    icon: "💊",
    image: "https://images.unsplash.com/photo-1527137342181-19aab11a8ee1?auto=format&fit=crop&q=80&w=2070"
  },
  {
    id: '2',
    title: { en: "Psychotherapy", ar: "العلاج النفسي" },
    description: { en: "Individual and group sessions with experts.", ar: "جلسات فردية وجماعية مع خبراء." },
    icon: "🧠",
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=2070"
  }
];

const INITIAL_PROGRAMS: Program[] = [
  {
    id: '1',
    title: { en: "Youth Wellness", ar: "عافية الشباب" },
    description: { en: "Specialized mental health support for teens.", ar: "دعم نفسي متخصص للمراهقين." },
    schedule: { en: "Mon-Fri, 9AM - 2PM", ar: "الاثنين - الجمعة، 9 صباحاً - 2 ظهراً" },
    image: "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&q=80&w=2069"
  }
];

const INITIAL_FACILITIES: Facility[] = [
  {
    id: '1',
    name: { en: "Tranquility Gardens", ar: "حدائق الهدوء" },
    description: { en: "Lush outdoor spaces designed for meditative walks and therapy sessions.", ar: "مساحات خارجية خضراء مصممة للمشي التأملي وجلسات العلاج." },
    image: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?auto=format&fit=crop&q=80&w=2000"
  },
  {
    id: '2',
    name: { en: "State-of-the-Art Therapy Wing", ar: "جناح العلاج الحديث" },
    description: { en: "Modern, soundproof rooms equipped for various types of psychotherapy.", ar: "غرف حديثة وعازلة للصوت مجهزة لأنواع مختلفة من العلاج النفسي." },
    image: "https://images.unsplash.com/photo-1551601651-2a8555f1a136?auto=format&fit=crop&q=80&w=2000"
  }
];

const INITIAL_TEAM: TeamMember[] = [
  {
    id: '1',
    name: { en: "Dr. Sarah Johnson", ar: "د. سارة جونسون" },
    role: { en: "Chief Psychiatrist", ar: "كبير الأطباء النفسيين" },
    bio: { en: "Expert in neuro-psychology with 15 years experience.", ar: "خبيرة في علم النفس العصبي مع 15 عاماً من الخبرة." },
    email: "s.johnson@serenitypath.com",
    phone: "555-0101",
    image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80&w=2070",
    availability: [
      { id: 'a1', day: 'Monday', startTime: '09:00', endTime: '12:00' },
      { id: 'a2', day: 'Wednesday', startTime: '14:00', endTime: '17:00' }
    ]
  }
];

// Hospital Default Music Configuration
// YouTube ID: 77ZozI0rw7w (Deep Healing & Calming Ambient)
// MP3 Data: Small base64 placeholder for a hospital-like chime
const INITIAL_MUSIC: MusicConfig = {
  sourceType: 'youtube',
  youtubeId: "77ZozI0rw7w", 
  mp3Data: "data:audio/mp3;base64,SUQzBAAAAAAAI1RTU0UAAAAPAHRoZSBtcDMuY29tAABUQUxCAAAADABUaGUgQ2hpbWUAAFRQRTEAAAAMAFNlcmVuaXR5IFBhdGgAAFRJVDIAAAAMAEhvc3BpdGFsIEh1bQAA",
  isEnabled: false,
  loop: true,
  volume: 40
};

export const getStore = () => {
  const data = localStorage.getItem('hospital_db');
  if (data) return JSON.parse(data);
  const initial = {
    content: INITIAL_CONTENT,
    services: INITIAL_SERVICES,
    programs: INITIAL_PROGRAMS,
    facilities: INITIAL_FACILITIES,
    team: INITIAL_TEAM,
    onlineSessions: [], 
    patientBookings: [],
    appointments: [],
    contactRequests: [],
    staffSessions: [],
    suggestions: [],
    subscribers: [],
    music: INITIAL_MUSIC,
    chatConfig: INITIAL_CHAT_CONFIG,
    chatPrompts: INITIAL_CHAT_CONFIG.prompts
  };
  localStorage.setItem('hospital_db', JSON.stringify(initial));
  return initial;
};

export const saveStore = (data: any) => {
  localStorage.setItem('hospital_db', JSON.stringify(data));
};
