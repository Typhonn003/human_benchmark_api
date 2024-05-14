import { Router } from "express";
import GameController from "./game.controller";
import { Validators, GameMiddleware } from "../../middlewares";
import { SGameRequest, SGameUpdate } from "../../schemas";

const gameRouter: Router = Router();

gameRouter.post(
  "",
  Validators.bodyIsValid(SGameRequest),
  GameMiddleware.gameIsUnique,
  GameController.register
);
gameRouter.get("/:id", GameMiddleware.gameExists, GameController.getById);
gameRouter.get("", GameController.getAll);
gameRouter.patch(
  "/:id",
  GameMiddleware.gameExists,
  Validators.bodyIsValid(SGameUpdate),
  GameMiddleware.gameIsUnique,
  GameController.update
);
gameRouter.delete("/:id", GameMiddleware.gameExists, GameController.delete);

export { gameRouter };
