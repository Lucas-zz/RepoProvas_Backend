import { Request, Response } from "express";
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