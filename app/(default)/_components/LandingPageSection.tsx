"use client";
import AppInput from "@/components/AppInput";
import { Poppins } from "next/font/google";
import Image from "next/image";
import { Search } from "react-huge-icons/outline";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});
export default function LandingPageSection() {
  return (
    <div
      className={`${poppins.className} bg-primary relative h-[412px] overflow-clip w-full justify-between flex flex-col  rounded-xl p-12`}
    >
      <Image
        fill
        objectFit={"cover"}
        src={
          "https://images.unsplash.com/photo-1487070183336-b863922373d4?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        }
        alt="#"
      />
    </div>
  );
}
