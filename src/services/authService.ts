import * as authRepository from "../repositories/authRepository.js";
import { UserData } from "../interfaces/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import "../setup.js";

export async function signUp({ email, password }: UserData) {
    const user = await authRepository.findUserByEmail(email);

    if (user) {
        throw {
            type: "conflict",
            message: "Email already registered."
        }
    }

    const hashPassword = bcrypt.hashSync(password, 10);

    await authRepository.insertUser({ email, password: hashPassword });
}

export async function signIn({ email, password }: UserData) {
    const user = await verifyUser({ email, password });

    const secretKey = process.env.JWT_SECRET;
    const token = jwt.sign({ userId: user.id }, secretKey);

    return token;
}

export async function findUserById(id: number) {
    const user = await authRepository.findUserById(id);

    if (!user) {
        throw {
            type: "not_found",
            message: "User not found."
        }
    }

    return user;
}

async function verifyUser({ email, password }: UserData) {
    const user = await authRepository.findUserByEmail(email);

    if (!user) {
        throw {
            type: "not_found",
            message: "Email invalid."
        }
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
        throw {
            type: "not_found",
            message: "Password invalid."
        }
    }

    return user;
}