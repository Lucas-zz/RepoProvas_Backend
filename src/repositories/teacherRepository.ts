import { connection } from "../db.js";

export async function getTeacherNames() {
    return await connection.teacher.findMany({
        select: {
            name: true,
        }
    });
}

export async function getTeacherByDiscipline(discipline: string) {
    return await connection.teacherDiscipline.findMany({
        select: {
            teacher: true,
        },
        where: {
            discipline: {
                name: discipline,
            }
        }
    });
}

export async function findTeacherByName(teacher: string) {
    return await connection.teacher.findUnique({
        where: {
            name: teacher,
        }
    });
}

export async function findTeacherDiscipline(teacherId: number, disciplineId: number) {
    return connection.teacherDiscipline.findFirst({
        where: {
            teacherId,
            disciplineId,
        }
    });
}