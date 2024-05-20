import { Router } from "express";
import { Validators, ScoreMiddleware } from "../../middlewares";
import { SScoreRequest, SScoreUpdate } from "../../schemas";
import ScoreController from "./score.controller";

const scoreRouter: Router = Router();

scoreRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.isAdmin,
  Validators.bodyIsValid(SScoreRequest),
  ScoreController.register
);
scoreRouter.get("/:id", ScoreMiddleware.scoreExists, ScoreController.getById);
scoreRouter.get("", ScoreController.getAll);
scoreRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  Validators.isAdmin,
  ScoreMiddleware.scoreExists,
  Validators.bodyIsValid(SScoreUpdate),
  ScoreController.update
);
scoreRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  Validators.isAdmin,
  ScoreMiddleware.scoreExists,
  ScoreController.delete
);

export { scoreRouter };
