import { z } from "zod";

const SGame = z.object({
  id: z.string(),
  name: z.string(),
});

const SGameRequest = SGame.omit({
  id: true,
});

const SGameResponse = SGame;

const SGameUpdate = SGameRequest.partial();

type TGame = z.infer<typeof SGame>;
type TGameRequest = z.infer<typeof SGameRequest>;
type TGameResponse = z.infer<typeof SGameResponse>;
type TGameUpdate = Partial<TGameRequest>;

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
