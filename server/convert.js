import fs from 'fs';
import path from 'path';
import wav from 'node-wav';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegstatic from 'ffmpeg-static';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const filepath = path.resolve(__dirname, '../tmp/audio.mp3');
const parsedPath = path.parse(filepath);
const outputPath = path.format({ ...parsedPath, base: undefined, ext: '.wav' });

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const convert = () => new Promise((resolve, reject) => {
  console.log('🎛️ Convertendo áudio (.mp3 → .wav)...');
  ffmpeg.setFfmpegPath(ffmpegstatic);

  ffmpeg()
    .input(filepath)
    .audioFrequency(16000)
    .audioChannels(1)
    .format('wav')
    .on('stderr', (stderrLine) => {
      console.log('ffmpeg stderr:', stderrLine);
    })
    .on('error', (error) => {
      console.error('❌ Erro ao converter arquivo:', error);
      reject(error);
    })
    .on('end', async () => {
      console.log(`✅ Conversão concluída, arquivo salvo em: ${outputPath}`);

      if (!fs.existsSync(outputPath)) {
        console.error('❌ Arquivo WAV não encontrado após a conversão:', outputPath);
        return reject(new Error('Arquivo WAV não encontrado'));
      }

      // Pequeno delay para garantir que o arquivo está pronto
      await sleep(200);

      try {
        const file = fs.readFileSync(outputPath);
        const decoded = wav.decode(file);
        const audioData = decoded.channelData[0];
        const floatArray = new Float32Array(audioData);

        // Agora sim, remover arquivos temporários

        resolve(floatArray);
      } catch (err) {
        console.error("❌ Erro ao ler arquivo WAV:", err);
        reject(err);
      }
    })
    .save(outputPath);
});
