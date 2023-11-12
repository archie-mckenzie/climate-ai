import { NextResponse } from "next/server";
import queryAssistant from "../../../../js/openai/queryAssistant";
import addJob from "../../../../js/database/addJob";
import updateJob from "../../../../js/database/updateJob";
import checkForJob from "../../../../js/database/checkForJob";
import { fetchRevenue } from "../../../../js/revenues/fetchRevenue";

const { existsSync } = require("fs");
const fs = require("fs/promises");
const path = require("path");

function simplifyRevenueData(data) {
  const simplifiedData = {
      symbol: data.symbol,
      annualReport: data.annualReports.map(report => ({
          fiscalYear: report.fiscalDateEnding.split('-')[0], // Extracting the year from 'fiscalDateEnding'
          totalRevenue: report.totalRevenue
      }))
  };

  return simplifiedData;
}

function cleanJsonString(str) {
  return str.replace(/^\s*```\w*\n?|\n?```s*$/g, '');
}

async function executeAssistant(filepaths, instruction, id) {
  try {
    const unclean = await queryAssistant(filepaths, instruction)
    const clean = cleanJsonString(unclean)
    const result = JSON.parse(clean)
    const succeeded = await updateJob(id, result)
    if(!succeeded) {
      return false
    }

    if (instruction === 'fetchCompany') {
      const ticker = result.companyName
      const rawRevenueData = await fetchRevenue(ticker)
      const revenueData = simplifyRevenueData(rawRevenueData)
      const newSucceeded = await updateJob(id, revenueData)

      return newSucceeded
    }
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
      ]).then((results) => {updateJob(id, { "completed": results[1] == true })})
    }
  }
}
