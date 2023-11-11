import { NextResponse } from "next/server";
import queryAssitant from "../../../../../js/openai/queryAssitant";

function isValid(body) {
    // Check if body is defined
    if (!body) return false;

    // Check if body.files is an array
    if (!Array.isArray(body.files)) return false;

    // Optional: Check each element in the array to ensure they are file objects
    for (const file of body.files) {
        if (typeof file !== 'object' || file === null) return false;
    }

    return true;
}

export async function POST(req) {
    const body = req.json();

    if (!isValid(body)) {
        return new Response(JSON.stringify({ error: "Invalid data format" }), {
            status: 400,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
    console.log("We are here")
    try {
        queryAssitant(body)
    } catch(error) {
        console.error(error);
    }
}