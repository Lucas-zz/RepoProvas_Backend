import cors from "cors";
import 'express-async-errors';
import express, { json } from "express";

import router from "./routers/index.js";

const app = express();

app.use(cors());
app.use(json());
app.use(router);

export default app;