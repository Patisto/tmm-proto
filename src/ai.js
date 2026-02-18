import Groq from "groq-sdk";
import 'dotenv/config';
import path from 'path';
import { fileURLToPath } from 'url'; 
import dotenv from 'dotenv';
// compatibility with Windows \ and Linux /
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load .env from the root folder of the project
dotenv.config({ path: path.join(__dirname, '..', '.env') });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function askMentor(question, context) {
   const prompt = `You are a Terminal Mastery Mentor. 
    User System: ${context.platform} (${context.arch})
    Current Shell: ${context.shell}
    Question: ${question}
    Provide the exact command and a 1-sentence explanation.`;
    
    const chatCompletion = await groq.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        model: "llama-3.1-8b-instant", // model 2GB fast
    });

    return chatCompletion.choices[0]?.message?.content || "No response.";
}