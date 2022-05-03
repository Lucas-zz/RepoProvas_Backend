import { connection } from "../db.js";

export async function getAllDisciplines() {
    return connection.discipline.findMany({});
}

export async function findDisciplineByName(discipline: string) {
    return connection.discipline.findUnique({
        where: {
            name: discipline,
        }
    });
}