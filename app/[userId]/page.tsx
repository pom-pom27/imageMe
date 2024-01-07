import PostGrid from "@/components/PostGrid";
import UserInfo from "@/components/UserInfo";
import firebaseApp from "@/firebaseConfig";
import { UserData } from "@/types/userData";
import { doc, getDoc, getFirestore } from "firebase/firestore";

interface IPage {
  params: { userId: string };
}
const db = getFirestore(firebaseApp);

const getUserData = async (email: string) => {
  const docRef = doc(db, "users", email);
  const docSnap = await getDoc(docRef);
  let userData;

  if (docSnap.exists()) {
    userData = docSnap.data() as UserData;
  } else {
    console.debug('"No such document!');
  }

  return userData;
};

const Page = async ({ params }: IPage) => {
  const email = `${params.userId}@gmail.com`;

  const userData = await getUserData(email);

  return (
    <main className=" flex-1 mb-7">
      {!userData ? (
        <div className="flex justify-center py-14 flex-col items-center">
          <div>User not found.</div>
        </div>
      ) : (
        <>
          <UserInfo userInfo={userData} />
          <div>
            <PostGrid userId={email} />
          </div>
        </>
      )}
    </main>
  );
};

export default Page;
