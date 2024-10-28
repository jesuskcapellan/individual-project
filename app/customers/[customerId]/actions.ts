"use server";

import { deleteCustomer } from "@/server/customers/deleteCustomer";
import { returnRental } from "@/server/rentals/returnRental";

export const returnRentalAction = async (rentalId: number) => {
    return await returnRental({ rentalId });
};

export const deleteCustomerAction = async (customerId: number) => {
    return await deleteCustomer({ customerId });
};
