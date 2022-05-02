import { connection } from "../db.js";
import { CreateTestData } from "../interfaces/index.js";

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

export async function addNewTest(testData: CreateTestData) {
    const data = await connection.test.create({
        data: testData,
    });

    return data;
}

export async function updateTestViewsCount(id: number) {
    const data = await connection.test.update({
        where: {
            id,
        },
        data: {
            views: {
                increment: 1,
            }
        }
    });

    return data;
}