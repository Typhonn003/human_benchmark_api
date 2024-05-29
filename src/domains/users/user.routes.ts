import { Router } from "express";
import UserController from "./user.controller";
import { Validators, UserMiddleware } from "../../middlewares";
import { SUserRequest, SUserUpdate } from "../../schemas";

const userRouter: Router = Router();

userRouter.post(
  "",
  Validators.bodyIsValid(SUserRequest),
  UserMiddleware.emailIsUnique,
  UserController.register
);
userRouter.get(
  "/profile",
  Validators.tokenIsValid,
  UserMiddleware.retrieveUserByToken
);
userRouter.get("/:id", UserMiddleware.userExists, UserController.getById);
userRouter.get("", UserController.getAll);

userRouter.patch(
  "/:id",
  UserMiddleware.userExists,
  Validators.tokenIsValid,
  Validators.isOwnerOrAdmin,
  Validators.bodyIsValid(SUserUpdate),
  UserController.update
);
userRouter.delete(
  "/:id",
  UserMiddleware.userExists,
  Validators.tokenIsValid,
  Validators.isOwnerOrAdmin,
  UserController.deactivate
);

export { userRouter };
