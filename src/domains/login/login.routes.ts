import { Router } from "express";
import { Validators } from "../../middlewares";
import { SLoginRequest } from "../../schemas";
import LoginController from "./login.controller";

const loginRouter: Router = Router();

loginRouter.post(
  "",
  Validators.bodyIsValid(SLoginRequest),
  LoginController.loginUser
);

export { loginRouter };
