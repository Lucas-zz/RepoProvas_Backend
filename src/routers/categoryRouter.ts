import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import * as categoryControler from "../controllers/categoryController.js";

const categoryRouter: Router = Router();

categoryRouter.get("/categories", validateTokenMiddleware, categoryControler.getAllCategories);

export default categoryRouter;