import dotenv from 'dotenv';
dotenv.config();

/**
 * ! NÃO ESTA FUNCIONANDO
 * TODO: TROQUE POR OUTRA IA QUE SEJA GRATUITA
 */
import { OpenAI } from 'openai';

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const summarize = async (text) => {
    const response = await openai.chat.completions.create({
        model: 'gpt-4',
        messages: [
            { role: "system", content: "Você é um assistente que resume textos de forma clara e objetiva." },
            { role: "user", content: `Resuma o texto a seguir:\n\n${text}` }
        ]
    });

    return response.choices[0].message.content;
};
