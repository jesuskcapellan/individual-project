"use server";

import { deleteCustomer } from "@/server/customers/deleteCustomer";

export const deleteCustomerAction = async (customerId: number) => {
    return await deleteCustomer({ customerId });
};
