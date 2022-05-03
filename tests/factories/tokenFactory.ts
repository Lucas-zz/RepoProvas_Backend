import supertest from "supertest";
import app from "../../src/app";
import userBodyFactory from "./userBodyFactory";
import userFactory from "./userFactory";

export default async function tokenFactory() {
    const body = userBodyFactory();

    await userFactory(body);

    return await supertest(app).post("/sign-in").send(body);
}