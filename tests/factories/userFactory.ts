import { connection } from "../../src/db";
import { UserData } from "../../src/interfaces";
import bcrypt from "bcrypt";

export default async function userFactory(user: UserData) {
    const insertedUser = await connection.user.create({
        data: {
            ...user,
            password: bcrypt.hashSync(user.password, 10),
        }
    });

    return insertedUser;
}