import { hashSync } from "bcrypt";
import { z } from "zod";

const SUser = z.object({
  id: z.string(),
  name: z.string(),
  username: z.string(),
  email: z.string(),
  password: z
    .string()
    .max(100)
    .transform((password) => hashSync(password, 10)),
  role: z.enum(["user", "admin"]),
  active: z.boolean(),
});

const SUserRequest = SUser.omit({
  id: true,
  role: true,
  active: true,
});

const SUserResponse = SUser.omit({
  password: true,
});

const SUserUpdate = SUserRequest.partial();

type TUser = z.infer<typeof SUser>;
type TUserRequest = z.infer<typeof SUserRequest>;
type TUserResponse = z.infer<typeof SUserResponse>;
type TUserUpdate = Omit<Partial<TUserRequest>, "active">;

export {
  SUser,
  SUserRequest,
  SUserResponse,
  SUserUpdate,
  TUser,
  TUserRequest,
  TUserResponse,
  TUserUpdate,
};
