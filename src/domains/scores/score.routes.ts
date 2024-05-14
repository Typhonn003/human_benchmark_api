import { Router } from "express";
import { Validators, ScoreMiddleware } from "../../middlewares";
import { SScoreRequest, SScoreUpdate } from "../../schemas";
import ScoreController from "./score.controller";

const scoreRouter: Router = Router();

scoreRouter.post(
  "",
  Validators.bodyIsValid(SScoreRequest),
  ScoreController.register
);
scoreRouter.get("/:id", ScoreMiddleware.gameExists, ScoreController.getById);
scoreRouter.get("", ScoreController.getAll);
scoreRouter.patch(
  "/:id",
  ScoreMiddleware.gameExists,
  Validators.bodyIsValid(SScoreUpdate),
  ScoreController.update
);
scoreRouter.delete("/:id", ScoreMiddleware.gameExists, ScoreController.delete);

export { scoreRouter };
