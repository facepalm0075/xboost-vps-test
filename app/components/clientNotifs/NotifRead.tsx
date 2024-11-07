"use client";

import axios from "axios";

import React, { useEffect } from "react";
import { useClearNotifs } from "../customHooks/clearNotifs";

function NotifRead() {
	const clear = useClearNotifs();

	
	useEffect(() => {
		clear()
		if (typeof window !== undefined) {
			axios({
				method: "PUT",
				url: "/api/notification",
			});
		}
	}, []);
	return <></>;
}

export function readNotifs() {
	axios({
		method: "PUT",
		url: "/api/notification",
	});
}

export default NotifRead;
