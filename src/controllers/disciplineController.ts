import { Request, Response } from "express";
import * as disciplineService from "../services/disciplineService.js"

export async function findDisciplines(req: Request, res: Response) {
    const disciplines = await disciplineService.findAllDisciplines();

    res.status(200).send({ disciplines });
}