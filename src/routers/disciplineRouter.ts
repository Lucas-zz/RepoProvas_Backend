import { Router } from "express";
import * as disciplineController from "../controllers/disciplineController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const disciplineRouter = Router();

disciplineRouter.get("/disciplines", validateTokenMiddleware, disciplineController.findDisciplines);

export default disciplineRouter;