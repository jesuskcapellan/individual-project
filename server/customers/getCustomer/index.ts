import prisma from "@/db/db";
import { Customer } from "@/types/customer";

export async function getCustomer({
    customerId,
}: {
    customerId: number;
}): Promise<Customer | null> {
    const customer = await prisma.customer.findUnique({
        where: {
            customer_id: customerId,
        },
        select: {
            customer_id: true,
            first_name: true,
            last_name: true,
            email: true,
            store: {
                select: {
                    store_id: true,
                    address: {
                        select: {
                            address_id: true,
                            address: true,
                        },
                    },
                },
            },
            address: {
                select: {
                    address_id: true,
                    address: true,
                },
            },
        },
    });
    if (!customer) {
        return null;
    }
    return {
        id: customer?.customer_id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email || undefined,
        store: {
            id: customer.store.store_id,
            address: {
                id: customer.address.address_id,
                address: customer.address.address,
            },
        },
        address: {
            id: customer.address.address_id,
            address: customer.address.address,
        },
    };
}
