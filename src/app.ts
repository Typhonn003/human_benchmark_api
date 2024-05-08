import "express-async-errors";
import "reflect-metadata";

import express, { Application } from "express";
import { userRouter } from "./domains/users";
import { handleErrors } from "./errors";

const app: Application = express();

app.use(express.json());

app.use("/users", userRouter);

app.use(handleErrors);

export default app;
