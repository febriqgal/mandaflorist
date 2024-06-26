/* eslint-disable @next/next/no-img-element */
"use client";
import { AppConfig, formatRupiah } from "@/constants/app.config";
import { usePostCartMutation } from "@/redux/feature/cartSlice";
import { useGetProductByIdQuery } from "@/redux/feature/productsSlice";
import {
  Avatar,
  Button,
  CircularProgress,
  Input,
  Skeleton,
  Tab,
  Tabs,
  Textarea,
} from "@nextui-org/react";
import { Rating } from "@smastrom/react-rating";
import "@smastrom/react-rating/style.css";
import dayjs from "dayjs";
import "dayjs/locale/id";
import relativeTime from "dayjs/plugin/relativeTime";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { SyntheticEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import StickyBox from "react-sticky-box";

export default function ProductPage({ params }: { params: { id: string } }) {
  const { data: session, status } = useSession();
  const [note, setNote] = useState("");
  const [price, setPrice] = useState(0);
  const [count, setCounter] = useState(1);
  const { data, isLoading } = useGetProductByIdQuery(params.id);
  const [postOrder] = usePostCartMutation();
  const [loading, setLoading] = useState(false);
  dayjs.locale("id");
  dayjs.extend(relativeTime);

  useEffect(() => {
    setPrice(data?.data.price - (data?.data.price * data?.data.discount) / 100);
  }, [data?.data.price, data?.data.discount]);

  if (isLoading && status === "loading")
    return (
      <div className="flex items-start justify-center h-screen">
        <CircularProgress />
      </div>
    );

  const handleCart = async (e: SyntheticEvent) => {
    setLoading(true);
    e.preventDefault();

    if (!session) {
      toast.error("Silahkan login terlebih dahulu");
      setLoading(false);
      return;
    }
    await postOrder({
      note: note,
      userId: session.user.id!,
      quantity: count,
      total: price,
      productId: data?.data.id,
    });
    setLoading(false);
    toast.success("Berhasil, produk ditambahkan ke keranjang");
  };
  return (
    <div className="flex w-full items-start justify-start py-[74px]">
      <div className="flex flex-row items-start justify-start gap-5">
        <div className="grid items-start w-full grid-cols-2 gap-5">
          <StickyBox offsetTop={72} offsetBottom={20}>
            <div className="flex items-center justify-center w-full aspect-video bg-primary-900 rounded-xl overflow-clip">
              <img
                className="object-cover w-full aspect-video"
                src={`http://localhost:3000/product/${data?.data.image}`}
                alt="#"
              />
            </div>
          </StickyBox>
          <div className="flex items-start">
            <div className="">
              <div>
                <h1 className="text-3xl font-extrabold tracking-tight">
                  {data?.data.title}
                </h1>
                <div className="flex gap-2">
                  <h1 className="">{`Terjual ${data?.data.sold}`}</h1>
                  <h1>|</h1>
                  <h1 className="">{`Tersisa ${data?.data.stock}`}</h1>
                </div>
              </div>
              <div className="mt-3">
                <div className="text-3xl font-bold ">
                  {formatRupiah(
                    Number(data?.data.price) -
                      (Number(data?.data.price) * Number(data?.data.discount)) /
                        100
                  )}
                </div>
                <div className="flex gap-2 mt-1">
                  <h1 className="flex items-center justify-center px-2 text-xs text-white bg-red-500 rounded-xl">
                    {data?.data.discount}%
                  </h1>
                  <div className="line-through">
                    {formatRupiah(Number(data?.data.price))}
                  </div>
                </div>
              </div>
              <div className="flex flex-col w-full mt-3">
                <Tabs variant="bordered" color="primary" aria-label="Options">
                  <Tab key="detail" title="Deskripsi Produk">
                    <div>
                      <h1>{data?.data.desc}</h1>
                    </div>
                  </Tab>
                  <Tab key="ulasan" title="Ulasan">
                    <div>
                      {data?.data.review.length === 0 ? (
                        <h1>Belum ada ulasan</h1>
                      ) : (
                        <div className="flex flex-col gap-4">
                          {data?.data.review.map((e: any) => (
                            <div key={e.id} className="flex flex-col gap-1">
                              <div className="flex gap-2">
                                <Avatar color="primary" />
                                <div>
                                  <div className="flex gap-2">
                                    <h1 className="font-bold">{e.user.name}</h1>
                                    {" - "}
                                    <h1>{dayjs(e.createdAt).fromNow()}</h1>
                                  </div>
                                  <Rating
                                    readOnly
                                    style={{ maxWidth: 100 }}
                                    value={e.rating}
                                  />
                                  <h1>{e.desc}</h1>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  </Tab>
                </Tabs>
              </div>
            </div>
          </div>
        </div>
        <StickyBox
          offsetTop={72}
          offsetBottom={20}
          className="flex gap-5 bg-white h-fit w-[400px] p-5 items-center flex-col border-2 rounded-xl"
        >
          <h1>Atur jumlah pembelian</h1>
          <Input
            fullWidth
            variant="bordered"
            color="primary"
            startContent={
              <Button
                onPress={() => {
                  count <= 1 ? null : setCounter(count - 1);
                  count <= 1
                    ? 0
                    : setPrice(
                        Number(price) -
                          Number(
                            data?.data.price -
                              (data?.data.price * data?.data.discount) / 100
                          )
                      );
                }}
                color="primary"
                variant="light"
                size="sm"
              >
                -
              </Button>
            }
            endContent={
              <Button
                onPress={async () => {
                  if (count >= data?.data.stock) {
                    return toast.error("Stok hanya sisa " + data?.data.stock);
                  }
                  setCounter(count + 1);
                  setPrice(
                    Number(price) +
                      Number(
                        data?.data.price -
                          (data?.data.price * data?.data.discount) / 100
                      )
                  );
                }}
                color="primary"
                size="sm"
                variant="light"
              >
                +
              </Button>
            }
            style={{ textAlign: "center" }}
            value={String(count)}
          />
          <div className="flex justify-between w-full">
            <h1>Subtotal:</h1>
            {isLoading ? (
              <Skeleton className="w-20 h-5 rounded-xl" />
            ) : (
              <h1>{formatRupiah(Number(price.toFixed(0)))}</h1>
            )}
          </div>
          <form onSubmit={handleCart} className="flex flex-col w-full gap-1">
            <Textarea
              name="note"
              type="text"
              title="exp: warna, ukuran, dll yang diinginkan"
              size="sm"
              label="Catatan"
              placeholder="exp: warna, ukuran, dll. yang diinginkan"
              fullWidth
              color="primary"
              isRequired
              onChange={(e) => {
                setNote(e.target.value);
              }}
            />
            <Button
              className="mt-2"
              type="submit"
              size="sm"
              isLoading={loading}
              fullWidth
              color="primary"
            >
              Tambah ke keranjang
            </Button>
            {!session ? (
              <Button
                startContent={<>💬</>}
                size="sm"
                onPress={() => {
                  toast.error("Silahkan login terlebih dahulu");
                }}
                fullWidth
                color="primary"
              >
                Hubungi Toko
              </Button>
            ) : (
              <Button
                startContent={<>💬</>}
                size="sm"
                as={Link}
                target="_blank"
                href={`https://web.whatsapp.com/send?phone=+6282285451333&text=Halo%20Saya%20tertarik%20dengan%20Produk%20*${data?.data.title}*,%20apakah%20barang%20ini%20ready?&app_absent=0`}
                fullWidth
                color="primary"
              >
                Hubungi Toko
              </Button>
            )}
          </form>
        </StickyBox>
      </div>
    </div>
  );
}
