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

  const [listPost, setListPost] = useState<PostData[]>([]);

  useEffect(() => {
    if (listPost.length === 0) {
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
      console.debug(doc.id, " => ", doc.data());
      data = [...data, doc.data() as PostData];
    });

    setListPost(data);
  };
  return (
    <div className="mt-7 px-2 md:px-5  md:columns-3 lg:columns-4 xl:columns-5 space-y-6 columns-1 sm:columns-2">
      {listPost.map((post, idx) => (
        <Post key={idx} post={post} />
      ))}
    </div>
  );
};

export default PostGrid;
