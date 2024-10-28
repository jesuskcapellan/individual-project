export interface Rental {
    id: number;
    filmId?: number;
    filmTitle: string;
    rentalDate: Date;
    returnDate: Date | null;
    customerId?: number;
}
