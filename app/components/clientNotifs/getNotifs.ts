"use client";
import axios from "axios";

export const getNotifications = async () => {
	const response = await axios({
		method: "GET",
		url: "/api/notification",
	});

	if (response.status === 200) {
		return response.data.Message;
	}
	return [];
};
