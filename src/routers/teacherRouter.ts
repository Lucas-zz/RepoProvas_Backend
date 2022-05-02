import { Router } from "express";
import * as teacherController from "../controllers/teacherController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware";

const teacherRouter = Router();

teacherRouter.get("/teacher", validateTokenMiddleware, teacherController.getTeacherNames);
teacherRouter.get("/teachers/:discipline", validateTokenMiddleware, teacherController.getTeacherByDiscipline);

export default teacherRouter;