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
      className="rounded-3xl cursor-pointer relative flex justify-center md:block  after:bg-gray-500 after:opacity-0 after:rounded-3xl after:absolute after:top-0 after:bottom-0 after:w-full after:hover:opacity-50"
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
