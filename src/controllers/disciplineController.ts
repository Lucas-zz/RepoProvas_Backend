import { Request, Response } from "express";
import * as disciplineService from "../services/disciplineService.js"

export async function getAllDisciplines(req: Request, res: Response) {
    const disciplines = await disciplineService.getAll();

    res.status(200).send({ disciplines });
}