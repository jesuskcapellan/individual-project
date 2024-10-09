import prisma from "@/db/db";
import { Customers } from "@/types/customer";
import { Prisma } from "@prisma/client";

export interface ListCustomersInput {
    page?: number;
    take?: number;
    filters?: {
        id?: number;
        search?: string;
    };
}

export interface ListCustomersResponse {
    customers: Customers;
    pagination: {
        currentPage: number;
        totalPages: number;
        totalItems: number;
        itemsPerPage: number;
    };
}

export async function listCustomers({
    page = 1,
    take = 10,
    filters,
}: ListCustomersInput): Promise<ListCustomersResponse> {
    const whereClause: Prisma.customerWhereInput = {};

    if (filters && filters.search) {
        whereClause.OR = filters.search.split(" ").map((word) => ({
            OR: [
                { first_name: { contains: word } },
                { last_name: { contains: word } },
            ],
        }));
    }
    if (filters && filters.id) {
        whereClause.customer_id = filters.id;
    }
    const [customers, customerCount] = await prisma.$transaction([
        prisma.customer.findMany({
            where: whereClause,
            skip: (page - 1) * take,
            take,
            orderBy: {
                customer_id: "asc",
            },
        }),
        prisma.customer.count({
            where: whereClause,
        }),
    ]);

    return {
        customers: customers.map((customer) => ({
            id: customer.customer_id,
            first_name: customer.first_name,
            last_name: customer.last_name,
            email: customer.email || undefined,
        })),
        pagination: {
            currentPage: page,
            totalPages: Math.ceil(customerCount / take),
            totalItems: customerCount,
            itemsPerPage: take,
        },
    };
}
