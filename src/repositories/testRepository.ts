import { connection } from "../db.js";
import { CreateTestData } from "../interfaces/index.js";

export async function findTestsByDiscipline() {
    return await connection.term.findMany({
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
}

export async function findTestsByTeacher() {
    return await connection.teacherDiscipline.findMany({
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