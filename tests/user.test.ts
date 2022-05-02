import app from "../src/app.js"
import supertest from "supertest";
import { connection } from "../src/db.js";
import userBodyFactory from "./factories/userBodyFactory";
import userFactory from "./factories/userFactory";
import "../src/server.js";
import "../src/setup.js";

describe("Post /sign-up", () => {
    beforeEach(truncateUsers);
    afterAll(disconnectPrismas);

    it("returns 201 when user is created", async () => {
        console.log(process.env.DATABASE_URL);

        const body = userBodyFactory();
        const result = await supertest(app).post("/sign-up").send(body);
        const user = await connection.user.findUnique({
            where: {
                email: body.email,
            }
        });

        expect(result.status).toEqual(201);
        expect(user).not.toBeNull();
    });

    it("returns 409 given duplicate email", async () => {
        const body = userBodyFactory();
        await userFactory(body);

        const result = await supertest(app).post("/sign-up").send(body);
        const users = await connection.user.findMany({
            where: {
                email: body.email,
            }
        });

        expect(result.status).toEqual(409);
        expect(users.length).toEqual(1);
    });
});

describe("Post /sign-in", () => {
    beforeEach(truncateUsers);
    afterAll(disconnectPrismas);

    it("returns 200 given valid credentials", async () => {
        const body = userBodyFactory();
        await userFactory(body);

        const result = await supertest(app).post("/sign-in").send(body);

        expect(result.status).toEqual(200);
        expect(typeof result.body.token).toEqual("string");
        expect(result.body.token.length).toBeGreaterThan(0);
    });

    it("returns 401 given invalid credentials", async () => {
        const user = userBodyFactory();
        await userFactory(user);

        const result = await supertest(app).post("/sign-in").send({ ...user, password: "ean" });

        expect(result.status).toEqual(401);
    });
});

async function truncateUsers() {
    await connection.$executeRaw`TRUNCATE TABLE users`;
}

async function disconnectPrismas() {
    await connection.$disconnect();
}