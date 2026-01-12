
export type Language = 'en' | 'ar';

export interface LocalizedString {
  en: string;
  ar: string;
}

export interface Service {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  icon: string;
  image?: string;
}

export interface Program {
  id: string;
  title: LocalizedString;
  description: LocalizedString;
  schedule: LocalizedString;
  image: string;
}

export interface Facility {
  id: string;
  name: LocalizedString;
  description: LocalizedString;
  image: string;
}

export interface SocialLink {
  platform: 'LinkedIn' | 'Twitter' | 'Instagram' | 'Website';
  url: string;
}

export interface OnlineSession {
  id: string;
  memberId: string;
  title: LocalizedString;
  description: LocalizedString;
  date: string;
  time: string;
  platform: 'Zoom' | 'Google Meet' | 'Microsoft Teams' | 'In-House';
  meetingLink: string;
  socialLinks: SocialLink[];
  status: 'scheduled' | 'live' | 'completed';
}

export interface AvailabilitySlot {
  id: string;
  day: 'Monday' | 'Tuesday' | 'Wednesday' | 'Thursday' | 'Friday' | 'Saturday' | 'Sunday';
  startTime: string;
  endTime: string;
}

export interface PatientBooking {
  id: string;
  patientName: string;
  patientEmail: string;
  patientPhone: string;
  reason: string;
  memberId: string;
  date: string;
  timeSlot: string;
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
  createdAt: string;
}

export interface TeamMember {
  id: string;
  name: LocalizedString;
  role: LocalizedString;
  bio: LocalizedString;
  email: string;
  phone: string;
  image: string;
  availability?: AvailabilitySlot[];
}

export interface StaffSession {
  id: string;
  memberId: string;
  title: string;
  type: 'note' | 'report' | 'session';
  content: string;
  date: string;
  createdAt: string;
}

export interface Appointment {
  id: string;
  name: string;
  email: string;
  date: string;
  serviceId: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  persona: 'patient' | 'family' | 'inquiry';
}

export interface ContactRequest {
  id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
  status: 'new' | 'contacted' | 'archived';
  createdAt: string;
}

export interface Suggestion {
  id: string;
  name: string;
  message: string;
  createdAt: string;
}

export interface MusicConfig {
  sourceType: 'youtube' | 'mp3';
  youtubeId: string;
  mp3Data: string; // Base64 encoded MP3
  isEnabled: boolean;
  loop: boolean;
  volume: number;
}

export interface ChatConfig {
  systemInstructions: string;
  prompts: {
    patient: string;
    family: string;
    inquiry: string;
  };
  aiNote: LocalizedString;
  liveAgentEnabled: boolean;
  liveAgentStatus: LocalizedString;
}

export interface ContentData {
  logo: string;
  hospitalName: LocalizedString;
  tagline: LocalizedString;
  hero: {
    title: LocalizedString;
    subtitle: LocalizedString;
    image: string;
  };
  about: {
    story: LocalizedString;
    mission: LocalizedString;
    vision: LocalizedString;
    image: string;
  };
  contact: {
    email: string;
    phone: string;
    address: LocalizedString;
    socials: {
      facebook: string;
      twitter: string;
      instagram: string;
    };
  };
}

export type PersonaType = 'patient' | 'family' | 'inquiry' | 'live';

export interface ChatMessage {
  role: 'user' | 'model';
  parts: string;
}
