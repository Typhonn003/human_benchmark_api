import "express-async-errors";
import "reflect-metadata";

import express, { Application } from "express";
import { scoreRouter, gameRouter, userRouter, loginRouter } from "./domains";
import { handleErrors } from "./errors";
import cors from "cors";

const app: Application = express();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use("/users", userRouter);
app.use("/games", gameRouter);
app.use("/scores", scoreRouter);
app.use("/login", loginRouter);

app.use(handleErrors);

export default app;
