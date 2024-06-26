import { AppConfig } from "@/constants/app.config";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: `Admin - ${AppConfig.title}`,
  description: AppConfig.desc,
};
export default function AdminPage() {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <h1>Admin Page</h1>
    </div>
  );
}
