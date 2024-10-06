import prisma from "@/db/db";
import { FilmStatus } from "@/types/film";

export interface ListFilmCopiesParams {
  filmId: number;
  storeId?: number;
  status?: FilmStatus;
}

export async function listFilmCopies({
  filmId,
  storeId,
  status = "available",
}: ListFilmCopiesParams) {
  const filmCopies = await prisma.inventory.findMany({
    where: {
      film_id: filmId,
      store_id: storeId,
      rental:
        status === FilmStatus.AVAILABLE
          ? {
            every: {
              return_date: { not: null },
            },
          }
          : {
            some: {
              return_date: null,
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
    rentals: copy.rental,
  }));
}

export type ListFilmCopiesResult = {
  filmId: number;
  inventoryId: number;
  storeId: number;
  storeAddress: string;
  rentals: {
    rental_date: Date | null;
  }[];
}[];
