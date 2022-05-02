import { connection } from "../db.js";

export async function findTestsByDiscipline() {
    const data = await connection.term.findMany({
        include: {
            discipline: {
                include: {
                    teacherDiscipline: {
                        include: {
                            teacher: true,
                            test: {
                                include: {
                                    category: true,
                                },
                            },
                        },
                    },
                },
            },
        },
    });

    return data;
}

export async function findTestsByTeacher() {
    const data = await connection.teacherDiscipline.findMany({
        include: {
            teacher: true,
            discipline: true,
            test: {
                include: {
                    category: true,
                },
            },
        },
    });

    return data;
}