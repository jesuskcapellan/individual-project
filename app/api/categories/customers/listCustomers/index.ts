import prisma from "@/db/db";
import { Customers } from "@/types/customer";

export interface ListCustomersInput {
    search?: string;
    take?: number;
}

export type ListCustomersResponse = Customers;

export async function listCustomers({
    search = "",
    take = 10,
}: ListCustomersInput): Promise<ListCustomersResponse> {
    const customers = await prisma.customer.findMany({
        where: {
            OR: search.split(" ").map((word) => ({
                OR: [
                    { first_name: { contains: word } },
                    { last_name: { contains: word } },
                ],
            })),
        },
        take,
    });

    return customers.map((customer) => ({
        id: customer.customer_id,
        first_name: customer.first_name,
        last_name: customer.last_name,
        email: customer.email || undefined,
        debug: search,
    }));
}
