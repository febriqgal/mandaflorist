/* eslint-disable @next/next/no-img-element */
"use client";
import { useSession } from "next-auth/react";
import { SyntheticEvent, useState } from "react";
import toast from "react-hot-toast";
import { formatRupiah } from "@/constants/app.config";
import {
  Button,
  Checkbox,
  CheckboxGroup,
  CircularProgress,
  cn,
  Select,
  SelectItem,
  Skeleton,
} from "@nextui-org/react";
import { dataOngkir } from "../data/ongkir";
import {
  useGetCartByUserIdQuery,
  useUpdateCartMutation,
} from "@/redux/feature/cartSlice";
import { useGetUserByIdQuery } from "@/redux/feature/usersSlice";
import { CartWithProduct } from "@/types/cart.type";
import Link from "next/link";
import StickyBox from "react-sticky-box";
import { Location } from "react-huge-icons/outline";
import { usePostCheckoutMutation } from "@/redux/feature/checkoutSlice";

export default function SectionCart() {
  const [isLoading, setIsLoading] = useState(false);
  const [ongkir, setOngkir]: any = useState(0);
  const [groupSelected, setGroupSelected]: any = useState([]);
  const { data: session } = useSession();
  const [total, setTotal] = useState([0]);
  const [updateCart] = useUpdateCartMutation();
  const [postCheckout] = usePostCheckoutMutation();

  const { data: dataUser, isLoading: isLoadingUser } = useGetUserByIdQuery(
    session?.user.id
  );
  const { data: dataCart, isLoading: isLoadingCart } = useGetCartByUserIdQuery(
    session?.user.id
  );

  const handleNewOrders = async (e: SyntheticEvent) => {
    e.preventDefault();
    await postCheckout({
      userId: session?.user.id,
      total:
        Number(total.reduce((a: any, b: any) => a + b)) +
        Number(ongkir.anchorKey ?? 0),
      address: dataUser.data.address,
      proofOfPayment: "",
      cart: groupSelected.map((e: string) => {
        return { id: e };
      }),
    });

    await groupSelected.map(async (e: string) => {
      await updateCart({ id: e, isHidden: true });
    });
    if (
      groupSelected === undefined ||
      groupSelected.length === 0 ||
      groupSelected === null
    ) {
      return toast.error("Pilih produk terlebih dahulu");
    } else {
      toast.success("Berhasil checkout, silahkan lakukan pembayaran");
      setGroupSelected([]);
    }
  };
  if (isLoadingCart && isLoadingUser) {
    return (
      <div className="flex justify-center flex-col items-center  mt-20">
        <CircularProgress />
      </div>
    );
  }
  if (dataCart.data?.length === 0) {
    return (
      <div className="flex justify-center min-h-screen flex-col items-center ">
        <h1 className="text-2xl font-bold">Keranjang kosong 🥲</h1>
        <p className="text-2xl font-bold">
          Silahkan pilih produk yang diinginkan
        </p>
        <Button as={Link} href="/" color="primary" className="mt-4">
          Belanja Sekarang
        </Button>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-2xl font-bold">Keranjang 🛒</h1>
      <div className="flex justify-between w-full">
        <div className="space-y-4">
          <h1>Silahkan Pilih produk yang mau di checkout</h1>
          {isLoadingCart && isLoadingUser ? (
            <div className="space-y-2">
              {...Array(3)
                .fill(0)
                .map((_, i) => (
                  <Skeleton
                    key={i}
                    className="w-[571px] h-[114px] rounded-xl"
                  />
                ))}
            </div>
          ) : (
            <CheckboxGroup
              value={groupSelected}
              onChange={setGroupSelected}
              classNames={{
                base: "w-full",
              }}
              className="w-full"
            >
              {dataCart.data.map((e: CartWithProduct) => {
                return (
                  <Checkbox
                    key={e.id}
                    value={e.id}
                    onValueChange={(event) => {
                      if (event) {
                        setTotal([...total, e.total]);
                      } else {
                        total.splice(total.indexOf(e.total), 1);
                        setTotal([...total]);
                      }
                    }}
                    color="primary"
                    className="w-full"
                    classNames={{
                      base: cn(
                        "inline-flex  w-full bg-content1 m-0",
                        "hover:bg-content2 items-center justify-start",
                        "cursor-pointer rounded-lg gap-2 p-4 border-2 border-transparent",
                        "data-[selected=true]:border-primary"
                      ),
                    }}
                  >
                    <div className="flex justify-between overflow-clip w-[500px] gap-4 items-center">
                      <div className="flex items-center justify-center gap-4 overflow-clip">
                        <img
                          src={`http://localhost:3000/product/${e.products.image}`}
                          alt="#"
                          className="object-scale-down h-20 aspect-video rounded-xl"
                        />
                        <div className="flex flex-col gap-4">
                          <div>
                            <h1 className="text-sm font-bold line-clamp-1">
                              {e.products.title}
                            </h1>
                            <h1 className="text-xs line-clamp-1">
                              catatan: {e.note}
                            </h1>
                          </div>
                          <div>
                            <h1 className="text-sm line-clamp-1">
                              Dibeli: {e.quantity}
                            </h1>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center justify-center gap-2">
                        <h1 className="text-sm">{formatRupiah(e.total)}</h1>
                        <Button
                          onPress={() =>
                            updateCart({ id: e.id, isHidden: true })
                          }
                          size="sm"
                          color="primary"
                        >
                          Hapus
                        </Button>
                      </div>
                    </div>
                  </Checkbox>
                );
              })}
            </CheckboxGroup>
          )}
        </div>
        <form onSubmit={handleNewOrders}>
          <StickyBox
            offsetTop={104}
            offsetBottom={20}
            className="flex gap-5 p-10  h-fit  left-0 w-[500px] shadow-xl justify-center items-center flex-col  border rounded-xl"
          >
            <div className="flex flex-col items-center justify-center w-full gap-4 h-fit">
              <Select
                color="primary"
                isLoading={isLoading}
                value={ongkir}
                onSelectionChange={setOngkir}
                label="Pengiriman"
                placeholder="Pilih Pengiriman"
                isRequired
              >
                {dataOngkir.map((e: any) => {
                  return (
                    <SelectItem
                      color="primary"
                      key={e.value}
                      value={e.value}
                      className="w-full"
                    >
                      {e.tipe}
                    </SelectItem>
                  );
                })}
              </Select>
              <div className="flex w-full items-center gap-4 justify-between">
                {isLoading ? (
                  <Skeleton className="w-full h-5 rounded-xl" />
                ) : (
                  <div className="flex items-center gap-2 w-full">
                    <Location className="w-5 h-5" />
                    <div title={dataUser?.data?.address} className="w-full">
                      <h1 className="line-clamp-1">
                        {dataUser?.data?.address}
                      </h1>
                    </div>
                  </div>
                )}
                <Button
                  size="sm"
                  className="px-4"
                  isLoading={isLoading}
                  as={Link}
                  href="/user/kelola-akun"
                >
                  Edit Alamat
                </Button>
              </div>
              <div className="w-full">
                <h1 className="mb-4 font-bold text-center">Subtotal</h1>
                <div className="flex justify-between w-full">
                  <h1>Ongkir</h1>
                  <h1>{formatRupiah(ongkir.anchorKey ?? 0)}</h1>
                </div>
                <div className="flex justify-between w-full">
                  <h1>Produk</h1>
                  <h1>
                    {formatRupiah(total.reduce((a: any, b: any) => a + b))}
                  </h1>
                </div>
                <div className="flex justify-between w-full">
                  <h1>Total</h1>
                  <h1 className="">
                    {formatRupiah(
                      Number(total.reduce((a: any, b: any) => a + b)) +
                        Number(ongkir.anchorKey ?? 0)
                    )}
                  </h1>
                </div>
              </div>
            </div>
            <Button
              isLoading={isLoading}
              fullWidth
              type="submit"
              color="primary"
            >
              Checkout
            </Button>
          </StickyBox>
        </form>
      </div>
    </div>
  );
}
