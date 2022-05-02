import { Request, Response } from "express";
import * as categoryService from "../services/categoryService.js";

export async function findCategories(req: Request, res: Response) {
    const categories = await categoryService.findCategories();
    res.send({ categories });
}