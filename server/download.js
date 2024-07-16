import ytdl from "ytdl-core"
import fs from "fs"

export const download = (idVideo) => new Promise((resolve, reject) => {
    const videoURL = 'https://www.youtube.com/shorts/' + idVideo;
    console.log("Id do video: ", idVideo);
    ytdl(videoURL, { quality: "lowestaudio", filter: "audioonly" })
        .on("info", (info) => {
            const seconds = info.formats[0].approxDurationMs / 1000;
            if (seconds > 60) {
                console.log("Não é um Short");
            }
        }).on('error', (error) => {
            console.log(`error: ${error}`);
            reject(error);
        }).on('end', () => {
            console.log('Download feito com sucesso!');
            resolve();
        })
        .pipe(fs.createWriteStream("./tmp/audio.mp4"));

});