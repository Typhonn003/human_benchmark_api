import prisma from "../../server";
import { SScoreResponse, TScoreResponse, TScoreUpdate } from "../../schemas";

class ScoreService {
  private static validateAndTransformScore = (game: any): TScoreResponse => {
    return SScoreResponse.parse(game);
  };

  static create = async (data: TScoreResponse): Promise<TScoreResponse> => {
    const createdScore = await prisma.userPoints.create({
      data: {
        ...data,
      },
    });
    return this.validateAndTransformScore(createdScore);
  };

  static getAll = async (
    page: number,
    limit: number
  ): Promise<{
    data: TScoreResponse[];
    pagination: { currentpage: number; limit: number };
  }> => {
    const offset = (page - 1) * limit;
    const scores = await prisma.userPoints.findMany({
      skip: offset,
      take: limit,
    });

    return {
      data: scores.map(this.validateAndTransformScore),
      pagination: { currentpage: page, limit: limit },
    };
  };

  static getById = async (id: string): Promise<TScoreResponse> => {
    const score = await prisma.userPoints.findUniqueOrThrow({
      where: { id },
    });
    return this.validateAndTransformScore(score);
  };

  static update = async (
    id: string,
    data: TScoreUpdate
  ): Promise<TScoreResponse> => {
    const score = await prisma.userPoints.update({
      where: { id },
      data: data,
    });
    return this.validateAndTransformScore(score);
  };

  static delete = async (id: string): Promise<void> => {
    await prisma.userPoints.delete({
      where: { id },
    });
  };
}

export default ScoreService;
