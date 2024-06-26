import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownTrigger,
} from "@nextui-org/react";
import { Role } from "@prisma/client";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { UserCircle } from "react-huge-icons/outline";

export default function ProfileDropdown() {
  const { data: session } = useSession();

  return (
    <Dropdown>
      <DropdownTrigger>
        <UserCircle className="text-primary-900 h-8 w-8" />
      </DropdownTrigger>
      <DropdownMenu aria-label="Static Actions">
        <DropdownItem
          key="name"
          isReadOnly
          color="primary"
          className="hover:cursor-text"
        >
          <h1 className="font-bold">{session?.user?.name}</h1>
        </DropdownItem>
        <DropdownItem
          key="dashboard"
          as={Link}
          href={
            session?.user.role === Role.USER
              ? "/user/kelola-pembelian"
              : "/admin"
          }
        >
          {session?.user.role === Role.USER
            ? "Dashboard User"
            : "Dashboard Admin"}
        </DropdownItem>
        <DropdownItem
          onPress={() => signOut()}
          key="delete"
          className="text-danger"
          color="danger"
        >
          Keluar
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
