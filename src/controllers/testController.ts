import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function getAllTests(req: Request, res: Response) {
    const data = await testService.getAllTests();

    res.send(data);
}