import { Request, Response } from "express";
import ScoreService from "./score.services";

class ScoreController {
  static register = async (req: Request, res: Response) => {
    const newScore = await ScoreService.create(req.body);

    res.status(201).json(newScore);
  };

  static getAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const scores = await ScoreService.getAll(page, limit);

    res.status(200).json(scores);
  };

  static getById = async (req: Request, res: Response) => {
    const scoreId = req.params.id;
    const score = await ScoreService.getById(scoreId);

    res.status(200).json(score);
  };

  static update = async (req: Request, res: Response) => {
    const scoreId = req.params.id;
    const score = await ScoreService.update(scoreId, req.body);

    res.status(200).json(score);
  };

  static delete = async (req: Request, res: Response) => {
    const scoreId = req.params.id;
    await ScoreService.delete(scoreId);

    res.status(200).json({ message: "Pontuação deletado com sucesso" });
  };
}

export default ScoreController;
