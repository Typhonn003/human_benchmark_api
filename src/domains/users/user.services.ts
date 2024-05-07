import prisma from "../../server";
import {
  SUserResponse,
  TUserRequest,
  TUserResponse,
  TUserUpdate,
} from "../../schemas";

class UserService {
  private static validateAndTransformUser(user: any): TUserResponse {
    return SUserResponse.parse(user);
  }

  static async create(data: TUserRequest): Promise<TUserResponse> {
    const createdUser = await prisma.user.create({
      data: {
        ...data,
      },
    });
    return this.validateAndTransformUser(createdUser);
  }

  static async getAll(
    page: number,
    limit: number
  ): Promise<{
    data: TUserResponse[];
    pagination: { currentpage: number; limit: number };
  }> {
    const offset = (page - 1) * limit;
    const users = await prisma.user.findMany({
      skip: offset,
      take: limit,
    });

    return {
      data: users.map(this.validateAndTransformUser),
      pagination: { currentpage: page, limit: limit },
    };
  }

  static async getById(id: string): Promise<TUserResponse> {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id },
    });
    return this.validateAndTransformUser(user);
  }

  static async update(id: string, data: TUserUpdate): Promise<TUserResponse> {
    const updatedUser = await prisma.user.update({
      where: { id },
      data: data,
    });
    return this.validateAndTransformUser(updatedUser);
  }

  static async deactivate(id: string): Promise<void> {
    await prisma.user.update({
      where: { id },
      data: { active: false },
    });
  }
}

export default UserService;
