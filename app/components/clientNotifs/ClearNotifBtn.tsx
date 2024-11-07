"use client";
import React, { ReactNode } from "react";
import { useClearNotifs } from "../customHooks/clearNotifs";

type props = {
	children: ReactNode;
};
function ClearNotifBtn({ children }: props) {
	const clear = useClearNotifs();
	return <div onClick={clear}>{children}</div>;
}

export default ClearNotifBtn;
