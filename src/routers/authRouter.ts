import { Router } from "express";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import * as authController from "../controllers/authController.js";
import * as authSchema from "../schemas/authSchema.js";

const authRouter: Router = Router();

authRouter.post("/sign-up", validateSchemaMiddleware(authSchema.signUpSchema), authController.signUp);
authRouter.post("/sign-in", validateSchemaMiddleware(authSchema.signInSchema), authController.signIn);

export default authRouter;