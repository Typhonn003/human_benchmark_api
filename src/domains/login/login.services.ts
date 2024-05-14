import prisma from "../../server";
import { AppError } from "../../errors";
import { compare } from "bcrypt";
import jwt from "jsonwebtoken";
import { TLoginRequest, TLoginResponse } from "../../schemas";

class LoginService {
  static createUserToken = async ({
    email,
    password,
  }: TLoginRequest): Promise<TLoginResponse> => {
    const user = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError("Invalid credentials", 403);
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new AppError("Invalid credentials", 403);
    }

    const token = jwt.sign({ id: user.id }, process.env.SECRET_KEY!, {
      expiresIn: process.env.EXPIRES_IN!,
      subject: "null",
    });

    return {
      token,
      id: user.id,
    };
  };
}

export default LoginService;
