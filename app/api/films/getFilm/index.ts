import prisma from "@/db/db";
import { formatTitleCase } from "@/lib/utils";
import { Film, FilmStatus } from "@/types/film";

export interface GetFilmParams {
  filmId: number;
}

export async function getFilm({ filmId }: GetFilmParams): Promise<Film | null> {
  const film = await prisma.film.findUnique({
    where: {
      film_id: filmId,
    },
    select: {
      film_id: true,
      title: true,
      description: true,
      film_actor: {
        select: {
          actor: true,
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
            select: {
              _count: true,
            },
          },
        },
      },
    },
  });

  if (!film) {
    return null;
  }

  return {
    id: film.film_id,
    title: formatTitleCase(film.title),
    description: film.description || "",
    actors: film.film_actor.map(({ actor }) => ({
      id: actor.actor_id,
      name: `${actor.first_name} ${actor.last_name}`,
    })),
    category: film.film_category[0]?.category.name || "",
    status:
      film.inventory.length > 0 ? FilmStatus.AVAILABLE : FilmStatus.UNAVAILABLE,
    rentalCount: film.inventory.reduce(
      (total, inv) => total + inv.rental.length,
      0,
    ),
  };
}
