import { NextRequest, NextResponse } from "next/server";
import { listCustomers } from ".";
import { validateNumeric } from "@/lib/utils";

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = validateNumeric(searchParams.get("page"));
    const take = validateNumeric(searchParams.get("take"));
    const id = validateNumeric(searchParams.get("id"));
    const name = searchParams.get("name") || undefined;

    try {
        const result = await listCustomers({
            page,
            take,
            filters: {
                id,
                name,
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
