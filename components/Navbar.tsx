"use client";

import { navMenuLeft, navMenuRight } from "@/constant/navMenu";
import { signIn, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { HiOutlineSearch } from "react-icons/hi";

interface INavbar {}

const Navbar = ({}: INavbar) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  console.log(session);

  return (
    <div className="navbar p-4 border border-black flex items-center pl-2 gap-2 md:gap-0">
      <Link href="/">
        <Image
          src="icon.svg"
          alt="Pinterest logo"
          width={50}
          height={50}
          className="p-3 hover:bg-gray-200 rounded-full min-w-[50px]"
        />
      </Link>
      <div className="flex font-medium">
        {navMenuLeft.map((menu, idx) => (
          <Link
            href={menu.href}
            key={idx}
            className={`p-3 px-4 ${
              pathname === menu.href ? "selected-nav-menu" : ""
            }`}
          >
            {menu.text}
          </Link>
        ))}
      </div>
      <div className=" w-full hidden sm:block">
        <form action="" className="relative">
          <input
            type="text"
            placeholder="Search"
            name="search"
            id="search"
            className="bg-gray-200 w-full p-3 px-5 pl-8 rounded-full hover:bg-gray-300 peer focus:pl-4"
          />
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 font-bold  peer-focus:hidden text-lg">
            <HiOutlineSearch />
          </span>
        </form>
      </div>
      <div className="flex sm:w-fit w-full justify-end ">
        {navMenuRight.map((menu, idx) => (
          <button
            key={idx}
            className="p-3 hover:bg-gray-200 rounded-full text-2xl text-gray-500"
          >
            <menu.icon />
          </button>
        ))}

        {session ? (
          <Link href="/profile" className="min-w-[50px]">
            <Image
              src={session.user.image}
              className="p-3 hover:bg-gray-200 rounded-full text-gray-500 "
              alt="photo profile"
              width={50}
              height={50}
            />
          </Link>
        ) : (
          <button
            onClick={() => signIn()}
            className="p-3 px-4 hover:bg-gray-200 rounded-full"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
