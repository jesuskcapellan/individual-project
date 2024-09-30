import { PrismaClient } from '@prisma/client';

export async function listActors() {
    const prisma = new PrismaClient();

    try {
        const actors = await prisma.actor.findMany({
            select: {
                actor_id: true,
                first_name: true,
                last_name: true,
            },
            orderBy: {
                first_name: 'asc',
            },
        });

        return actors;
    } catch (error) {
        console.error('Error fetching actors:', error);
        throw new Error('Failed to fetch actors');
    } finally {
        await prisma.$disconnect();
    }
}
