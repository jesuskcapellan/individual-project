import prisma from "@/db/db";

export async function listStores() {
    return (
        await prisma.store.findMany({
            select: {
                store_id: true,
                address: {
                    select: {
                        address_id: true,
                        address: true,
                    },
                },
            },
        })
    ).map((store) => ({
        id: store.store_id,
        address: {
            id: store.address.address_id,
            address: store.address.address,
        },
    }));
}
