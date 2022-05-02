import { Request, Response, NextFunction } from "express";
import * as authService from "../services/authService.js";


export async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const auth = req.headers.authorization as string;
    const token = auth?.replace("Bearer ", "");

    if (!token) {
        throw {
            type: "unauthorized",
            message: "token missing"
        }
    }

    const session = await authService.verifySession(token);

    if (!session) {
        throw {
            type: "unauthorized",
            message: "session expired"
        }
    }

    const userId = await authService.verifyToken(token);

    res.locals = { userId, token };

    next();
}