export interface Film {
    id: number;
    title: string;
    description: string;
    actors: string[];
    category: string;
    status: 'available' | 'unavailable';
}
