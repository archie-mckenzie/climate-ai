import { NextResponse } from "next/server";
import queryAssistant from "../../../../js/openai/queryAssistant";
import addJob from "../../../../js/database/addJob";
import updateJob from "../../../../js/database/updateJob";

const { existsSync } = require("fs");
const fs = require("fs/promises");
const path = require("path");

function cleanJsonString(str) {
  return str.replace(/^\s*```\w*\n?|\n?```s*$/g, '');
}

async function executeAssistant(filepaths, instruction, id) {
  try {
    const unclean = await queryAssistant(filepaths, instruction)
    const clean = cleanJsonString(unclean)
    console.log(clean)
    const result = JSON.parse(clean)
    
    const succeeded = await updateJob(id, result)

    return succeeded
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

  const filePaths = [];

  try {
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

        const fullFilePath = path.join(destinationDirPath, file.name); // Full path including file name
        await fs.writeFile(fullFilePath, Buffer.from(fileArrayBuffer));

        filePaths.push(fullFilePath); // Push full file path to array
        index++;
    }
    return NextResponse.json({id: id});
  } catch(error) {
    console.log(error)
    return NextResponse.json({error: 'Oops'});
  } finally {
    if (filePaths != '') {
      Promise.all([
        executeAssistant(filePaths, 'fetchNetEmissions', id),
        executeAssistant(filePaths, 'fetchCompany', id),
        executeAssistant(filePaths, 'fetchSummary', id),
      ]).then((results) => {updateJob(id, { "completed": results.some(element => element === true) })})
    }
  }
}
