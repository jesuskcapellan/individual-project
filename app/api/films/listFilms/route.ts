import { NextRequest, NextResponse } from 'next/server';
import { listFilms } from '.';

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1', 10);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const statuses = searchParams.get('status')?.split(',');
    const order = searchParams.get('order') || '';
    const categories = searchParams.get('category')?.split(',');

    try {
        const result = await listFilms(
            page,
            limit,
            {
                category: categories || undefined,
                status: statuses || undefined,
            },
            order
        );
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
