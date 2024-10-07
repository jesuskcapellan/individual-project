import prisma from "@/db/db";
import { Films } from "@/types/film";
import { Prisma } from "@prisma/client";

export interface ListTopFilmsInput {
    actorId?: number;
    take?: number;
}

export type ListTopFilmsResponse = Films;

export async function listTopFilms({
    actorId,
    take = 5,
}: ListTopFilmsInput): Promise<ListTopFilmsResponse> {
    const whereClause: Prisma.filmWhereInput = {};
    if (actorId) {
        whereClause.film_actor = {
            some: {
                actor_id: actorId,
            },
        };
    }
    const topFilms = await prisma.film.findMany({
        where: whereClause,
        select: {
            film_id: true,
            title: true,
            description: true,
            film_actor: {
                select: {
                    actor: {
                        select: {
                            actor_id: true,
                            first_name: true,
                            last_name: true,
                        },
                    },
                },
            },
            film_category: {
                select: {
                    category: true,
                },
            },
            inventory: {
                select: {
                    rental: true,
                },
            },
        },
    });
    return topFilms
        .map((film) => ({
            id: film.film_id,
            title: film.title,
            description: film.description || "",
            actors: film.film_actor.map((fa) => ({
                id: fa.actor.actor_id,
                first_name: fa.actor.first_name,
                last_name: fa.actor.last_name,
            })),
            category: film.film_category[0]?.category.name || "",
            rentals: film.inventory.reduce(
                (total, inv) => total + inv.rental.length,
                0
            ),
        }))
        .sort((a, b) => b.rentals - a.rentals)
        .slice(0, take);
}
