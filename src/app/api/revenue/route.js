import { NextResponse } from "next/server";
import addJob from "../../../../js/database/addJob";
import updateJob from "../../../../js/database/updateJob";
import { fetchRevenue } from "../../../../js/revenues/fetchRevenue";

function isValid(body) {
    return body && body.ticker;
}

export async function POST(req) {
    const body = await req.json();

    if (!isValid(body)) {
        return NextResponse.json({ error: "Invalid request!" });
    }

    try {
        const revenueData = await fetchRevenue(body.ticker)

        return NextResponse.json(revenueData);
    } catch(error) {
        console.log(error)
        return NextResponse.json({ 'error': "error occurred while fetching the ticker" });
    }
}
