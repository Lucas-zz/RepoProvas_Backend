import { Router } from "express";
import { validateTokenMiddleware } from "../middlewares/validateTokenMiddleware.js";
import * as categoryControler from "../controllers/categoryRepository.js";

const categoryRouter: Router = Router();

categoryRouter.get("/categories", validateTokenMiddleware, categoryControler.findCategories);

export default categoryRouter;