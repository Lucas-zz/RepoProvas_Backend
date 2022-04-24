import * as authRepository from "../repositories/authRepository.js";
import { UserData } from "../interfaces/index.js";
import bcrypt from "bcrypt";
//import jwt from "jsonwebtoken";

export async function signUp({ password, email }: UserData) {
    const user = await authRepository.findUserByEmail(email);

    if (user) {
        throw {
            type: "conflict",
            message: "email already in use"
        }
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    await authRepository.insertUser({ password: hashPassword, email })
}