import { Film } from "./film";

export interface Actor {
    id: number;
    first_name: string;
    last_name: string;
    films?: Omit<Film, "actors">[];
    totalFilmRentals?: number;
}

export type Actors = Actor[];
