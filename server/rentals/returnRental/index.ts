import prisma from "@/db/db";

export async function returnRental({ rentalId }: { rentalId: number }) {
    return await prisma.rental.update({
        where: {
            rental_id: rentalId,
        },
        data: {
            return_date: new Date(),
        },
    });
}
