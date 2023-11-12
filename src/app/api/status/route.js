import { NextResponse } from "next/server";
import findJob from "../../../../js/database/findJob";
import checkForJob from "../../../../js/database/checkForJob";

// Check if body is defined
function isValid(body) {
    if (!body) return false;
    if (!body.id) return false;
    return true;
}

export async function POST(req) {
    console.log('Status request...')
    const body = await req.json();
    if (!isValid(body)) {
        return NextResponse.json({ error: "Invalid request!" });
    }
    const id = body.id;
    try {
        const job = await findJob(id)
        if (job && job.company_name && !job.completed) {
            const exists = await checkForJob(job.company_name)
            if (exists) { return NextResponse.json(exists) }
        }
        if (job) {
            return NextResponse.json(job);
        } else {
            return NextResponse.json({ error: "Unable to find requested job" });
        }
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Something went wrong!" });
    }
}