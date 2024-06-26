import "../../app/globals.css";
import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Providers } from "../providers";
import { Toaster } from "react-hot-toast";
import NavbarMain from "./_components/NavbarMain";
import FooterMain from "./_components/FooterMain";
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
          <Toaster position="bottom-center" />
          <NavbarMain />
          <main className="container mx-auto">{children}</main>
          <FooterMain />
        </Providers>
      </body>
    </html>
  );
}
