import { connection } from "../db.js";
import { SessionData, UserData } from "../interfaces/index.js";

export async function findUserByEmail(email: string) {
    const user = await connection.user.findUnique({
        where: {
            email
        }
    });

    return user;
}

export async function findUserById(id: number) {
    const user = await connection.user.findUnique({
        where: {
            id
        }
    });

    return user;
}

export async function findSessionById(id: number) {
    const session = await connection.session.findUnique({
        where: {
            id
        }
    });

    return session;
}

export async function insertUser(data: UserData) {
    await connection.user.create({
        data
    });
}

export async function insertSession(data: SessionData) {
    await connection.session.create({
        data
    });
}