import { AppConfig } from "@/constants/app.config";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import { Facebook, Instagram, Whatsapp } from "react-huge-icons/bulk";

export default function FooterMain() {
  return (
    <footer className="bg-primary lg:grid lg:grid-cols-5 border-t-1">
      <div className="relative block h-32 lg:col-span-2 lg:h-full">
        <Image
          src="https://images.unsplash.com/photo-1628927124199-a8a2a5394392?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt=""
          fill
          className="absolute inset-0 object-cover w-full h-full"
        />
      </div>

      <div className="px-4 py-16 sm:px-6 lg:col-span-3 lg:px-8">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
          <div>
            <h1 className="block text-2xl text-primary-50 font-bold sm:text-3xl">
              {AppConfig.title}
            </h1>

            <ul className="mt-8 space-y-1 text-sm text-primary-50">
              <li>Buka Setiap Hari</li>
            </ul>

            <ul className="flex gap-6 mt-8">
              <li>
                <Facebook className="w-6 h-6 text-primary-50" />
              </li>
              <li>
                <Whatsapp className="w-6 h-6 text-primary-50" />
              </li>
              <li>
                <Link
                  href={"https://www.instagram.com/mandaaaflorist/"}
                  target="_blank"
                >
                  <Instagram className="w-6 h-6 text-primary-50" />
                </Link>
              </li>
            </ul>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3989.4398717594163!2d100.66035357364404!3d-0.7891652352820856!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e2b33084c79f703%3A0xe0b96d138504e396!2sMandaaa%20Florist!5e0!3m2!1sid!2sid!4v1719123973692!5m2!1sid!2sid"
              className="rounded-xl"
            />
          </div>
        </div>

        <div className="pt-12 mt-12 border-t border-primary-100">
          <div className="sm:flex sm:items-center sm:justify-between">
            <ul className="flex flex-wrap gap-4 text-xs">
              <li>
                <a
                  href="#"
                  className="transition text-primary-50 hover:opacity-75"
                >
                  Terms & Conditions
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition text-primary-50 hover:opacity-75"
                >
                  Privacy Policy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition text-primary-50 hover:opacity-75"
                >
                  Cookies
                </a>
              </li>
            </ul>

            <p className="mt-8 text-xs text-primary-50 sm:mt-0">
              &copy; 2024. {AppConfig.title}. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
