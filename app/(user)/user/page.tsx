import { Button } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

export default function UserPage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1>User Page</h1>
      <Button as={Link} href="/">
        Beranda
      </Button>
    </div>
  );
}
