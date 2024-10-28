import { NextRequest, NextResponse } from "next/server";
import { listTopActors } from ".";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const take = parseInt(searchParams.get("take") || "5", 10);

    try {
        const result = await listTopActors({ take });
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { error: "An unknown error occurred" },
            { status: 500 }
        );
    }
}
