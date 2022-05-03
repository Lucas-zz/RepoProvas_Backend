import { connection } from "../db.js";

export async function getAllCategories() {
    return await connection.category.findMany({});
}

export async function findCategoryByName(category: string) {
    return connection.category.findUnique({
        where: {
            name: category,
        }
    });
}