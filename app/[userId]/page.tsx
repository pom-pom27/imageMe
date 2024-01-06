"use client";

import PostGrid from "@/components/PostGrid";
import UserInfo from "@/components/UserInfo";
import firebaseApp from "@/firebaseConfig";
import { UserData } from "@/types/userData";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

interface IPage {
  params: { userId: string };
}

const Page = ({ params }: IPage) => {
  const [docState, setDocState] = useState<null | UserData>(null);

  const db = getFirestore(firebaseApp);
  const email = `${params.userId}@gmail.com`;

  const getUserData = async () => {
    if (docState) return;

    const docRef = doc(db, "users", email);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      setDocState(docSnap.data() as UserData);
    } else {
      console.debug('"No such document!');
    }
  };

  useEffect(() => {
    getUserData();
  }, [params.userId]);

  return (
    <main className="flex-1 mb-7">
      <UserInfo userInfo={docState} />
      <div>
        <PostGrid userId={email} />
      </div>
    </main>
  );
};

export default Page;
