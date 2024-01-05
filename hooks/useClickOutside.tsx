import { MutableRefObject, useEffect, useState } from "react";

const useClickOutside = (elRef: MutableRefObject<any>) => {
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);

  const handleClickOutside = (e: MouseEvent) => {
    if (!elRef?.current?.contains(e.target)) {
      setIsProfileMenuOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  });
  return { isProfileMenuOpen, setIsProfileMenuOpen };
};

export default useClickOutside;
