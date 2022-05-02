import { Request, Response } from "express";
import * as teacherService from "../services/teacherService.js";

export async function getTeacherNames(req: Request, res: Response) {
    const teachers = await teacherService.getTeacherNames();

    res.status(200).send({ teachers });
}

export async function getTeacherByDiscipline(req: Request, res: Response) {
    const { discipline } = req.params;
    const teachers = await teacherService.getTeacherByDiscipline(discipline);

    res.status(200).send({ teachers });
}