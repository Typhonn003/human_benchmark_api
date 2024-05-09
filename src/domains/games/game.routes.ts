import { Router } from "express";
import GameController from "./game.controller";
import { Validators } from "../../middlewares";
import { SGameRequest, SGameUpdate } from "../../schemas";

const gameRouter: Router = Router();

gameRouter.post("", Validators.bodyIsValid(SGameRequest));
gameRouter.get("/:id");
gameRouter.get("");
gameRouter.patch("/:id", Validators.bodyIsValid(SGameUpdate));
gameRouter.delete("/:id");

export { gameRouter };
