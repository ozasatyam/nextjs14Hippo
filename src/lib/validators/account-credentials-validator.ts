import { z } from "zod";

export const AuthCredntialValidator = z.object({
    email: z.string().email(),
    password: z.string().min(8, "Password must be 8 charater long"),
});
export type TAuthCredntialValidator = z.infer<typeof AuthCredntialValidator>;
