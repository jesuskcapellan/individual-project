import prisma from "@/db/db";

export interface CreateRentalInput {
    inventoryId: number;
    customerId: number;
    staffId: number;
}

export interface CreateRentalResponse {
    rental_id: number;
    inventory_id: number;
    staff_id: number;
    customer_id: number;
    rental_date: Date;
    return_date: Date | null;
    last_update: Date;
}

export async function createRental({
    inventoryId,
    customerId,
    staffId,
}: CreateRentalInput): Promise<CreateRentalResponse | null> {
    return await prisma.rental.create({
        data: {
            inventory_id: inventoryId,
            rental_date: new Date(),
            customer_id: customerId,
            staff_id: staffId,
        },
    });
}
