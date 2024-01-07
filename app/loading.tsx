import Image from "next/image";

interface ILoading {}

const Loading = ({}: ILoading) => {
  return (
    <div className="flex flex-1  mb-5  justify-center  items-center">
      <Image src="/spin.svg" alt="loading" width={400} height={400} />
    </div>
  );
};

export default Loading;
