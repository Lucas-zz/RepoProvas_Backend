import { Router } from "express";
import * as authController from "../controllers/authController.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import authSchema from "../schemas/signInSchema.js";

const authRouter: Router = Router();

authRouter.post("/sign-up", validateSchemaMiddleware(authSchema), authController.signUp);

export default authRouter;