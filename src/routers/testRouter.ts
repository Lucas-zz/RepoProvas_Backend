import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import * as testController from "../controllers/testController.js"

const testRouter: Router = Router();

testRouter.use(validateTokenMiddleware);

testRouter.get("/tests", testController.findAllTests);
testRouter.post("/tests", testController.addNewTest);
testRouter.patch("/tests/:testId/countView", testController.updateTestViewsCount);

export default testRouter;