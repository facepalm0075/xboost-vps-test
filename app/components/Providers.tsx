"use client";
import { SessionProvider } from "next-auth/react";
import { ReactNode } from "react";

type props = {
  children: ReactNode;
};

function Providers({ children }: props) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default Providers;
