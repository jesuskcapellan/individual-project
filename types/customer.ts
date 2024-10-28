import { Address } from "./address";
import { Store } from "./store";

export interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    address?: Address;
    store?: Store;
}

export type Customers = Customer[];
