import fs from "fs";
import OpenAI from "openai";
const openai = new OpenAI();
openai.apiKey = process.env.OPENAI_API_KEY;

export default async function queryAssitant( files, queryType, systemPrompt ) {
    try {
        console.log("We actually entered query assistant!!!")
        let fileIDs = [];

        console.log(files)

        for (const file of files) {
            const newFile = await openai.files.create({
                file: fs.createReadStream(file),
                purpose: "assistants"
            });
            console.log(newFile);
            fileIDs.push(newFile.id);
        }

        const instructions = "You are an analyst of company emissions data. " +
                             "You are given a series of PDFs regarding a comapny's revenues, priduction, and emissions data, " +
                             "and it is your task to respond to any questions that can be answered by reading through and analyzing the files. " +
                             "Return your analysis in whichever format is requested.";

        const assistant = await openai.beta.assistants.create({
            name: "Greenalyze",
            instructions: instructions,
            tools: [{ type: "code_interpreter" }],
            model: "gpt-4-1106-preview",
            file_ids: fileIDs
        })

        if ( queryType === 'checkCompanyType') {
            const thread = openai.beta.threads.create();
        }
    } catch(error) {
        console.log("Error:",error)
    }

}