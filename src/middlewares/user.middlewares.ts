import { NextFunction, Request, Response } from "express";
import prisma from "../server";
import { AppError } from "../errors";

class UserMiddleware {
  static usernameIsUnique = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const { username } = req.body;

    if (username) {
      const user = await prisma.user.findFirst({
        where: {
          username,
        },
      });

      if (user) {
        throw new AppError("Username already exists", 409);
      }
    }

    return next();
  };

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
}

export { UserMiddleware };
