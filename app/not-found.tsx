import { AppConfig } from "@/constants/app.config";
import { Button } from "@nextui-org/react";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: `404 - ${AppConfig.title}`,
  description: AppConfig.desc,
};

export default function notFound() {
  return (
    <div className="grid h-screen px-4 bg-white place-content-center">
      <div className="text-center">
        <h1 className="font-black text-gray-200 text-9xl">404</h1>
        <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          Uh-oh!
        </p>
        <Button fullWidth className="mt-4" as={Link} href="/" color="primary">
          Beranda
        </Button>
      </div>
    </div>
  );
}
