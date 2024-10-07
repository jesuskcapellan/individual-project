export interface Staff {
    id: number;
    store_id: number;
    first_name: string;
    last_name: string;
    email?: string;
    username: string;
}

export type StaffList = Staff[];
