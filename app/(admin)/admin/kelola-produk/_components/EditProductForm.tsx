"use client";

import AppInput from "@/components/AppInput";
import { usePostProductMutation } from "@/redux/feature/productsSlice";
import { Button, Textarea } from "@nextui-org/react";
import { Product } from "@prisma/client";
import { AnimatePresence, motion } from "framer-motion";
import { useSession } from "next-auth/react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

export default function EditProductForm({ onClose }: { onClose: () => void }) {
  const { register, handleSubmit, reset } = useForm<Product>();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");
  const [postProduct] = usePostProductMutation();

  const onSubmit: SubmitHandler<Product> = async (data) => {
    setLoading(true);
    await postProduct({
      ...data,
      authorId: session?.user.id,
      price: Number(data.price),
      stock: Number(data.stock),
      discount: Number(data.discount),
    });
    reset();
    setValue("");
    setLoading(false);
    onClose();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full space-y-2">
      <AppInput
        label="Nama Produk"
        variant="faded"
        {...register("title", {
          onChange(event) {
            setValue(event.target.value);
          },
        })}
      />

      <Textarea
        label="Deskripsi"
        size="sm"
        color="primary"
        variant="faded"
        {...register("desc")}
      />
      <AppInput
        label="Stok"
        type="number"
        variant="faded"
        {...register("stock")}
      />
      <AppInput
        label="Harga"
        type="number"
        variant="faded"
        {...register("price")}
      />
      <AppInput
        endContent={<h1>%</h1>}
        label="Diskon"
        type="number"
        variant="faded"
        {...register("discount")}
      />
      <AppInput label="Image" variant="faded" {...register("image")} />
      <Button type="submit" fullWidth color="primary" isLoading={loading}>
        Kirim
      </Button>
    </form>
  );
}
