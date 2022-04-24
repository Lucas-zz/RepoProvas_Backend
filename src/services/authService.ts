import * as authRepository from "../repositories/authRepository.js";
import { UserData } from "../interfaces/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../setup.js";

export async function signUp({ password, email }: UserData) {
    const user = await authRepository.findUserByEmail(email);

    if (user) {
        throw {
            type: "conflict",
            message: "email already in use"
        }
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    await authRepository.insertUser({ password: hashPassword, email });
}

export async function signIn({ password, email }: UserData) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw {
            type: "not_found",
            message: "credentials invalid"
        }
    }

    const doesPasswordMatch = bcrypt.compareSync(password, user.password);

    if (!doesPasswordMatch) {
        throw {
            type: "unauthorized",
            message: "credentials invalid"
        }
    }

    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign(user.id.toString(), secretKey);

    await authRepository.insertSession({ token, userId: user.id });

    delete user.password;

    return { ...user, token }
}