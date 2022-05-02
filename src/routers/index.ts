import { Router } from 'express';
import authRouter from './authRouter.js';
import categoryRouter from './categoryRouter.js';
import disciplineRouter from './disciplineRouter.js';
import testRouter from './testRouter.js';

const router: Router = Router();

router.use(authRouter);
router.use(testRouter);
router.use(categoryRouter);
router.use(disciplineRouter);

export default router;