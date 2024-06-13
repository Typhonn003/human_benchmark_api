import { z } from "zod";
import { SGame } from "./game.schema";

const SScore = z.object({
  id: z.string(),
  user_id: z.string(),
  game_id: z.string(),
  points: z.number(),
});

const SScoreRequest = SScore.omit({ id: true });

const SScoreResponse = SScore;

const SScoreResponseGame = SScore.extend({ game: SGame });

const SScoreUpdate = SScoreRequest.partial();

type TScore = z.infer<typeof SScore>;
type TScoreRequest = z.infer<typeof SScoreRequest>;
type TScoreResponse = z.infer<typeof SScoreResponse>;
type TScoreUpdate = Partial<TScoreRequest>;

export {
  SScore,
  SScoreRequest,
  SScoreResponse,
  SScoreUpdate,
  SScoreResponseGame,
  TScore,
  TScoreRequest,
  TScoreResponse,
  TScoreUpdate,
};
