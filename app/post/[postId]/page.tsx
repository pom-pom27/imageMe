"use client";

import firebaseApp from "@/firebaseConfig";
import { PostData, UserData } from "@/types/userData";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoArrowBack } from "react-icons/io5";

interface IPage {
  params: { postId: string };
}

const Page = ({ params }: IPage) => {
  const [post, setPost] = useState<PostData | null>(null);
  const [user, setUser] = useState<UserData | null>(null);

  const router = useRouter();

  const db = getFirestore(firebaseApp);

  useEffect(() => {
    getData();
  }, [params.postId]);

  useEffect(() => {
    if (post?.userId) {
      getUserData(post?.userId);
    }
  }, [post?.userId]);

  const getData = async () => {
    const docRef = doc(db, "pinterest-post", params.postId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setPost(docSnap.data() as PostData);
    } else {
      console.log("No such document!");
    }
  };

  const getUserData = async (userId: string) => {
    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setUser(docSnap.data() as UserData);
    } else {
      console.debug('"No such document!');
    }
  };

  return (
    <main className="flex flex-1 bg-gray-100 justify-center">
      <div className=" flex max-w-5xl  w-full sm:rounded-3xl bg-white sm:my-10 p-5 sm:p-10 sm:py-10 flex-col ">
        <button
          className=" hidden  rounded-full w-fit hover:bg-gray-200 p-4 text-3xl  sm:flex"
          onClick={() => {
            router.back();
          }}
        >
          <IoArrowBack />
        </button>

        <div className="flex w-full flex-col sm:flex-row  max-w-[700px] self-center gap-8">
          <div className="flex-1 flex justify-center items-center">
            {post?.imgUrl ? (
              <Image
                src={post?.imgUrl}
                alt={post.title}
                width={700}
                height={700}
                className="rounded-lg"
              />
            ) : (
              <Image
                src="/spin.svg"
                alt="loading"
                width={70}
                height={70}
                className="w-full"
              />
            )}
          </div>
          <div className="flex-1 flex flex-col gap-10">
            <div className="text-5xl font-bold ">{post?.title}</div>
            {user ? (
              <div className="flex gap-2">
                <div className="flex justify-center items-center">
                  <Image
                    src={user?.image}
                    alt="profile photo"
                    width={30}
                    height={30}
                    className="rounded-full"
                  />
                </div>
                <div>
                  <div className="text-sm">{user?.username}</div>
                  <div className="text-sm text-gray-400">{user?.email}</div>
                </div>
              </div>
            ) : (
              <div className="flex w-full justify-center items-center">
                <Image src="/spin.svg" alt="loading" width={50} height={50} />
              </div>
            )}

            <div className="">
              {post?.description.length === 0
                ? "No Description available."
                : post?.description}
            </div>
            <div className="text-red-400 font-semibold">
              {post?.tag.length === 0 ? "No tags available." : post?.tag}
            </div>
            <a
              href={post?.link}
              target="_blank"
              className="p-3 px-5 w-fit bg-gray-300 rounded-full"
            >
              Open Link
            </a>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Page;
