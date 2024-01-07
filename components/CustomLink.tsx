"use client";

import { useRouter } from "next/navigation";

interface ICustomLink {
  children?: React.ReactNode;
  push?: string | null;
  isBack?: boolean;
  className: string;
}

const CustomButton = ({ children, className, push, isBack }: ICustomLink) => {
  const handleButton = () => {
    if (isBack) {
      router.back();
    } else if (push) {
      router.push(push);
    }
  };
  const router = useRouter();
  return (
    <button className={className} onClick={handleButton}>
      {children}
    </button>
  );
};

export default CustomButton;
