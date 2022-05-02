import { connection } from "../db.js";

export async function findCategories() {
    const data = await connection.category.findMany({});

    return data;
}

export async function findCategoryByName(category: string) {
    const data = connection.category.findUnique({
        where: {
            name: category,
        }
    });

    return data;
}