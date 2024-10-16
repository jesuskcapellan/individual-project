import { NextResponse } from 'next/server';
import { listCategories } from '.';

export async function GET() {
    try {
        const result = await listCategories();
        return NextResponse.json(result, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
        return NextResponse.json(
            { error: 'An unknown error occurred' },
            { status: 500 }
        );
    }
}
