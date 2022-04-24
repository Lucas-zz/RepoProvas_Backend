import { connection } from "../db.js";

export async function findAllTests() {
    const data = await connection.test.findMany();

    return data;
}