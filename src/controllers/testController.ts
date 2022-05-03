import { Request, Response } from "express";
import * as testService from "../services/testService.js";
import * as testRepository from "../repositories/testRepository.js"
import { Filter } from "../interfaces/index.js";

export async function getAllTests(req: Request, res: Response) {
    const { groupBy } = req.query as { groupBy: string };

    if (groupBy !== "disciplines" && groupBy !== "teachers") {
        return res.sendStatus(400);
    }

    const tests = await testService.findTests({ groupBy });
    res.send({ tests });
}

export async function addNewTest(req: Request, res: Response) {
    const { name, pdfUrl, categoryName, disciplineName, teacherName } = req.body;

    await testService.addTest(name, pdfUrl, categoryName, disciplineName, teacherName);

    res.sendStatus(201);
}

export async function updateTestViewsCount(req: Request, res: Response) {
    const id = req.params.testId;

    await testService.updateTestViewsCount(parseInt(id));

    res.sendStatus(200);
}