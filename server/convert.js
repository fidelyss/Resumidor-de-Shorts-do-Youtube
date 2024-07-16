import fs from 'fs';
import wav from 'node-wav';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegstatic from 'ffmpeg-static';

const filepath = "./tmp/audio.mp4";
const outputPath = filepath.replace('.mp4', '.wav');
export const convert = () => new Promise((resolve, reject) => {
    console.log('Convertendo video');
    ffmpeg.setFfmpegPath(ffmpegstatic);
    ffmpeg()
    .input(filepath)
    .audioFrequency(16000)
    .audioChannels(1)
    .format('wav')
    .on('end',() => {
        const file = fs.readFileSync(outputPath);
        const decoded = wav.decode(file);
        const audioData = decoded.channelData[0];
        const floatArray = new Float32Array(audioData);
        console.log('Vídeo convertido com sucesso!')
        resolve(floatArray);
        fs.unlinkSync(outputPath);
    })
    .on('error',(error) =>{
        console.log('erro ao converter arquivo', error);
        reject(error);
    })
    .save(outputPath);
});

