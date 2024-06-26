"use client";
import { Spinner } from "@nextui-org/react";
import { Role } from "@prisma/client";
import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import React from "react";

export default function Template({ children }: { children: React.ReactNode }) {
  const { replace } = useRouter();
  const pathname = usePathname();
  const { data: session, status } = useSession();

  if (status === "loading")
    return <Spinner className="flex items-center justify-center" />;
  if (pathname.startsWith("/auth") && session?.user.role === Role.ADMIN)
    return replace("/admin");
  if (pathname.startsWith("/auth") && session?.user.role === Role.USER)
    return replace("/");

  return <>{children}</>;
}
