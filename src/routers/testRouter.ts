import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import * as testController from "../controllers/testController.js"

const testRouter: Router = Router();

testRouter.get("/tests", validateTokenMiddleware, testController.findAllTests);

export default testRouter;