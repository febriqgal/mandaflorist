"use client";
import { formatRupiah } from "@/constants/app.config";
/* eslint-disable @next/next/no-img-element */
import { useGetProductsQuery } from "@/redux/feature/productsSlice";
import { Skeleton, Spinner } from "@nextui-org/react";
import { Product } from "@prisma/client";
import Link from "next/link";

export default function BestSellingSection() {
  const { data, isLoading } = useGetProductsQuery({});
  if (isLoading)
    return (
      <div className="grid grid-cols-6 gap-4 mt-4">
        <Skeleton className="h-[300px] w-full rounded-xl mt-4" />
        <Skeleton className="h-[300px] w-full rounded-xl mt-4" />
        <Skeleton className="h-[300px] w-full rounded-xl mt-4" />
        <Skeleton className="h-[300px] w-full rounded-xl mt-4" />
        <Skeleton className="h-[300px] w-full rounded-xl mt-4" />
        <Skeleton className="h-[300px] w-full rounded-xl mt-4" />
      </div>
    );

  const dataProduk = data.data as [];

  return (
    <div className="grid grid-cols-6 gap-4 mt-4">
      {dataProduk.map((e: Product) => (
        <Link
          key={e.id}
          href={`/product/${e.id}`}
          className="flex flex-col border-2 shadow rounded-xl overflow-clip h-[300px]"
        >
          <div className="flex items-center justify-center w-full h-full overflow-clip bg-primary-100">
            <img
              className="object-cover w-full h-full"
              src={`http://localhost:3000/product/${e.image}`}
              alt="#"
            />
          </div>
          <div className="w-full py-1 pl-2 text-sm text-white rounded-br-full bg-gradient-to-tr from-primary-900 to-primary-500 text-start">
            {`✅ MandaFlorist`}
          </div>
          <div className="px-2 py-2 text-start">
            <h1 className="text-md font-bold line-clamp-2">{e.title}</h1>
            <div>
              <h1 className="pt-2 text-xs font-bold line-through">
                {formatRupiah(e.price)}
              </h1>
              <h1 className="pb-2 font-bold">
                {formatRupiah(Number(e.price - (e.price * e.discount) / 100))}
              </h1>
            </div>
            <h1 className="px-2 py-1 mb-2 text-xs font-semibold rounded-md bg-primary-200 text-primary-900 w-fit">{`Diskon ${e.discount}%`}</h1>
            <h1 className="text-sm">{``}</h1>
          </div>
        </Link>
      ))}
    </div>
  );
}
