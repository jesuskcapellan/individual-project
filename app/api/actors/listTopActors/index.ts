import prisma from "@/db/db";
import { Actors } from "@/types/actor";

export interface ListTopActorsInput {
    take?: number;
}

export type ListTopActorsResponse = Actors;

export async function listTopActors({
    take = 5,
}: ListTopActorsInput): Promise<ListTopActorsResponse> {
    const actors = await prisma.actor.findMany({
        select: {
            actor_id: true,
            first_name: true,
            last_name: true,
            film_actor: {
                select: {
                    film: {
                        select: {
                            film_id: true,
                            title: true,
                            description: true,
                            inventory: {
                                select: {
                                    rental: {
                                        select: {
                                            _count: true,
                                        },
                                    },
                                },
                            },
                            film_category: {
                                select: {
                                    category: {
                                        select: {
                                            name: true,
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
        },
        orderBy: {
            film_actor: {
                _count: "desc",
            },
        },
    });

    const topActors = actors.map((actor) => {
        const films = actor.film_actor
            .map((fa) => ({
                id: fa.film.film_id,
                title: fa.film.title,
                description: fa.film.description ?? "",
                category: fa.film.film_category[0]?.category?.name ?? "",
                rentals: fa.film.inventory.reduce(
                    (filmSum, inv) => filmSum + inv.rental.length,
                    0
                ),
            }))
            .sort((a, b) => b.rentals - a.rentals)
            .slice(0, take);

        return {
            id: actor.actor_id,
            first_name: actor.first_name,
            last_name: actor.last_name,
            films,
            totalFilmRentals: films.reduce(
                (sum, film) => sum + film.rentals,
                0
            ),
        };
    });

    return topActors
        .sort((a, b) => b.totalFilmRentals - a.totalFilmRentals)
        .slice(0, take);
}
