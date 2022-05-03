import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function findAllTests(req: Request, res: Response) {
    const { groupBy } = req.body as { groupBy: string };

    if (groupBy !== "discipline" && groupBy !== "teacher") {
        return res.sendStatus(400);
    }

    const tests = await testService.findTests({ groupBy });
    res.send({ tests }).status(200);
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