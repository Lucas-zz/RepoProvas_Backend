import { Request, Response } from "express";
import * as testService from "../services/testService.js";

export async function findAllTests(req: Request, res: Response) {
    const { groupBy } = req.body as { groupBy: string };

    if (groupBy !== "discipline" && groupBy !== "teacher") {
        return res.sendStatus(400);
    }

    const tests = await testService.findTests({ groupBy });
    res.send({ tests });
}