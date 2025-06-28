import dotenv from 'dotenv';
dotenv.config();
import fs from 'fs';
import path from 'path';
import { OpenAI } from 'openai';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * ! NÃO ESTA FUNCIONANDO
 * TODO: TROQUE POR OUTRA IA QUE SEJA GRATUITA
 */

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);


const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY
});

export const transcribe = async () => {
    const audioPath = path.resolve(__dirname, '../tmp/audio.wav');


    const transcription = await openai.audio.transcriptions.create({
        file: fs.createReadStream(audioPath),
        model: 'whisper-1',
        response_format: 'text' // só o texto direto
    });

    return transcription;
};
