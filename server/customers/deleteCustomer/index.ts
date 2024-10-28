import prisma from "@/db/db";

export async function deleteCustomer({ customerId }: { customerId: number }) {
    return await prisma.$transaction([
        prisma.payment.deleteMany({
            where: {
                customer_id: customerId,
            },
        }),
        prisma.rental.deleteMany({
            where: {
                customer_id: customerId,
            },
        }),
        prisma.customer.delete({
            where: {
                customer_id: customerId,
            },
        }),
    ]);
}
