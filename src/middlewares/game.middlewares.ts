import { NextFunction, Request, Response } from "express";
import prisma from "../server";
import { AppError } from "../errors";

class GameMiddleware {
  static gameIsUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { name } = req.body;

    if (name) {
      const game = await prisma.game.findFirst({
        where: {
          name,
        },
      });

      if (game) {
        throw new AppError("Game already exists", 409);
      }
    }

    return next();
  };

  static gameExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const game = await prisma.game.findFirst({
      where: {
        id,
      },
    });

    if (!game) {
      throw new AppError("Game not found", 404);
    }

    return next();
  };
}

export { GameMiddleware };
