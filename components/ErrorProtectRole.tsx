import { Button } from "@nextui-org/react";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

export default function ErrorProtectRole({ title }: { title: string }) {
  return (
    <>
      <Head>
        <title>{`Warning!!!`}</title>
      </Head>
      <div className="flex flex-col h-screen bg-white">
        <Image
          src="https://images.unsplash.com/photo-1555699875-5773b06e8ee2?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          width={1374}
          height={800}
          className="object-cover w-full h-64"
        />

        <div className="flex items-center justify-center flex-1">
          <div className="max-w-xl px-4 py-8 mx-auto text-center">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Hayooo mau ngapain?
            </h1>

            <p className="mt-4 text-gray-500">
              Anda tidak diizinkan kehalaman {title}
            </p>

            <Button
              fullWidth
              as={Link}
              href="/"
              color="primary"
              className="mt-4"
            >
              Beranda
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
