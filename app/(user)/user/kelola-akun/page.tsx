"use client";

import AppInput from "@/components/AppInput";
import {
  useGetUserByIdQuery,
  useUpdateUserMutation,
} from "@/redux/feature/usersSlice";
import { Button, Input, Spinner } from "@nextui-org/react";
import { User } from "@prisma/client";
import axios from "axios";
import { useSession } from "next-auth/react";
import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import toast from "react-hot-toast";

export default function KelolaAkunPage() {
  const { data: session } = useSession();
  const { data: dataUser, isLoading } = useGetUserByIdQuery(session?.user.id);
  const { register, handleSubmit } = useForm<User>();
  const [updateUser] = useUpdateUserMutation();

  const onSubmit: SubmitHandler<User> = async (data) => {
    await updateUser({
      id: session?.user.id,
      name: data.name,
      phone: data.phone,
      address: data.address,
    });
    toast.success("Akun Berhasil Diperbarui");
  };
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Spinner />
      </div>
    );
  }
  return (
    <div className="flex items-center justify-center min-h-screen">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 w-[300px]">
        <AppInput
          type="text"
          label="Nama"
          defaultValue={dataUser?.data?.name}
          {...register("name")}
        />
        <AppInput
          type="email"
          isDisabled
          label="Email"
          defaultValue={dataUser?.data?.email}
          {...register("email")}
        />
        <AppInput
          type="number"
          label="No. Hp"
          defaultValue={dataUser?.data?.phone}
          {...register("phone")}
        />
        <AppInput
          type="text"
          label="Alamat"
          defaultValue={dataUser?.data?.address}
          {...register("address")}
        />
        <Button type="submit" color="primary" fullWidth>
          Kirim
        </Button>
      </form>
    </div>
  );
}
