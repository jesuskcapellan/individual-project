import { Actor } from "./actor";

export interface Film {
    id: number;
    title: string;
    description: string;
    actors: Actor[];
    category: string;
    rentals?: number;
}

export type Films = Film[];
