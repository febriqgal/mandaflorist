import { z } from "zod";

export const schemaSignup = z.object({
  name: z
    .string()
    .min(1, { message: "Nama tidak boleh kosong" })
    .max(20, { message: "Nama maksimal 20 karakter" }),
  email: z.string().min(1, { message: "Email tidak boleh kosong" }).email({
    message: "Format email tidak sesuai",
  }),
  password: z
    .string()
    .min(10, { message: "Password minimal 10 karakter" })
    .max(20, { message: "Password maksimal 20 karakter" }),
  phone: z
    .string()
    .min(1, { message: "Nomor telepon tidak boleh kosong" })
    .max(15, { message: "Nomor telepon maksimal 15 karakter" }),
  address: z.string().min(1, { message: "Alamat tidak boleh kosong" }),
});

export type SignupSchema = z.infer<typeof schemaSignup>;
