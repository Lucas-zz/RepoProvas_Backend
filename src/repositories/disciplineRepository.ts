import { connection } from "../db";

export async function findDisciplines() {
    const data = connection.discipline.findMany({});

    return data;
}

export async function findDisciplineByName(discipline: string) {
    const data = connection.discipline.findUnique({
        where: {
            name: discipline,
        }
    });

    return data;
}