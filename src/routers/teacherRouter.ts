import { Router } from "express";
import * as teacherController from "../controllers/teacherController.js";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";

const teacherRouter = Router();

teacherRouter.get("/teachers", validateTokenMiddleware, teacherController.getTeacherNames);
teacherRouter.get("/teachers/:discipline", validateTokenMiddleware, teacherController.getTeacherByDiscipline);

export default teacherRouter;