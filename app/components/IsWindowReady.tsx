"use client";
import { ReactElement, ReactNode, useEffect, useState } from "react";

type props = {
	children: ReactNode;
	callback?: ReactElement<any>;
};
export const IsWindowReady = ({ children, callback = <></> }: props) => {
	const [loaded, setLoaded] = useState(false);

	useEffect(() => {
		setLoaded(true);
	}, [typeof window]);

	if (!loaded) {
		return callback;
	}

	return children;
};
