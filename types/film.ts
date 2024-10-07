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

export interface FilmCopy {
    filmId: number;
    inventoryId: number;
    storeId: number;
    storeAddress: string;
    rentals: {
        rental_date: Date;
        return_date: Date | null;
    }[];
}

export type FilmCopies = FilmCopy[];
