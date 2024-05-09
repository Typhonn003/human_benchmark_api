import { z } from "zod";
import { SUserResponse } from "./user.schema";

// Falta adicionar o user_points
const SGame = z.object({
  id: z.string(),
  name: z.string(),
  highest_score_user: SUserResponse.nullish(),
});

const SGameRequest = SGame.omit({
  id: true,
  highest_score_user: true,
});

const SGameResponse = SGame;

const SGameUpdate = SGame.partial();

type TGame = z.infer<typeof SGame>;
type TGameRequest = z.infer<typeof SGameRequest>;
type TGameResponse = z.infer<typeof SGameResponse>;
type TGameUpdate = Omit<Partial<TGameRequest>, "highest_score_user">;

export {
  SGame,
  SGameRequest,
  SGameResponse,
  SGameUpdate,
  TGame,
  TGameRequest,
  TGameResponse,
  TGameUpdate,
};
