"use client";
import { Spinner } from "@nextui-org/react";
import { useSession } from "next-auth/react";
import { usePathname } from "next/navigation";
import React from "react";

import { Role } from "@prisma/client";
import ErrorProtectRole from "@/components/ErrorProtectRole";
import NavbarUser from "./_components/navbarAdmin";

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading")
    return <Spinner className="flex items-center justify-center h-screen" />;
  if (pathname.startsWith("/user") && session?.user.role !== Role.USER)
    return <ErrorProtectRole title={"User"} />;

  return <NavbarUser>{children}</NavbarUser>;
}
