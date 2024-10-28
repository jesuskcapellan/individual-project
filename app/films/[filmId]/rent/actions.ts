"use server";

import { listCustomers } from "@/server/customers/listCustomers";
import { createRental } from "@/server/rentals/createRental";
import { listStaff } from "@/server/staff/listStaff";

export const fetchStaff = async (storeId: number) => {
    return await listStaff({ storeId });
};

export const fetchCustomers = async (search: string) => {
    return await listCustomers({ search });
};

export const putRental = async (
    inventoryId: number,
    staffId: number,
    customerId: number
) => {
    return await createRental({ inventoryId, staffId, customerId });
};
