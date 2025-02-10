"use client";
import { useState, ReactNode } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { removeCookie } from "@/helper/client-cookie";

type Props = {
  children: ReactNode;
};
const Sidebar = ({ children }: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter()

  const handleLogout = () => {
    removeCookie(`token`)
    router.replace(`/`)
  }

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div>
      <div className="flex justify-between md:hidden items-center bg-purple-800 text-white">
        <h1 className="p-4 text-2xl font-bold">SekopTix</h1>
        <button
          className="md:hidden p-4 text-white bg-purple-800"
          onClick={toggleSidebar}
        >
          ☰
        </button>
      </div>

      <div className="flex">
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } md:block md:w-56 w-full transition-all duration-100 md:h-screen overflow-y-auto bg-purple-800 text-white flex flex-col`}
        >
          <div className="p-4 text-2xl hidden md:block font-bold">SekopTix</div>
          <nav className="flex w-full flex-col gap-3 p-4">
            <Link
              href="/karyawan/kereta"
              className="w-full py-2 px-2 hover:bg-purple-600 font-medium duration-200 rounded"
            >
              Kereta
            </Link>
            <Link
              href="/karyawan/pelanggan"
              className="w-full py-2 px-2 hover:bg-purple-600 font-medium duration-200 rounded"
            >
              Pelanggan
            </Link>
            <Link
              href="/karyawan/employee"
              className="w-full py-2 px-2 hover:bg-purple-600 font-medium duration-200 rounded"
            >
              Admin
            </Link>
            <button
              onClick={handleLogout}
              className="w-full py-2 px-2 hover:bg-red-600 font-medium duration-200 rounded text-left bg-red-700"
            >
              Logout
            </button>
          </nav>
        </div>
        <div className="grow">
            {children}
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
