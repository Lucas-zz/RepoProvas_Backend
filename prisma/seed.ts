import { connection } from "../src/db.js";
import bcrypt from 'bcrypt'

async function seed() {

    await connection.user.upsert({
        where: {
            email: "teste123@email.com"
        },
        update: {},
        create: {
            email: "teste123@email.com",
            password: bcrypt.hashSync("123", 10)
        },
    });

    await connection.category.upsert({
        where: {
            name: "P1"
        },
        update: {},
        create: {
            name: "P1",
        },
    });

    await connection.category.upsert({
        where: {
            name: "P2"
        },
        update: {},
        create: {
            name: "P2",
        },
    });

    await connection.category.upsert({
        where: {
            name: "P3"
        },
        update: {},
        create: {
            name: "P3",
        },
    });

    await connection.term.upsert({
        where: {
            number: 1
        },
        update: {},
        create: {
            number: 1,
        },
    });


    await connection.term.upsert({
        where: {
            number: 2
        },
        update: {},
        create: {
            number: 2,
        },
    });


    await connection.term.upsert({
        where: {
            number: 3
        },
        update: {},
        create: {
            number: 3,
        },
    });

    await connection.term.upsert({
        where: {
            number: 4
        },
        update: {},
        create: {
            number: 4,
        },
    });

    await connection.term.upsert({
        where: {
            number: 5
        },
        update: {},
        create: {
            number: 5,
        },
    });

    await connection.teacher.upsert({
        where: {
            name: "Dina"
        },
        update: {},
        create: {
            name: "Dina",
        },
    });

    await connection.teacher.upsert({
        where: {
            name: "Iago"
        },
        update: {},
        create: {
            name: "Iago",
        },
    });

    await connection.teacher.upsert({
        where: {
            name: "Leo"
        },
        update: {},
        create: {
            name: "Leo",
        },
    });

    await connection.teacher.upsert({
        where: {
            name: "Edu"
        },
        update: {},
        create: {
            name: "Edu",
        },
    });

    await connection.teacher.upsert({
        where: {
            name: "Pedrão"
        },
        update: {},
        create: {
            name: "Pedrão",
        },
    });

    await connection.discipline.upsert({
        where: {
            name: "HTML"
        },
        update: {},
        create: {
            name: "HTML",
            termId: 1,
        },
    });

    await connection.discipline.upsert({
        where: {
            name: "CSS"
        },
        update: {},
        create: {
            name: "CSS",
            termId: 2,
        },
    });

    await connection.discipline.upsert({
        where: {
            name: "JavaScript"
        },
        update: {},
        create: {
            name: "JavaScript",
            termId: 3,
        },
    });

    await connection.discipline.upsert({
        where: {
            name: "React"
        },
        update: {},
        create: {
            name: "React",
            termId: 4,
        },
    });

    await connection.discipline.upsert({
        where: {
            name: "Node"
        },
        update: {},
        create: {
            name: "Node",
            termId: 5,
        },
    });

    await connection.teacherDiscipline.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            teacherId: 1,
            disciplineId: 1,
        },
    });

    await connection.teacherDiscipline.upsert({
        where: {
            id: 2
        },
        update: {},
        create: {
            teacherId: 2,
            disciplineId: 2,
        },
    });

    await connection.teacherDiscipline.upsert({
        where: {
            id: 3
        },
        update: {},
        create: {
            teacherId: 3,
            disciplineId: 3,
        },
    });

    await connection.teacherDiscipline.upsert({
        where: {
            id: 4
        },
        update: {},
        create: {
            teacherId: 4,
            disciplineId: 4,
        },
    });

    await connection.teacherDiscipline.upsert({
        where: {
            id: 5
        },
        update: {},
        create: {
            teacherId: 5,
            disciplineId: 5,
        },
    });

    await connection.test.upsert({
        where: {
            id: 1
        },
        update: {},
        create: {
            name: "Prova Teste",
            pdfUrl: "https://www.pudim.com.br",
            categoryId: 1,
            teacherDisciplineId: 1,
            views: 0,
        },
    });

}

seed()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await connection.$disconnect();
    });