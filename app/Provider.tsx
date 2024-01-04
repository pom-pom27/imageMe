"use client";
import { SessionProvider } from "next-auth/react";

import React from "react";

interface IProvider {
  children: React.ReactNode;
}

const Provider = ({ children }: IProvider) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default Provider;
