import prisma from "@/db/db";
import { Categories } from "@/types/category";

export type ListCategoriesResponse = Categories;

export async function listCategories(): Promise<ListCategoriesResponse> {
    const categories = await prisma.category.findMany({
        select: {
            category_id: true,
            name: true,
        },
        orderBy: {
            name: "asc",
        },
    });

    return categories;
}
