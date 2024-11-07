"use client";

import { notificationChanged } from "@/app/redux/Features/notifications/notificationSlice";
import { useAppDispatch } from "@/app/redux/hooks";
import { getNotifications } from "../clientNotifs/getNotifs";

export const useSaveNotifs = () => {
	const dispatch = useAppDispatch();
	const saveNotifications = async () => {
		dispatch(notificationChanged({ state: await getNotifications() }));
	};
	return saveNotifications;
};
