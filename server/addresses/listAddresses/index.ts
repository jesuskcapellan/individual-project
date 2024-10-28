import prisma from "@/db/db";

export async function listAddresses({ address }: { address: string }) {
    return (
        await prisma.address.findMany({
            where: {
                address: { contains: address },
            },
            select: {
                address_id: true,
                address: true,
            },
            take: 20,
        })
    ).map((address) => ({
        id: address.address_id,
        address: address.address,
    }));
}
