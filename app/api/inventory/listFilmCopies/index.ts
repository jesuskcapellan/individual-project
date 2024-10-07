import prisma from "@/db/db";
import { FilmCopies } from "@/types/film";

export interface ListFilmCopiesInput {
    filmId: number;
    storeId?: number;
}

export type ListFilmCopiesResponse = FilmCopies;

export async function listFilmCopies({
    filmId,
    storeId,
}: ListFilmCopiesInput): Promise<ListFilmCopiesResponse> {
    const filmCopies = await prisma.inventory.findMany({
        where: {
            film_id: filmId,
            store_id: storeId,
            rental: {
                every: {
                    return_date: { not: null },
                },
            },
        },
        select: {
            store: {
                select: {
                    store_id: true,
                    address: {
                        select: {
                            address: true,
                        },
                    },
                    staff_staff_store_idTostore: true,
                },
            },
            rental: {
                select: {
                    return_date: true,
                    rental_date: true,
                },
            },
            inventory_id: true,
        },
    });

    return filmCopies.map((copy) => ({
        filmId,
        inventoryId: copy.inventory_id,
        storeId: copy.store.store_id,
        storeAddress: copy.store.address.address,
        rentals: copy.rental!,
    }));
}
