import { connection } from "../db.js";
import { CreateTestData } from "../interfaces/index.js";

export async function getTestsByDiscipline() {
    return connection.term.findMany({
        include: {
            disciplines: {
                include: {
                    teacherDisciplines: {
                        include: {
                            teacher: true,
                            tests: {
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
}

export async function getTestsByTeachers() {
    return connection.teacherDiscipline.findMany({
        include: {
            teacher: true,
            discipline: true,
            tests: {
                include: {
                    category: true,
                },
            },
        },
    });
}

export async function addNewTest(testData: CreateTestData) {
    return await connection.test.create({
        data: testData,
    });
}

export async function updateTestViewsCount(id: number) {
    return await connection.test.update({
        where: {
            id,
        },
        data: {
            views: {
                increment: 1,
            }
        }
    });
}