"use server";

import { createCustomer } from "@/server/customers/addCustomer";
import { listAddresses } from "@/server/addresses/listAddresses";

export const putCustomer = async (
    firstName: string,
    lastName: string,
    email: string,
    storeId: number,
    addressId: number
) => {
    return await createCustomer({
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
