import { PrismaClient } from '@prisma/client';

export async function listCategories() {
    const prisma = new PrismaClient();

    try {
        const actors = await prisma.category.findMany({
            select: {
                category_id: true,
                name: true,
            },
            orderBy: {
                name: 'asc',
            },
        });

        return actors;
    } catch (error) {
        console.error('Error fetching categories:', error);
        throw new Error('Failed to fetch categories');
    } finally {
        await prisma.$disconnect();
    }
}
