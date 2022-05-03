import app from "../src/app.js"
import supertest from "supertest";
import { connection } from "../src/db.js";
import userBodyFactory from "./factories/userBodyFactory";
import userFactory from "./factories/userFactory";
import tokenFactory from "./factories/tokenFactory.js";
import requiredFactory from "./factories/requiredFactory.js";
import testFactory from "./factories/testFactory.js";
import "../src/setup.js";

describe("User Tests - POST /sign-up", () => {
    beforeEach(truncateUsers);
    afterAll(disconnectPrismas);

    it("returns 201 when user is created", async () => {
        console.log(process.env.DATABASE_URL);

        const body = userBodyFactory();
        const promise = await supertest(app).post("/sign-up").send(body);
        const user = await connection.user.findUnique({
            where: {
                email: body.email,
            }
        });

        expect(promise.status).toEqual(201);
        expect(user).not.toBeNull();
    });

    it("return 422 given invalid body", async () => {
        const body = {};

        const promise = await supertest(app).post("/sign-up").send(body);

        expect(promise.status).toEqual(422);
    });

    it("returns 409 given duplicate email", async () => {
        const body = userBodyFactory();
        await userFactory(body);

        const promise = await supertest(app).post("/sign-up").send(body);
        const users = await connection.user.findMany({
            where: {
                email: body.email,
            }
        });

        expect(promise.status).toEqual(409);
        expect(users.length).toEqual(1);
    });
});

describe("User Tests - POST /sign-in", () => {
    beforeEach(truncateUsers);
    afterAll(disconnectPrismas);

    it("returns 200 given valid credentials", async () => {
        const body = userBodyFactory();
        await userFactory(body);

        const promise = await supertest(app).post("/sign-in").send(body);

        expect(promise.status).toEqual(200);
        expect(typeof promise.text).toEqual("string");
        expect(promise.text.length).toBeGreaterThan(0);
    });

    it("returns 401 given invalid email", async () => {
        const user = userBodyFactory();

        const promise = await supertest(app).post("/sign-in").send(user);

        expect(promise.status).toEqual(404);
        expect(promise.body.token).toBeUndefined();
    });

    it("returns 401 given invalid password", async () => {
        const user = userBodyFactory();
        await userFactory(user);

        const promise = await supertest(app).post("/sign-in").send({ ...user, password: "vendocorsa2004" });

        expect(promise.status).toEqual(404);
        expect(promise.body.token).toBeUndefined();
    });
});

describe("Tests - GET /tests", () => {
    beforeEach(truncateUsers);
    afterAll(disconnectPrismas);

    it("returns 401 given invalid token", async () => {
        const promise = await supertest(app).get("/tests?groupBy=teachers").set("Authorization", "um_token_bem_errado");

        expect(promise.status).toEqual(401);
    });

    it("returns 400 given invalid groupBy", async () => {
        const login = await tokenFactory();

        const promise = await supertest(app).get("/tests?groupBy=teacher").set("Authorization", `Bearer ${login.body.token}`);

        expect(promise.status).toEqual(400);
    });

    it("returns object given valid token", async () => {
        const login = await tokenFactory();

        const promise = await supertest(app).get("/tests?groupBy=teachers").set("Authorization", `Bearer ${login.body.token}`);

        expect(promise.status).toEqual(200);
        expect(typeof promise.body).toEqual("object");
    });
});

describe("Tests - POST /tests", () => {
    beforeEach(truncateUsers);
    afterAll(disconnectPrismas);

    it("returns 422 given invalid body", async () => {
        const { categoryId, teacherDisciplineId } = await requiredFactory();

        const login = await tokenFactory();

        const test = testFactory(categoryId, teacherDisciplineId);

        const yeye = "serginho_malandro";

        const promise = await supertest(app).post("/tests").send({ ...test, yeye }).set("Authorization", `Bearer ${login.body.token}`);

        expect(promise.status).toEqual(422);
    });

    it("returns 201 given valid body", async () => {
        const { categoryId, teacherDisciplineId } = await requiredFactory();

        const login = await tokenFactory();

        const test = testFactory(categoryId, teacherDisciplineId);

        const promise = await supertest(app).post("/tests").send(test).set("Authorization", `Bearer ${login.body.token}`);

        const tests = await connection.test.findMany({
            where: {
                name: test.name,
            },
        });

        expect(promise.status).toEqual(201);
        expect(tests.length).toEqual(1);
    })
});

describe("Update Test Views Count - PUT /tests/:testId/countView", () => {
    beforeEach(truncateUsers);
    afterAll(disconnectPrismas);

    it("returns 200 given valid testId", async () => {
        const testId = 1;

        const login = await tokenFactory();

        const promise = await supertest(app).put(`/tests/${testId}/countView`).set("Authorization", `Bearer ${login.body.token}`);

        expect(promise.status).toEqual(200);
    });

    it("returns 401 given invalid token", async () => {
        const testId = 1;

        const promise = await supertest(app).put(`/tests/${testId}/countView`).set("Authorization", "um_token_bem_errado");

        expect(promise.status).toEqual(401);
    });
});

async function truncateUsers() {
    await connection.$executeRaw`
        TRUNCATE TABLE 
            users,
            sessions,
            tests,
            teachers,
            categories,
            "teachersDisciplines",
            disciplines,
            terms;
    `;
}

async function disconnectPrismas() {
    await connection.$disconnect();
}