import { Metadata } from "next";
import SectionCart from "./_components/Section";
import { AppConfig } from "@/constants/app.config";

export const metadata: Metadata = {
  title: `Cart - ${AppConfig.title}`,
};
export default function CartPage() {
  return (
    <div className="min-h-screen space-y-4 py-[74px]">
      <SectionCart />
    </div>
  );
}
