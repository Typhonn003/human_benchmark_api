import { NextFunction, Request, Response } from "express";
import prisma from "../server";
import { AppError } from "../errors";

class ScoreMiddleware {
  static scoreExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const score = await prisma.userPoints.findFirst({
      where: {
        id,
      },
    });

    if (!score) {
      throw new AppError("Score not found", 404);
    }

    return next();
  };
}

export { ScoreMiddleware };
