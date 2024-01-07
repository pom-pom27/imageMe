"use client";
import firebaseApp from "@/firebaseConfig";
import { PostData } from "@/types/userData";
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from "firebase/firestore";
import Post from "./Post";

interface IPostGrid {
  userId?: string | null;
}

const db = getFirestore(firebaseApp);

const getUserPosts = async (userId?: string | null) => {
  let q;

  if (!userId) {
    q = query(collection(db, "pinterest-post"));
  } else {
    q = query(collection(db, "pinterest-post"), where("userId", "==", userId));
  }

  const querySnapshot = await getDocs(q);
  let data: PostData[] = [];

  querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    data = [...data, doc.data() as PostData];
  });

  return data;
};
const PostGrid = async ({ userId }: IPostGrid) => {
  const listPost = await getUserPosts(userId);

  if (listPost?.length === 0)
    return <div className="flex w-full justify-center">Pin is Empty.</div>;

  return (
    <div className="mt-4 sm:mt-4 px-2 md:px-5  md:columns-3 lg:columns-4 xl:columns-5 space-y-4 columns-2 sm:columns-2">
      {listPost?.map((post, idx) => (
        <Post key={idx} post={post} />
      ))}
    </div>
  );
};

export default PostGrid;
