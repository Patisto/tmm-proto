import Groq from "groq-sdk";
import 'dotenv/config';
import path from 'path';
import ollama from 'ollama';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import chalk from 'chalk'; // For "Offline" alert

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, '..', '.env') });

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY || 'dummy_key' });

export async function askMentor(question, context) {
    const prompt = `You are a Terminal Mastery Mentor. 
    User System: ${context.platform} (${context.arch})
    Current Shell: ${context.shell}
    Question: ${question}
    Provide the exact command inside a triple backtick code block and a 1-sentence explanation.`;

    try {
        //  Attempt Cloud Brain (Groq) 
        // If the key is the dummy_key, skip straight to Ollama
        if (!process.env.GROQ_API_KEY) {
            throw new Error("No API Key found");
        }

        const chatCompletion = await groq.chat.completions.create({
            messages: [{ role: "user", content: prompt }],
            model: "llama-3.1-8b-instant",
        });

        return chatCompletion.choices[0]?.message?.content;

    } catch (error) {
        //  Fallback to Local Brain (Ollama) 
        try {
            console.log(chalk.cyan("\n📡 Cloud unreachable. Connecting to Local Mentor (Ollama)..."));
            
            const response = await ollama.chat({
                model: 'llama3.2:latest',//preffrd model
                messages: [{ role: 'user', content: prompt }],
            });

            return response.message.content + "\n\n" + chalk.dim("(Responded via offline local model)");
            
        } catch (ollamaError) { 
            return "❌ Error: Both Cloud (Groq) and Local (Ollama) mentors are unavailable. Check if Ollama is running (`ollama serve`).";
        }
    }
}