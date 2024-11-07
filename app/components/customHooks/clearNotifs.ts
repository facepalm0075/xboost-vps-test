"use client";

import { notificationChanged } from "@/app/redux/Features/notifications/notificationSlice";
import { useAppDispatch } from "@/app/redux/hooks";

export const useClearNotifs = () => {
	const dispatch = useAppDispatch();
	const clearNotifications = () => {
		dispatch(notificationChanged({ state: [] }));
	};
	return clearNotifications;
};
