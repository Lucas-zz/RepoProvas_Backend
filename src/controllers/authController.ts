import { Request, Response } from "express";
import { UserData } from "../interfaces/index.js";
import * as authService from "../services/authService.js";

export async function signUp(req: Request, res: Response) {
    const { email, password }: UserData = req.body;

    await authService.signUp({ email, password });

    res.sendStatus(201);
}

export async function signIn(req: Request, res: Response) {
    const { password, email }: UserData = req.body;

    const token = await authService.signIn({ password, email });

    res.send({ token }).status(200);
}