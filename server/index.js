import cors from 'cors';
import express from 'express';
import { download } from './download.js';
import { convert } from './convert.js';
import { summarize } from './summarize.js';
import { transcribe } from './transcribe.js';

const app = express();
app.use(express.json());
app.use(cors());
app.listen(4444, () => console.log('server open'));
app.get('/summary/:id', async (req, res) => {
    try {
        await download(req.params.id);
        await convert();
        const result = await transcribe();
        res.json({ result });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message || "Erro interno" });
    }
});
app.post('/summary', async (request, response) => {
    const result = await summarize(request.body.text);
    response.json({ result });
});

