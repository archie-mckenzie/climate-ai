import { NextResponse } from "next/server";
import queryAssitant from "../../../../js/openai/queryAssitant";
import addJob from "../../../../js/database/addJob";

const { existsSync } = require("fs");
const fs = require("fs/promises");
const path = require("path");

export async function POST(req) {
  const formData = await req.formData();

  if (!formData) {
    return;
  }

  //const id = await addJob();

  //if (id === '') {
    //return;
    // add internal server error
  //}
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

        const fullFilePath = path.join(destinationDirPath, file.name); // Full path including file name
        await fs.writeFile(fullFilePath, Buffer.from(fileArrayBuffer));

        filePaths.push(fullFilePath); // Push full file path to array
        index++;
    }

  await queryAssitant(filePaths, null, null)
  } catch(error) {
    console.log(error)
  }

  return NextResponse.json({error: ''});
}
