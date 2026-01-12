
# Serenity Path Hospital Portal

A professional, bilingual mental health and addiction hospital platform. Designed for production deployment using React, Tailwind CSS, and Firebase.

## 🚀 Quick Start (Local)

1. **Install dependencies:**
   ```bash
   npm install
   ```
2. **Setup environment:**
   Copy `.env.example` to `.env` and update the `VITE_API_BASE_URL` to your backend endpoint.
3. **Run development server:**
   ```bash
   npm run dev
   ```

## 🛡️ Production Security

- **No API Keys in Client:** This application does not call the Google Gemini API directly. It relies on a backend proxy (Node.js/Python/Go) to securely handle AI requests using server-side environment variables.
- **Environment Variables:** All sensitive URLs are managed via `.env` files.
- **Admin Access:** The `/admin` routes are protected by an authentication guard (ready for Firebase Auth integration in `auth.ts`).

## 📦 Deployment (Firebase Hosting)

1. **Build the project:**
   ```bash
   npm run build
   ```
2. **Install Firebase CLI:**
   ```bash
   npm install -g firebase-tools
   ```
3. **Login and Initialize:**
   ```bash
   firebase login
   # Choose Hosting
   firebase init
   ```
4. **Deploy:**
   ```bash
   firebase deploy
   ```

## 🤖 Cleo (Clinical AI Assistant)

Cleo is configured as an empathetic clinical assistant. 
- **Persona:** Professional, empathetic, optimistic.
- **Leaders:** Specifically programmed to highlight the expertise of Dr. Zeinab, Mohamed Makled, and Dr. Samir.
- **Safety:** Instructed to avoid drug-specific medical advice and redirect to clinical support.

## 🛠️ Tech Stack
- **Frontend:** React 19 (Vite)
- **Styling:** Tailwind CSS
- **Routing:** React Router (HashRouter for simplified hosting)
- **AI Integration:** Secure backend proxy for Google Gemini 3
- **Audio:** Custom HTML5 & IFrame dual-engine player
