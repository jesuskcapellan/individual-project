import prisma from '@/db/db';
import { Film } from '@/types/film';
import { film_rating, Prisma } from '@prisma/client';

export async function listFilms(
    page: number,
    limit: number,
    filters: {
        search?: string;
        status?: string[];
        category?: string[];
        rating?: film_rating[];
        actors?: string[];
    },
    order?: string
): Promise<ListFilmsResponse> {
    const skip = (page - 1) * limit;

    try {
        const whereClause: Prisma.filmWhereInput = {};

        if (filters.status && filters.status.length > 0) {
            whereClause.OR = filters.status.map((status) => {
                if (status === 'unavailable') {
                    return {
                        inventory: {
                            some: {
                                rental: {
                                    some: {
                                        return_date: null,
                                    },
                                },
                            },
                        },
                    };
                } else if (status === 'available') {
                    return {
                        inventory: {
                            every: {
                                rental: {
                                    every: {
                                        return_date: { not: null },
                                    },
                                },
                            },
                        },
                    };
                }
                return {};
            });
        }

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

        if (filters.category && filters.category.length > 0) {
            whereClause.film_category = {
                some: {
                    category: {
                        name: {
                            in: filters.category,
                        },
                    },
                },
            };
        }

        const [films, totalFilteredCount] = await Promise.all([
            prisma.film.findMany({
                where: {
                    ...whereClause,
                    title: {
                        contains: filters.search,
                    },
                },
                skip,
                take: limit,
                orderBy: {
                    title: order ? (order as Prisma.SortOrder) : 'asc',
                },
                select: {
                    film_id: true,
                    title: true,
                    description: true,
                    film_actor: {
                        select: {
                            actor: {
                                select: {
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
                    inventory: {
                        select: {
                            rental: {
                                where: {
                                    return_date: null,
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

        const formattedFilms: Film[] = films.map((film) => ({
            id: film.film_id,
            title: film.title,
            description: film.description || '',
            actors: film.film_actor.map(
                (a) => `${a.actor.first_name} ${a.actor.last_name}`
            ),
            category: film.film_category[0].category.name,
            status: film.inventory.some((i) => i.rental.length > 0)
                ? 'unavailable'
                : 'available',
        }));

        const totalPages = Math.ceil(totalFilteredCount / limit);

        return {
            films: formattedFilms,
            pagination: {
                currentPage: page,
                totalPages,
                totalItems: totalFilteredCount,
                itemsPerPage: limit,
            },
        };
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error fetching films:', error);
            throw new Error(error.message);
        }
        throw new Error('Internal Server Error');
    }
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
