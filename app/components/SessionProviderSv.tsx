"use client";
import { SessionProvider } from "next-auth/react";
import React, { ReactNode } from "react";

type props = {
	children: ReactNode;
};
function SessionProviderSv({ children }: props) {
	return <SessionProvider>{children}</SessionProvider>;
}

export default SessionProviderSv;
