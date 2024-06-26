"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@nextui-org/react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { AppConfig } from "@/constants/app.config";
import AppInput from "@/components/AppInput";
import { schemaSignup, SignupSchema } from "../auth/_schema/Signup";

export default function SignupActionForm() {
  const { replace } = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SignupSchema>({
    resolver: zodResolver(schemaSignup),
  });
  const [loading, setLoading] = useState(false);
  const onSubmit: SubmitHandler<SignupSchema> = async (data: SignupSchema) => {
    setLoading(true);
    axios
      .post(`${AppConfig.apiUrl}/user`, data)
      .then((res) => {
        if (res.data.code === "P2002") {
          toast.error("Akun sudah terdaftar");
        } else {
          toast.success("Akun berhasil dibuat");
          replace("/auth/login");
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-[300px]">
      <h1 className="mb-8 text-xl font-bold text-center">Sign Up</h1>{" "}
      <AppInput
        label="Nama"
        type="text"
        required
        isInvalid={errors.name ? true : false}
        errorMessage={errors.name && errors.name.message}
        {...register("name")}
      />
      <AppInput
        label="Email"
        type="email"
        isInvalid={errors.email ? true : false}
        errorMessage={errors.email && errors.email.message}
        required
        {...register("email")}
      />
      <AppInput
        label="Password"
        type="password"
        isInvalid={errors.password ? true : false}
        errorMessage={errors.password && errors.password.message}
        required
        {...register("password")}
      />
      <AppInput
        label="No. Handphone"
        type="number"
        description="Contoh: 081234567890"
        isInvalid={errors.phone ? true : false}
        errorMessage={errors.phone && errors.phone.message}
        required
        {...register("phone")}
      />
      <AppInput
        label="Alamat"
        type="text"
        isInvalid={errors.address ? true : false}
        errorMessage={errors.address && errors.address.message}
        description="Contoh: Jl, No. Rumah, RT/RW, Kota, Kecamatan, Provinsi."
        required
        {...register("address")}
      />
      <Button color="primary" fullWidth type="submit" isLoading={loading}>
        Buat Akun
      </Button>
    </form>
  );
}
