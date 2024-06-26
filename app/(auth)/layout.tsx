/* eslint-disable @next/next/no-img-element */
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "react-hot-toast";
import "../../app/globals.css";

import { Providers } from "../providers";
import AuthLayout from "./_components/AuthLayout";
import { AppConfig } from "@/constants/app.config";

const jakarta = Plus_Jakarta_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: AppConfig.title,
  description: AppConfig.desc,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={jakarta.className}>
        <Providers>
          <Toaster position="bottom-right" />
          <AuthLayout>{children}</AuthLayout>
        </Providers>
      </body>
    </html>
  );
}
