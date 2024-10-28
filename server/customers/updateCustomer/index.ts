import prisma from "@/db/db";

export async function updateCustomer({
    customerId,
    firstName,
    lastName,
    email,
    storeId,
    addressId,
}: {
    customerId: number;
    firstName: string;
    lastName: string;
    email?: string;
    storeId: number;
    addressId: number;
}) {
    return await prisma.customer.update({
        where: {
            customer_id: customerId,
        },
        data: {
            first_name: firstName,
            last_name: lastName,
            email,
            store_id: storeId,
            address_id: addressId,
            last_update: new Date(),
        },
    });
}
