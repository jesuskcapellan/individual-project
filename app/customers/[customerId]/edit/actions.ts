"use server";

import { listAddresses } from "@/server/addresses/listAddresses";
import { updateCustomer } from "@/server/customers/updateCustomer";

export const postCustomer = async (
    customerId: number,
    firstName: string,
    lastName: string,
    storeId: number,
    addressId: number,
    email?: string
) => {
    return await updateCustomer({
        customerId,
        firstName,
        lastName,
        email,
        storeId,
        addressId,
    });
};

export const fetchAddresses = async (search: string) => {
    return await listAddresses({ address: search });
};
