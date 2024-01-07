import { UserData } from "@/types/userData";
import Image from "next/image";

interface IUserInfo {
  userInfo: UserData;
}

const UserInfo = ({ userInfo }: IUserInfo) => {
  return (
    <div className="flex justify-center flex-col items-center py-10 ">
      <Image
        src={userInfo?.image}
        alt="profile photo"
        width={200}
        height={200}
        className="rounded-full p-3"
      />

      <div className="flex flex-col items-center py-4">
        <div className="font-bold text-4xl pb-2 ">{userInfo?.username}</div>
        <div className=" text-gray-500 flex">
          <Image
            src="/icon.svg"
            alt="Pinterest logo"
            width={20}
            height={20}
            className="grayscale mr-1"
          />

          {userInfo?.email}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
