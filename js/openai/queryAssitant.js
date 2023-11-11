import fs from "fs";
import OpenAI from "openai";
const openai = new OpenAI();
openai.apiKey = process.env.OPENAI_API_KEY;

export default async function queryAssitant({ files, queryType=null, systemPrompt=null }) {
    for (const file of files) {
        newFile = await openai.files.create({
            file: fs.createReadStream(file),
            purpose: "assistants"
        });

        console.log(newFile);
    }
}