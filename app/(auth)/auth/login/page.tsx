import { Metadata } from "next";

import { AppConfig } from "@/constants/app.config";
import LoginForm from "../../_components/LoginForm";

export const metadata: Metadata = {
  title: `Login - ${AppConfig.title}`,
  description: AppConfig.desc,
};

export default function LoginPage() {
  return (
    <>
      <LoginForm />
    </>
  );
}
