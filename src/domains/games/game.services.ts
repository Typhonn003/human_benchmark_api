import prisma from "../../server";
import {
  SGameResponse,
  TGameRequest,
  TGameResponse,
  TGameUpdate,
} from "../../schemas";

class GameService {
  private static validateAndTransformGame = (game: any): TGameResponse => {
    return SGameResponse.parse(game);
  };

  static create = async (data: TGameRequest): Promise<TGameResponse> => {
    const createdGame = await prisma.game.create({
      data: {
        ...data,
      },
    });
    return this.validateAndTransformGame(createdGame);
  };

  static getAll = async (
    page: number,
    limit: number
  ): Promise<{
    data: TGameResponse[];
    pagination: { currentpage: number; limit: number };
  }> => {
    const offset = (page - 1) * limit;
    const games = await prisma.game.findMany({
      skip: offset,
      take: limit,
    });

    return {
      data: games.map(this.validateAndTransformGame),
      pagination: { currentpage: page, limit: limit },
    };
  };

  static getById = async (id: string): Promise<TGameResponse> => {
    const game = await prisma.game.findUniqueOrThrow({
      where: { id },
    });
    return this.validateAndTransformGame(game);
  };

  static update = async (
    id: string,
    data: TGameUpdate
  ): Promise<TGameResponse> => {
    const updatedUser = await prisma.game.update({
      where: { id },
      data: data,
    });
    return this.validateAndTransformGame(updatedUser);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.game.delete({
      where: { id },
    });
  };
}

export default GameService;
