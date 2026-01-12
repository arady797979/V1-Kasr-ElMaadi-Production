
import { GoogleGenAI } from "@google/genai";
import { PersonaType, ContentData, TeamMember, Service } from "./types";

/**
 * PRODUCTION READY: This service uses the Google GenAI SDK directly.
 * The API key is sourced exclusively from process.env.API_KEY.
 */
export const getChatResponse = async (
  persona: PersonaType, 
  message: string, 
  history: any[], 
  personaInstruction: string,
  globalInstructions: string,
  hospitalData: { content: ContentData, team: TeamMember[], services: Service[] }
) => {
  // Fix: Create a new GoogleGenAI instance right before making an API call to ensure current credentials
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  // Extract and format hospital context for the system instruction
  const staffList = hospitalData.team.map(m => `${m.name.en} (${m.role.en})`).join(", ");
  const serviceList = hospitalData.services.map(s => s.title.en).join(", ");
  
  // Fix: Construct a detailed system instruction for the Gemini model
  const systemInstruction = `
    ${globalInstructions}
    
    Current Interaction Context:
    - User Persona: ${persona}
    - Specific Behavioral Guidance: ${personaInstruction}
    - Hospital Name: ${hospitalData.content.hospitalName.en}
    - Services Offered: ${serviceList}
    - Professional Medical Team: ${staffList}
    - Contact Phone: ${hospitalData.content.contact.phone}
    - Administrative Email: ${hospitalData.content.contact.email}
  `.trim();

  try {
    // Fix: Use ai.models.generateContent to query Gemini 3 Flash model with full history
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: [
        ...history.map(h => ({
          role: h.role,
          parts: [{ text: h.parts }]
        })),
        {
          role: 'user',
          parts: [{ text: message }]
        }
      ],
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    // Fix: Access response.text directly as a property, not a method
    return response.text;
  } catch (error) {
    console.error("Cleo Connection Error:", error);
    // Graceful fallback for API communication errors
    return `Cleo is resting right now. Please call us directly at ${hospitalData.content.contact.phone} for immediate assistance.`;
  }
};
