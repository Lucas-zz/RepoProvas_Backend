import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import * as authService from "../services/authService.js";


export async function validateTokenMiddleware(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization as string;

    if (!token) {
        throw {
            type: "unauthorized",
            message: "Missing token."
        }
    }

    try {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET) as { userId: number };

        const user = await authService.findUserById(userId);
        res.locals = user;

        next();
    } catch {
        throw {
            type: "unauthorized",
            message: "Invalid token."
        }
    }



}