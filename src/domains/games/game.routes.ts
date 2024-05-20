import { Router } from "express";
import GameController from "./game.controller";
import { Validators, GameMiddleware } from "../../middlewares";
import { SGameRequest, SGameUpdate } from "../../schemas";

const gameRouter: Router = Router();

gameRouter.post(
  "",
  Validators.tokenIsValid,
  Validators.isAdmin,
  Validators.bodyIsValid(SGameRequest),
  GameMiddleware.gameIsUnique,
  GameController.register
);
gameRouter.get("/:id", GameMiddleware.gameExists, GameController.getById);
gameRouter.get("", GameController.getAll);
gameRouter.patch(
  "/:id",
  Validators.tokenIsValid,
  Validators.isAdmin,
  GameMiddleware.gameExists,
  Validators.bodyIsValid(SGameUpdate),
  GameMiddleware.gameIsUnique,
  GameController.update
);
gameRouter.delete(
  "/:id",
  Validators.tokenIsValid,
  Validators.isAdmin,
  GameMiddleware.gameExists,
  GameController.delete
);

export { gameRouter };
