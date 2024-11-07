"use client";

import React, { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useAppSelector } from "@/app/redux/hooks";
import { IsWindowReady } from "../IsWindowReady";

function NotifStatus({ setId = "" }) {
	const mainNameer = useAppSelector((state) => state.notificationSlice.notificationState);
	const count = mainNameer.length;
	return (
		<>
			{count > 0 && (
				<IsWindowReady>
					<div id={setId} className="prof-item-notif2">
						<span>{count < 10 ? count : "9+"}</span>
					</div>
				</IsWindowReady>
			)}
		</>
	);
}

export default NotifStatus;
