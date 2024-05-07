import { Router } from "express";
import UserController from "./user.controller";

const userRouter: Router = Router();

userRouter.post("", UserController.register);
userRouter.get("/:id", UserController.getById);
userRouter.get("", UserController.getAll);
userRouter.patch("/:id", UserController.update);
userRouter.delete("/:id", UserController.deactivate);

export { userRouter };
