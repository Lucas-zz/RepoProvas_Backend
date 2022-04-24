import { Request, Response } from "express";
import { UserData } from "../interfaces/index.js";
import * as authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
    const { password, confirmPassword, email } = req.body;

    if (password !== confirmPassword) {
        throw {
            type: "unauthorized",
            message: "password does not match"
        }
    }

    await authService.signUp({ password, email });

    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const { password, email }: UserData = req.body;

    const userData = await authService.signIn({ password, email });

    res.send(userData).status(200);
}