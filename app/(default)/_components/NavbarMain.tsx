"use client";
import { AppConfig } from "@/constants/app.config";
import Logo from "@/public/logo.svg";
import { useGetCartByUserIdQuery } from "@/redux/feature/cartSlice";
import { Badge, Input, Skeleton } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Bag,
  Cart,
  ChatDot,
  Home,
  Login,
  Search,
} from "react-huge-icons/outline";
import ProfileDropdown from "./ProfileDropdown";
export default function NavbarMain() {
  const { data: session, status } = useSession();
  const { data } = useGetCartByUserIdQuery(session?.user.id);
  const pathname = usePathname();

  const navigation = [
    {
      icon: <Home />,
      name: "Beranda",
      href: "/",
    },
    {
      icon: <Bag />,
      name: "Produk",
      href: "/product",
    },
    {
      icon: <ChatDot />,
      name: "Kontak Kami",
      href: "/contact-us",
    },
  ];

  return (
    <div className="fixed z-[9999] flex items-center justify-center w-full py-4 bg-white">
      <div className="container flex items-center justify-between mx-auto space-x-2">
        <Image src={Logo} alt="Logo" width={50} height={100} />
        <Link href={"/"} className="text-nowrap font-bold text-2xl">
          {AppConfig.title}
        </Link>
        <Input
          fullWidth={true}
          className="w-full"
          placeholder="Pencarian..."
          startContent={<Search />}
        />
        <div className="flex items-center justify-center gap-8">
          <Link href={"/cart"} className="hover:cursor-pointer">
            <Badge
              content={<h1 className="text-[12px]">{data?.data?.length}</h1>}
              size="sm"
              shape="circle"
              className="mt-1"
              color="primary"
            >
              <Cart className="w-5 h-5 mt-2 text-black" />
            </Badge>
          </Link>
          <div>
            {status === "loading" ? (
              <Skeleton className="w-8 h-3 rounded-lg" />
            ) : (
              <>
                {session?.user ? (
                  <ProfileDropdown />
                ) : (
                  <Link href="/auth/login">
                    <Login className="w-8 h-8 text-black " />
                  </Link>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
