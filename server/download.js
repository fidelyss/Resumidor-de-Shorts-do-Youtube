import { exec } from "child_process";
import path from "path";
import { fileURLToPath } from "url";
import { dirname } from "path";
import ffmpegPath from "ffmpeg-static";


// Para usar __dirname em módulo ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/**
 * @param {string} idVideo
 * @returns {Promise<void>}
 */
export const download = (idVideo) => new Promise((resolve, reject) => {
    const videoURL = `https://www.youtube.com/watch?v=${idVideo}`;
    const outputPath = path.resolve(__dirname, "../tmp/audio.mp3");

    const ytDlpPath = `"C:\\Users\\aliss\\AppData\\Roaming\\Python\\Python313\\Scripts\\yt-dlp.exe"`;
    const command = `${ytDlpPath} -x --audio-format mp3 --ffmpeg-location "${ffmpegPath}" -o "${outputPath}" "${videoURL}"`;


    console.log("🔁 Executando comando:", command);

    exec(command, (error, stdout, stderr) => {
        if (error) {
            console.error("❌ Erro no yt-dlp:", stderr);
            return reject(error);
        }
        console.log("✅ Download concluído!");
        resolve();
    });
});
