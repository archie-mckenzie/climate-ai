import { NextResponse } from "next/server";
import connectToMongoDB from "../../../../js/database/mongodb";

export async function GET() {
    try {
        const client = await connectToMongoDB;
        const jobs = client.db('greenalysis').collection('jobs');
        const all = jobs.find({ "completed": true })
        if (!all) return NextResponse.json({ jobs: [] });
        const all_array = await all.toArray();
        return NextResponse.json({ jobs: all_array });
    } catch (error) {
        console.log(error)
        return NextResponse.json({ error: "Something went wrong!" });
    }
}