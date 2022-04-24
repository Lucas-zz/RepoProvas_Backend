import { Router } from 'express';
import authRouter from './authRouter.js';
import testRouter from './testRouter.js';

const router: Router = Router();

router.use(authRouter);
router.use(testRouter);

export default router;