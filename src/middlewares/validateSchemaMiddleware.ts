import { Request, Response, NextFunction } from "express";
import { ObjectSchema } from "joi";

export function validateSchemaMiddleware(schema: ObjectSchema) {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body);
        if (error) {
            throw {
                type: "unprocessable_entity",
                message: "invalid schema"
            }
        }
        next();
    }
}