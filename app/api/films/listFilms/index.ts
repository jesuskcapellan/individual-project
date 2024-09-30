import prisma from "@/db/db";
import { Film } from "@/types/film";
import { Prisma } from "@prisma/client";

export interface ListFilmsInput {
    page: number;
    take: number;
    filters: {
        search?: string;
        categories?: string[];
        actors?: string[];
    };
}

export interface ListFilmsResponse {
    films: Film[];
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

export async function listFilms({
    page,
    take,
    filters,
}: ListFilmsInput): Promise<ListFilmsResponse> {
    const whereClause: Prisma.filmWhereInput = {};
    if (filters.actors && filters.actors.length > 0) {
        whereClause.film_actor = {
            some: {
                actor: {
                    actor_id: {
                        in: filters.actors.map(Number),
                    },
                },
            },
        };
    }
    if (filters.categories && filters.categories.length > 0) {
        whereClause.film_category = {
            some: {
                category: {
                    name: {
                        in: filters.categories,
                    },
                },
            },
        };
    }
    if (filters.search) {
        whereClause.title = {
            contains: filters.search,
        };
    }
    const [films, filmCount] = await prisma.$transaction([
        prisma.film.findMany({
            where: {
                ...whereClause,
            },
            skip: (page - 1) * take,
            take,
            orderBy: {
                title: "asc",
            },
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
                        category: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        }),
        prisma.film.count({
            where: {
                ...whereClause,
                title: {
                    contains: filters.search,
                },
            },
        }),
    ]);
    return {
        films: films.map((film) => ({
            id: film.film_id,
            title: film.title,
            description: film.description || "",
            actors: film.film_actor.map((a) => a.actor),
            category: film.film_category[0].category.name,
        })),
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(filmCount / take),
            totalItems: filmCount,
            itemsPerPage: take,
        },
    };
}
