import prisma from "@/db/db";
import { Actors } from "@/types/actor";

export type ListActorsResponse = Actors;

export async function listActors(): Promise<ListActorsResponse> {
    const actors = await prisma.actor.findMany({
        select: {
            actor_id: true,
            first_name: true,
            last_name: true,
        },
        orderBy: {
            first_name: "asc",
        },
    });
    return actors.map((actor) => ({
        id: actor.actor_id,
        first_name: actor.first_name,
        last_name: actor.last_name,
    }));
}
