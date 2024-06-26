import { NextFunction, Request, Response } from "express";
import prisma from "../server";
import { AppError } from "../errors";
import UserService from "../domains/users/user.services";

class UserMiddleware {
  static emailIsUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { email } = req.body;

    if (email) {
      const user = await prisma.user.findFirst({
        where: {
          email,
        },
      });

      if (user) {
        throw new AppError("Email already exists", 409);
      }
    }

    return next();
  };

  static userExists = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { id } = req.params;

    const user = await prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("User not found", 404);
    }

    return next();
  };

  static retrieveUserByToken = async (req: Request, res: Response) => {
    const userId: string = res.locals.userId;

    const user = await UserService.getByIdScore(userId);

    return res.json(user);
  };
}

export { UserMiddleware };
