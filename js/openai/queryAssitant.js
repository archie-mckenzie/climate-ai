import fs from "fs";
import OpenAI from "openai";
const openai = new OpenAI();
openai.apiKey = process.env.OPENAI_API_KEY;

export default async function queryAssitant( files, queryType ) {
    try {
        let fileIDs = [];

        console.log(files)

        for (const file of files) {
            const newFile = await openai.files.create({
                file: fs.createReadStream(file),
                purpose: "assistants"
            });
            fileIDs.push(newFile.id);
        }

        const instructions = "You are an analyst of company emissions data. " +
                             "You are given a series of PDFs regarding a comapny's revenues, priduction, and emissions data, " +
                             "and it is your task to respond to any questions that can be answered by reading through and analyzing the files. " +
                             "Return your analysis in whichever format is requested.";

        const assistant = await openai.beta.assistants.create({
            name: "Greenalyze",
            instructions: instructions,
            tools: [{ type: "retrieval" }],
            model: "gpt-4-1106-preview",
            file_ids: fileIDs
        })

        const thread = await openai.beta.threads.create();

        if ( queryType === 'fetchNetEmissions') {
            const prompt = "What were the analyzed company's net carbon (CO2) emissions for the past fiscal year? " +
                           "Give me only the raw number, formatted as the following JSON:\n" +
                           "{\n" +
                           "    \"net_carbon_emissions\": integer value of net carbon emissions\n" +
                           "}";
            
            const threadMessage = await openai.beta.threads.messages.create(
                thread.id,
                { role: "user", content: prompt }
            );
            
            const run = await openai.beta.threads.runs.create(
                thread.id,
                { 
                  assistant_id: assistant.id
                }
            );

            while (true) {
                const currentRun = await openai.beta.threads.runs.retrieve(
                    thread.id,
                    run.id
                );

                if (currentRun.status === 'completed') {
                    const messages = await openai.beta.threads.messages.list(
                        thread.id
                    );
                    return messages.body.data[0].content[0].text.value
                }
            }
        } else if ( queryType === 'fetchCompany' ) {
            const prompt = "What is the ticker of the stock of company being analyzed? " +
                           "That is, identify the company based on the files, then use your own " +
                           "knowledge to identify the correct ticker. " +
                           "Give me only the raw string name, formatted as the following JSON:\n" +
                           "{\n" +
                           "    \"company_name\": stock ticker of the company\n" +
                           "}";
                
            const threadMessage = await openai.beta.threads.messages.create(
                thread.id,
                { role: "user", content: prompt }
            );

            const run = await openai.beta.threads.runs.create(
                thread.id,
                { 
                  assistant_id: assistant.id
                }
            );

            while (true) {
                const currentRun = await openai.beta.threads.runs.retrieve(
                    thread.id,
                    run.id
                );

                if (currentRun.status === 'completed') {
                    const messages = await openai.beta.threads.messages.list(
                        thread.id
                    );
                    return messages.body.data[0].content[0].text.value
                }
            }
        } else if ( queryType === 'fetchSummary' ) {
            const prompt = "Give me a summary of 5 key points about the analyzed company's environmental plans in the past " +
                           "and how they will change going forward, making sure to include details about past " +
                           "emissions and whether or not much has changed in recent times. " +
                           "Do not be lenient with a company if they are guilty of excess emissions. " +
                           "Return a JSON in the following format:" +
                           "{\n" +
                           "    \"summary\": string summary of environmental plans\n" +
                           "}";

            const threadMessage = await openai.beta.threads.messages.create(
                thread.id,
                { role: "user", content: prompt }
            );

            const run = await openai.beta.threads.runs.create(
                thread.id,
                { 
                  assistant_id: assistant.id
                }
            );

            while (true) {
                const currentRun = await openai.beta.threads.runs.retrieve(
                    thread.id,
                    run.id
                );

                if (currentRun.status === 'completed') {
                    const messages = await openai.beta.threads.messages.list(
                        thread.id
                    );
                    return messages.body.data[0].content[0].text.value
                }
            }
        }
        console.log("Done")
    } catch(error) {
        console.log("Error:", error)
    }

}