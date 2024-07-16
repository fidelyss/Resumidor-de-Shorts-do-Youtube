import { pipeline } from "@xenova/transformers"

export async function summarize(text) {
    try {

        const generator = await pipeline(
            'summarization',
            'Xenova/distilbart-cnn-12-6'
        );
        const output = await generator(text);
        console.log('realizanda o resumo');
        return output[0].summary_text;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }

}