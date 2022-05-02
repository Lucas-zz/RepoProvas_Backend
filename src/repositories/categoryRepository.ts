import { connection } from "../db.js";

export async function findCategories() {
    const data = await connection.category.findMany();

    return data;
}