import { connection } from "../db";

export async function getTeacherNames() {
    const data = await connection.teacher.findMany({
        select: {
            name: true,
        }
    });

    return data;
}

export async function getTeacherByDiscipline(discipline: string) {
    const data = await connection.teacherDiscipline.findMany({
        select: {
            teacher: true,
        },
        where: {
            discipline: {
                name: discipline,
            }
        }
    });

    return data;
}

export async function findTeacherByName(teacher: string) {
    const data = await connection.teacher.findUnique({
        where: {
            name: teacher,
        }
    });

    return data;
}

export async function getTeacherDiscipline(teacherId: number, disciplineId: number) {
    const data = connection.teacherDiscipline.findFirst({
        where: {
            teacherId,
            disciplineId,
        }
    });

    return data;
}