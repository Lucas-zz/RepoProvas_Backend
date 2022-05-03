import { connection } from "../src/db.js";
import bcrypt from 'bcrypt'

async function seedDB() {

    await connection.user.upsert({
        where: { email: "teste123@mail.com" },
        update: {},
        create: {
            email: "teste123@mail.com",
            password: bcrypt.hashSync("123", 10)
        },
    });

    await connection.category.upsert({
        where: { name: "P1 - teste" },
        update: {},
        create: {
            name: "P1 - teste",
        },
    });

    await connection.term.upsert({
        where: { number: 1 },
        update: {},
        create: {
            number: 1,
        },
    });

    await connection.teacher.upsert({
        where: { name: "Professor Teste" },
        update: {},
        create: {
            name: "Professor Teste",
        },
    });

    await connection.discipline.upsert({
        where: { name: "Matéria Teste" },
        update: {},
        create: {
            name: "Matéria Teste",
            termId: 1,
        },
    });

    await connection.teacherDiscipline.upsert({
        where: { id: 1 },
        update: {},
        create: {
            teacherId: 1,
            disciplineId: 1,
        },
    });

    await connection.test.upsert({
        where: { id: 1 },
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

seedDB()
    .catch((e) => {
        console.log(e);
        process.exit(1);
    })
    .finally(async () => {
        await connection.$disconnect();
    });