import { Router } from "express";
import UserController from "./user.controller";
import { Validators, UserMiddleware } from "../../middlewares";
import { SUserRequest, SUserUpdate } from "../../schemas";

const userRouter: Router = Router();

userRouter.post(
  "",
  Validators.bodyIsValid(SUserRequest),
  UserMiddleware.usernameIsUnique,
  UserMiddleware.emailIsUnique,
  UserController.register
);
userRouter.get("/:id", UserMiddleware.userExists, UserController.getById);
userRouter.get("", UserController.getAll);
userRouter.patch(
  "/:id",
  UserMiddleware.userExists,
  Validators.bodyIsValid(SUserUpdate),
  UserMiddleware.usernameIsUnique,
  UserMiddleware.emailIsUnique,
  UserController.update
);
userRouter.delete("/:id", UserMiddleware.userExists, UserController.deactivate);

export { userRouter };
