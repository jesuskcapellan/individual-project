import prisma from "@/db/db";

export async function createCustomer({
    firstName,
    lastName,
    email,
    storeId,
    addressId,
}: {
    firstName: string;
    lastName: string;
    email: string;
    storeId: number;
    addressId: number;
}) {
    return await prisma.customer.create({
        data: {
            first_name: firstName,
            last_name: lastName,
            email,
            store_id: storeId,
            address_id: addressId,
            create_date: new Date(),
        },
    });
}
