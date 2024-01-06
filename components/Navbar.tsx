"use client";

import { navMenuLeft, navMenuRight } from "@/constant/navMenu";
import firebaseApp from "@/firebaseConfig";
import useClickOutside from "@/hooks/useClickOutside";
import { doc, getFirestore, setDoc } from "firebase/firestore";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { HiOutlineSearch } from "react-icons/hi";
import { v4 as uuidv4 } from "uuid";

interface INavbar {}

const Navbar = ({}: INavbar) => {
  const pathname = usePathname();
  const { data: session, status } = useSession();
  const router = useRouter();
  const isSavedUserInfo = useRef(false);
  const elRef = useRef<any>();
  const { isProfileMenuOpen, setIsProfileMenuOpen } = useClickOutside(elRef);
  const [isLoading, setIsLoading] = useState(false);

  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(firebaseApp);

  const saveUserInfo = useCallback(async () => {
    if (isSavedUserInfo.current) return;
    if (session?.user) {
      try {
        const docRef = await setDoc(doc(db, "users", session.user.email!), {
          id: uuidv4(),
          username: session.user.name,
          email: session.user.email,
          image: session.user.image,
        });
        isSavedUserInfo.current = true;
        console.debug("Document written with ID: " + docRef);
      } catch (e) {
        console.error("Error adding document: ", e);
      }
    }
  }, [session?.user?.email]);

  const extractStringBeforeAt = (str: string) => {
    return str.substring(0, str.indexOf("@"));
  };

  const useId = extractStringBeforeAt(session?.user?.email ?? "");

  const handleSignIn = () => {
    signIn("google");
  };
  const handleSignOut = () => {
    signOut({ callbackUrl: "/" });
  };

  useEffect(() => {
    // saveUserInfo();
  }, [session]);

  return (
    <div className="navbar p-4  flex items-center pl-2  md:gap-2">
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
      <div className="flex sm:w-fit w-full justify-end items-center ">
        {navMenuRight.map((menu, idx) => (
          <button
            key={idx}
            className="p-2 hover:bg-gray-200 rounded-full text-2xl text-gray-500"
          >
            <menu.icon />
          </button>
        ))}

        {session?.user ? (
          <div className="p-2 h-fit flex rounded-full hover:bg-gray-200  min-w-[50px] relative ">
            <button
              onClick={() => {
                setIsProfileMenuOpen((prev) => !prev);
              }}
            >
              <Image
                src={session.user.image!}
                className="rounded-full"
                alt="photo profile"
                width={50}
                height={50}
                placeholder="data:image/spin.svg"
              />
            </button>

            <div
              ref={elRef}
              className={`${
                isProfileMenuOpen ? "flex" : "hidden"
              } absolute top-full bg-white p-3 right-0 text-lg border-gray-200 border rounded-lg gap-3 flex flex-col pr-5 text-black z-20`}
            >
              <Link href={`/${useId}`}>Profile</Link>
              <hr />
              <button onClick={handleSignOut}>Logout</button>
            </div>
          </div>
        ) : (
          <button
            onClick={handleSignIn}
            className="p-3 px-4 hover:bg-gray-200 rounded-full font-medium"
          >
            Login
          </button>
        )}
      </div>
    </div>
  );
};

export default Navbar;
