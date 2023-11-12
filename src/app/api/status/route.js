import { NextResponse } from "next/server";
import findJob from "../../../../js/database/findJob";

// Check if body is defined
function isValid(body) {
    if (!body) return false;
    if (!body.id) return false;
    return true;
}

export async function POST(req) {
    console.log('Status request...')
    const body = req.json();
    if (!isValid(body)) {
        return NextResponse.json({ error: "Invalid request!" });
    }
    const id = body.id;
    try {
        const job = await findJob(id)
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