import { z } from "zod";

export const schemaLogin = z.object({
  email: z.string().email({
    message: "Format email tidak sesuai",
  }),
  password: z.string().min(10, { message: "Password minimal 10 karakter" }),
});

export type LoginSchema = z.infer<typeof schemaLogin>;
