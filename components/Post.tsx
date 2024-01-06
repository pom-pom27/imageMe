import { PostData } from "@/types/userData";
import Image from "next/image";
import Link from "next/link";

interface IPost {
  post: PostData;
}

const Post = ({ post }: IPost) => {
  return (
    <Link
      href={`/post/${post.postId}`}
      className="rounded-3xl cursor-pointer relative flex justify-center md:block"
    >
      <Image
        src={post.imgUrl}
        alt="post"
        width={1000}
        height={1000}
        priority
        className="rounded-3xl"
      />
    </Link>
  );
};

export default Post;
