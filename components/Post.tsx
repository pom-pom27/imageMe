import { PostData } from "@/types/userData";
import Image from "next/image";

interface IPost {
  post: PostData;
}

const Post = ({ post }: IPost) => {
  return (
    <div className="rounded-3xl cursor-pointer relative flex justify-center md:block">
      <Image
        src={post.imgUrl}
        alt="post"
        width={1000}
        height={1000}
        className="rounded-3xl"
      />
    </div>
  );
};

export default Post;
