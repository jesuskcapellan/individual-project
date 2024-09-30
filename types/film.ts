import { Actor } from "./actor";

export interface Film {
    id: number;
    title: string;
    description: string;
    actors: Actor[];
    category: string;
}

export type Films = Film[];
