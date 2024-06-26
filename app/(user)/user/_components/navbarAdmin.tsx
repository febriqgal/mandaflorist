"use client";
import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { EditRectangle, Home, Logout } from "react-huge-icons/bulk";

const NavbarUser = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-screen">
      <SideNav />
      <div className="w-full ml-[200px]">
        <div>{children}</div>
      </div>
    </div>
  );
};

const SideNav = () => {
  const navigation = [
    {
      name: "Kelola Pembelian",
      href: "/user/kelola-pembelian",
      icon: <EditRectangle className="text-white" />,
    },
    {
      name: "Kelola Akun",
      href: "/user/kelola-akun",
      icon: <EditRectangle className="text-white" />,
    },
    {
      name: "Keluar",
      href: "/",
      icon: <Logout className="text-white" />,
    },
  ];
  return (
    <nav className="fixed flex z-50 flex-col items-center w-[200px] h-screen gap-2 p-4 bg-primary-500">
      <Link
        href={"/user/kelola-pembelian"}
        className="mb-5 font-bold text-white"
      >
        Dashboard user
      </Link>
      {navigation.map((item) => (
        <NavItem key={item.name} href={item.href}>
          {item.icon}
          <h1 className="text-sm text-white">{item.name}</h1>
        </NavItem>
      ))}
    </nav>
  );
};

const NavItem = ({ children, href }: any) => {
  const router = useRouter();
  const pathname = usePathname();
  return (
    <motion.button
      className="relative w-full p-3 text-xl transition-colors rounded-md bg-primary-500 hover:bg-primary-600"
      onClick={() => router.push(href)}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      <span className="relative z-10 flex items-center justify-start w-full gap-2">
        {children}
      </span>
      <AnimatePresence>
        {pathname === href && (
          <motion.span
            className="absolute inset-0 z-0 rounded-md bg-primary-700"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
          />
        )}
      </AnimatePresence>
    </motion.button>
  );
};

export default NavbarUser;
