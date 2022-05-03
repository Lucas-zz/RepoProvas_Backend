import { faker } from "@faker-js/faker";
import { connection } from "../../src/db";

export default async function requiredFactory() {
    const termNumber = faker.datatype.number(10);

    const term = await connection.term.upsert({
        where: {
            number: termNumber,
        },
        update: {},
        create: {
            number: termNumber,
        },
    });


    const teacherName = faker.name.findName();

    const teacher = await connection.teacher.upsert({
        where: {
            name: teacherName,
        },
        update: {},
        create: {
            name: teacherName,
        },
    });


    const disciplineName = faker.name.jobArea();

    const discipline = await connection.discipline.upsert({
        where: {
            name: disciplineName,
        },
        update: {},
        create: {
            name: disciplineName,
            termId: term.id,
        },
    });


    const teacherDiscipline = await connection.teacherDiscipline.create({
        data: {
            teacherId: teacher.id,
            disciplineId: discipline.id,
        },
    });


    const categoryName = `P${faker.datatype.number(6)}`;

    const category = await connection.category.upsert({
        where: {
            name: categoryName,
        },
        update: {},
        create: {
            name: categoryName,
        },
    });


    const requiredTo = {
        categoryId: category.id,
        teacherDisciplineId: teacherDiscipline.id,
    };

    return requiredTo;
}