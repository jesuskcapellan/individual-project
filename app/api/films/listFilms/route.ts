import { NextRequest, NextResponse } from "next/server";
import { listFilms } from ".";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get("page") || "1", 10);
    const take = parseInt(searchParams.get("take") || "10", 10);
    const categories = searchParams.get("categories")?.split(",");
    const actors = searchParams.get("actors")?.split(",");
    const search = searchParams.get("search") || undefined;

    try {
        const result = await listFilms({
            page,
            take,
            filters: {
                search,
                actors,
                categories,
            },
        });
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
