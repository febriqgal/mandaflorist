import React from "react";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  Button,
} from "@nextui-org/react";

import { Checkout } from "@prisma/client";
import { useUpdateCheckoutMutation } from "@/redux/feature/checkoutSlice";

export default function AksiDropdown({ item }: { item: Checkout }) {
  const [update] = useUpdateCheckoutMutation();
  return (
    <Dropdown>
      <DropdownTrigger>
        <Button variant="solid" color="primary">
          {item.status}
        </Button>
      </DropdownTrigger>
      <DropdownMenu
        closeOnSelect={false}
        variant="solid"
        color="primary"
        aria-label="Static Actions"
      >
        <DropdownItem
          onClick={() => update({ id: item.id, status: "DELIVERY" })}
        >
          Kirim Pesanan
        </DropdownItem>
        <DropdownItem onClick={() => update({ id: item.id, status: "CANCEL" })}>
          Batalkan
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  );
}
