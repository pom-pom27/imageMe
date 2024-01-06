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
import { useEffect, useState } from "react";
import Post from "./Post";

interface IPostGrid {
  userId?: string | null;
}

const PostGrid = ({ userId }: IPostGrid) => {
  const db = getFirestore(firebaseApp);

  const [listPost, setListPost] = useState<PostData[] | null>(null);

  useEffect(() => {
    if (!listPost) {
      getUserPosts();
    }
  }, []);

  const getUserPosts = async () => {
    let q;

    if (!userId) {
      q = query(collection(db, "pinterest-post"));
    } else {
      q = query(
        collection(db, "pinterest-post"),
        where("userId", "==", userId)
      );
    }

    const querySnapshot = await getDocs(q);
    let data: PostData[] = [];

    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      data = [...data, doc.data() as PostData];
    });

    setListPost(data);
  };

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
