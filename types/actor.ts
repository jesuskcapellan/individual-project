import { Film } from "./film";

export interface Actor {
    actor_id: number;
    first_name: string;
    last_name: string;
    films?: Omit<Film, "actors">[];
}

export type Actors = Actor[];
