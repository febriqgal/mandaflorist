"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Input } from "@nextui-org/react";
import axios from "axios";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Eye, ViewOff } from "react-huge-icons/bulk";

import { AppConfig } from "@/constants/app.config";
import { LoginSchema, schemaLogin } from "../auth/_schema/Login";
export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginSchema>({
    resolver: zodResolver(schemaLogin),
  });
  const [loading, setLoading] = useState(false);

  const onSubmit: SubmitHandler<LoginSchema> = async (data: LoginSchema) => {
    setLoading(true);
    await axios
      .get(`${AppConfig.apiUrl}/user?email=${data.email}`)
      .then((res) => {
        const user = res.data.data;
        console.log(user);
        if (user.name === "PrismaClientInitializationError") {
          toast.error(
            "Terjadi kesalahan pada server, silahkan beberapa saat lagi"
          );
          return;
        }
        if (user.data === null) {
          toast.error("Akun tidak ditemukan");
          return;
        }
        if (user.password !== data.password) {
          toast.error("Password salah");
          return;
        }
        if (res.data.data.password === data.password)
          signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: false,
          });
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-[300px]">
      <h1 className="mb-8 text-xl font-bold text-center">Log In</h1>
      <Input
        label="Email"
        type="email"
        variant="flat"
        isInvalid={errors.email ? true : false}
        errorMessage={errors.email && errors.email.message}
        color="primary"
        isClearable
        required
        {...register("email", { required: true })}
      />

      <Input
        endContent={
          <div
            className="cursor-pointer"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? (
              <Eye
                className={errors.password ? "text-red-500" : "text-primary"}
                height={24}
                width={24}
              />
            ) : (
              <ViewOff
                className={errors.password ? "text-red-500" : "text-primary"}
                height={24}
                width={24}
              />
            )}
          </div>
        }
        label="Password"
        type={showPassword ? "text" : "password"}
        variant="flat"
        isInvalid={errors.password ? true : false}
        errorMessage={errors.password && errors.password.message}
        color="primary"
        required
        {...register("password", { required: true })}
      />
      <Button color="primary" fullWidth type="submit" isLoading={loading}>
        Masuk
      </Button>
      <Button
        color="primary"
        fullWidth
        variant="bordered"
        type="button"
        as={Link}
        href="/auth/signup"
      >
        Buat Akun
      </Button>
    </form>
  );
}
