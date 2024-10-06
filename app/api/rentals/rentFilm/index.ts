import prisma from "@/db/db";

export async function rentFilm({
  inventoryId,
  customerId,
}: {
  inventoryId: number;
  customerId: number;
}) {
  await prisma.rental.create({
    data: {
      inventory_id: inventoryId,
      rental_date: new Date(),
      customer_id: customerId,
    },
  });
}
