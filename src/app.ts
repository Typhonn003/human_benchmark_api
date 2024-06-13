import "express-async-errors";
import "reflect-metadata";

import express, { Application } from "express";
import { scoreRouter, gameRouter, userRouter, loginRouter } from "./domains";
import { handleErrors } from "./errors";
import cors from "cors";

const app: Application = express();

const whiteList = ["http://localhost:3000", "http://127.0.0.1:3000"];

const corsOptions = {
  origin(origin: string | undefined, cb: Function) {
    if (whiteList.indexOf(origin!) !== -1 || !origin) {
      cb(null, true);
    } else {
      cb(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(express.json());
app.use(cors(corsOptions));

app.use("/users", userRouter);
app.use("/games", gameRouter);
app.use("/scores", scoreRouter);
app.use("/login", loginRouter);

app.use(handleErrors);

export default app;
