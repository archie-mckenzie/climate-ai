import { NextResponse } from "next/server";
import queryAssitant from "../../../../js/openai/queryAssitant";
import addJob from "../../../../js/database/addJob";
import updateJob from "../../../../js/database/updateJob";

const { existsSync } = require("fs");
const fs = require("fs/promises");
const path = require("path");

async function executeAssistant(filepaths, instruction, id) {
  try {
    const result = await queryAssitant(filepaths, instruction)
    console.log(result)
    return false
  } catch(error) {
    console.log(error)
    return false
  }
}

export async function POST(req) {
  const formData = await req.formData();

  if (!formData) {
    return;
  }

  const id = await addJob();

  if (id === '') {
    return NextResponse.json({error: 'ID is blank'});
  }

  let fullFilePath = ''

  try {
    const filePaths = [];
    let index = 0;
    while (true) {

        const f = formData.get(`files-${index}`);

        if (f === null) {
            break;
        }

        const file = f;
    
        const destinationDirPath = path.join(process.cwd(), "public/upload");
        const fileArrayBuffer = await file.arrayBuffer();

        if (!existsSync(destinationDirPath)) {
            await fs.mkdir(destinationDirPath, { recursive: true });
        }

        fullFilePath = path.join(destinationDirPath, file.name); // Full path including file name
        await fs.writeFile(fullFilePath, Buffer.from(fileArrayBuffer));

        filePaths.push(fullFilePath); // Push full file path to array
        index++;
    }
    return NextResponse.json({id: id});
  } catch(error) {
    console.log(error)
    return NextResponse.json({error: 'Oops'});
  } finally {
    if (fullFilePath != '') {
      const results = await Promise.all([
        executeAssistant(fullFilePath, 'fetchNetEmissions', id),
        executeAssistant(fullFilePath, 'fetchCompany', id),
        executeAssistant(fullFilePath, 'fetchSummary', id),
      ]);
      updateJob(id, { "completed": results });
    }
  }
}
