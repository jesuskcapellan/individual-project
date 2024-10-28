import prisma from "@/db/db";

export async function listCustomerRentals({
    customerId,
    page,
    take,
}: {
    customerId: number;
    page: number;
    take: number;
}) {
    const [rentals, rentalCount] = await prisma.$transaction([
        prisma.rental.findMany({
            where: {
                customer_id: customerId,
            },
            select: {
                inventory: {
                    select: {
                        film: {
                            select: {
                                film_id: true,
                                title: true,
                            },
                        },
                    },
                },
                rental_id: true,
                rental_date: true,
                return_date: true,
            },
            skip: (page - 1) * take,
            take,
            orderBy: {
                rental_date: "desc",
            },
        }),
        prisma.rental.count({
            where: {
                customer_id: customerId,
            },
        }),
    ]);
    return {
        rentals: rentals.map((rental) => ({
            id: rental.rental_id,
            filmTitle: rental.inventory.film.title,
            rentalDate: rental.rental_date,
            returnDate: rental.return_date,
        })),
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(rentalCount / take),
            totalItems: rentalCount,
            itemsPerPage: take,
        },
    };
}
