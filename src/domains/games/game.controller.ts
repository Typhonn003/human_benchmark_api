import { Request, Response } from "express";
import GameService from "./game.services";

class GameController {
  static register = async (req: Request, res: Response) => {
    const newGame = await GameService.create(req.body);

    res.status(201).json(newGame);
  };

  static getAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const users = await GameService.getAll(page, limit);

    res.status(200).json(users);
  };

  static getById = async (req: Request, res: Response) => {
    const gameId = req.params.id;
    const user = await GameService.getById(gameId);

    res.status(200).json(user);
  };

  static update = async (req: Request, res: Response) => {
    const gameId = req.params.id;
    const updatedUser = await GameService.update(gameId, req.body);

    res.status(200).json(updatedUser);
  };

  static delete = async (req: Request, res: Response) => {
    const gameId = req.params.id;
    await GameService.delete(gameId);

    res.status(200).json({ message: "Jogo deletado com sucesso" });
  };
}

export default GameController;
