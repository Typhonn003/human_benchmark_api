import { Router } from "express";
import { Validators, ScoreMiddleware } from "../../middlewares";
import { SScoreRequest, SScoreUpdate } from "../../schemas";
import ScoreController from "./score.controller";

const gameRouter: Router = Router();

gameRouter.post(
  "",
  Validators.bodyIsValid(SScoreRequest),
  ScoreController.register
);
gameRouter.get("/:id", ScoreMiddleware.gameExists, ScoreController.getById);
gameRouter.get("", ScoreController.getAll);
gameRouter.patch(
  "/:id",
  ScoreMiddleware.gameExists,
  Validators.bodyIsValid(SScoreUpdate),
  ScoreController.update
);
gameRouter.delete("/:id", ScoreMiddleware.gameExists, ScoreController.delete);

export { gameRouter };
