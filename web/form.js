import { server } from './server.js'
const form = document.querySelector('#form');
const input = document.querySelector('#url');
const parag = document.querySelector('#parag');
form.addEventListener('submit', async (e) => {
    parag.classList.add('placehouder');
    e.preventDefault();
    const urlValue = input.value;
    if (!urlValue.includes('/shorts')) {
        return parag.textContent = 'Isso não parece ser um short';
    }
    const [_, params] = urlValue.split('/shorts/');
    const [videoId] = params.split('?si');
    parag.textContent = 'transcrevendo video...';
    const transcription = await server.get('/summary/' + videoId);
    console.log('video transcrito!');
    parag.textContent = 'resumindo video...';
    
    const summary = await server.post('/summary', {
        text:`${transcription.data.result}`,
    });
    console.log('video resumido!');

    parag.textContent = `${summary.data.result}`;
    parag.classList.remove('placehouder');
});