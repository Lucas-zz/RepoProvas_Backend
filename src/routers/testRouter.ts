import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import { validateSchemaMiddleware } from "../middlewares/validateSchemaMiddleware.js";
import * as testController from "../controllers/testController.js"
import * as newTestSchema from "../schemas/newTestSchema.js";

const testRouter: Router = Router();

testRouter.use(validateTokenMiddleware);

testRouter.get("/tests", testController.getAllTests);
testRouter.post("/tests", validateSchemaMiddleware(newTestSchema.newTestSchema), testController.addNewTest);
testRouter.patch("/tests/:testId/countView", testController.updateTestViewsCount);

export default testRouter;