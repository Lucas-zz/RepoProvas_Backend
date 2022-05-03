import joi from "joi";
import { NewTestData } from "../interfaces";

export const newTestSchema = joi.object<NewTestData>({
    name: joi.string().required(),
    pdfUrl: joi.string().required(),
    categoryName: joi.string().required(),
    disciplineName: joi.string().required(),
    teacherName: joi.string().required(),
})