export interface Customer {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
}

export type Customers = Customer[];
