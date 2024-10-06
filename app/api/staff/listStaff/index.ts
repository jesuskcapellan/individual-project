import prisma from "@/db/db";

export interface ListStaffParams {
  storeId: number;
}

export async function listStaff({ storeId }: ListStaffParams) {
  const staffList = await prisma.staff.findMany({
    where: {
      store_id: storeId,
    },
  });

  return staffList.map((staff) => ({
    staffId: staff.staff_id,
    storeId: staff.store_id,
    name: staff.first_name + staff.last_name,
    email: staff.email,
    username: staff.username,
  }));
}
