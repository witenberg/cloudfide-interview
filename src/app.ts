import express, { NextFunction, Request, Response } from "express";
import apiRouter from "./routes";
import { globalErrorHandler } from "./utils/errorHandler";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req: Request, res: Response, next: NextFunction) => {
    console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
    next();
});

app.use('/api/v1', apiRouter)

app.use(globalErrorHandler)

export default app;
