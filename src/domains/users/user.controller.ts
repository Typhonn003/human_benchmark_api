import { Request, Response } from "express";
import UserService from "./user.services";

class UserController {
  static register = async (req: Request, res: Response) => {
    const newUser = await UserService.create(req.body);

    res.status(201).json(newUser);
  };

  static getAll = async (req: Request, res: Response) => {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const users = await UserService.getAll(page, limit);

    res.status(200).json(users);
  };

  static getById = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const user = await UserService.getById(userId);

    res.status(200).json(user);
  };

  static update = async (req: Request, res: Response) => {
    const userId = req.params.id;
    const updatedUser = await UserService.update(userId, req.body);

    res.status(200).json(updatedUser);
  };

  static deactivate = async (req: Request, res: Response) => {
    const userId = req.params.id;
    await UserService.deactivate(userId);

    res.status(200).json({ message: "Usuário desativado com sucesso" });
  };
}

export default UserController;
