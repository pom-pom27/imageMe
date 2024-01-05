"use client";

import UserInfo from "@/components/UserInfo";
import firebaseApp from "@/firebaseConfig";
import { UserData } from "@/types/userData";
import { doc, getDoc, getFirestore } from "firebase/firestore";
import { useEffect, useState } from "react";

interface IPage {
  params: { userId: string };
}

const Page = ({ params }: IPage) => {
  // Initialize Cloud Firestore and get a reference to the service
  const db = getFirestore(firebaseApp);
  const email = `${params.userId}@gmail.com`;

  const [docState, setDocState] = useState<null | UserData>(null);
  const getUserData = async (userId: string) => {
    if (docState) return;

    const docRef = doc(db, "users", userId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      setDocState(docSnap.data() as UserData);
    } else {
      // docSnap.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    if (params) {
      getUserData(email);
    }
  }, [params.userId]);

  return (
    <main className="flex-1">
      <div>
        <UserInfo userInfo={docState} />
      </div>
    </main>
  );
};

export default Page;
