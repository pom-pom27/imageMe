import CustomButton from "@/components/CustomLink";
import firebaseApp from "@/firebaseConfig";
import { PostData, UserData } from "@/types/userData";
import { extractEmailToUserId } from "@/utils";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";

interface IPage {
  params: { postId: string };
}

const db = getFirestore(firebaseApp);

const getPosts = async (postId: string) => {
  const docRef = doc(db, "pinterest-post", postId);
  const docSnap = await getDoc(docRef);

  let post;

  if (docSnap.exists()) {
    post = docSnap.data() as PostData;
  } else {
    // console.log("No such document!");
  }

  return post;
};

const getUserData = async (userId: string) => {
  const docRef = doc(db, "users", userId);
  const docSnap = await getDoc(docRef);

  let user;

  if (docSnap.exists()) {
    user = docSnap.data() as UserData;
  } else {
    // console.debug('"No such document!');
  }

  return user;
};

const Page = async ({ params }: IPage) => {
  const post = await getPosts(params.postId);
  const owner = await getUserData(post?.userId!);

  const ownerId = extractEmailToUserId(owner?.email);

  console.log("email", owner?.email);
  console.log("postid userId", post?.userId);

  return (
    <main className="flex flex-1 bg-gray-100 justify-center">
      <div className=" flex max-w-5xl  w-full sm:rounded-3xl bg-white sm:my-10 p-5 sm:p-10 sm:py-10 flex-col ">
        <CustomButton
          className="hidden  rounded-full w-fit hover:bg-gray-200 p-4 text-3xl  sm:flex"
          isBack
        >
          <IoArrowBack />
        </CustomButton>

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
          <div className="flex-1 flex flex-col sm:gap-7 gap-4">
            <div className="text-2xl sm:text-5xl font-bold ">{post?.title}</div>
            <Link href={"/" + ownerId} className="flex gap-2 cursor-pointer">
              <div className="flex justify-center items-center">
                <Image
                  src={owner?.image ?? ""}
                  alt="profile photo"
                  width={30}
                  height={30}
                  className="rounded-full"
                />
              </div>
              <div className="flex flex-col items-start">
                <div className="text-sm">{owner?.username}</div>
                <div className="text-sm text-gray-400">{owner?.email}</div>
              </div>
            </Link>

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
