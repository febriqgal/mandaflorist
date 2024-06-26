/* eslint-disable @next/next/no-img-element */

import { Metadata } from "next";

import { AppConfig } from "@/constants/app.config";
import SignupActionForm from "../../_components/SignupForm";

export const metadata: Metadata = {
  title: `Signup - ${AppConfig.title}`,
  description: AppConfig.desc,
};

export default function LoginPage() {
  return (
    <>
      <SignupActionForm />
    </>
  );
}
