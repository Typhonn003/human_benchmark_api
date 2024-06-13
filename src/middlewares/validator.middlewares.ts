import { NextFunction, Request, Response } from "express";
import { ZodTypeAny } from "zod";
import { AppError } from "../errors";
import jwt from "jsonwebtoken";
import "dotenv/config";
import prisma from "../server";

class Validators {
  static bodyIsValid = (schema: ZodTypeAny) => {
    return (req: Request, _res: Response, next: NextFunction): void => {
      const validatedBody = schema.parse(req.body);
      req.body = validatedBody;

      return next();
    };
  };

  static tokenIsValid = (req: Request, res: Response, next: NextFunction) => {
    const token: string | undefined = req.headers.authorization;

    if (!token) {
      throw new AppError("Missing bearer token", 401);
    }

    const splitedToken = token.split(" ")[1];

    jwt.verify(
      splitedToken,
      process.env.SECRET_KEY!,
      (error: any, decoded: any) => {
        if (error) {
          throw new AppError("Invalid token", 401);
        }

        res.locals.userId = decoded.userId;
        res.locals.role = decoded.role;

        return next();
      }
    );
  };

  static isOwnerOrAdmin = (req: Request, res: Response, next: NextFunction) => {
    const userId: string = req.params.id;
    const userIdToken: string = res.locals.userId;
    const role: string = res.locals.role;

    if (userId !== userIdToken && role !== "admin") {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  };

  static isAdmin = (req: Request, res: Response, next: NextFunction) => {
    const role: string = res.locals.role;

    if (role !== "admin") {
      throw new AppError("Unauthorized", 401);
    }

    return next();
  };
}

export { Validators };
