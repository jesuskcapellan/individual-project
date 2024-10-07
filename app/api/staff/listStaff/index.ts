import prisma from "@/db/db";
import { StaffList } from "@/types/staff";

export interface ListStaffInput {
    storeId: number;
}

export type ListStaffResponse = StaffList;

export async function listStaff({
    storeId,
}: ListStaffInput): Promise<ListStaffResponse> {
    const staffList = await prisma.staff.findMany({
        where: {
            store_id: storeId,
        },
    });

    return staffList.map((staff) => ({
        id: staff.staff_id,
        store_id: staff.store_id,
        first_name: staff.first_name,
        last_name: staff.last_name,
        email: staff.email || undefined,
        username: staff.username,
    }));
}
