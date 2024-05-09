import prisma from "../../server";
import { SGameResponse, TGameResponse } from "../../schemas";

class GameService {
  private static valiteAndTransformGame = (game: any): TGameResponse => {
    return SGameResponse.parse(game);
  };

  static create = () => {};

  static getAll = () => {};

  static getById = () => {};

  static update = () => {};

  static delete = () => {};
}

export default GameService;
