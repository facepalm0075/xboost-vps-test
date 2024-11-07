"use client";
import Pagination from "@/app/components/Pagination";
import prisma from "@/src/lib/db";
import { dividerClasses } from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";

type props = {
	itemsCount: number;
};

function NotifList({ itemsCount }: props) {
	const [dbitems, setDbitems] = useState<any[]>([]);
	const [loaded, setLoaded] = useState(false);
	const [err, setError] = useState({ status: false, code: 200, message: "" });
	const doneHandler = (data: any[]) => setDbitems(data);
	const loadingHandler = (status: boolean) => setLoaded(status);
	const errorHandler = (code: number, message: string) => {
		setError({ status: true, code: code, message: message });
	};

	let itemsShow = 10;
	let loadingComp = [];
	for (let index = 0; index < itemsShow; index++) {
		loadingComp.push(index);
	}

	if (err.status) {
		return <div>error</div>;
	}
	return (
		<>
			<div id="notifsItems"></div>
			{loaded
				? dbitems.map((item, index) => {
						const date = new Date(item.createdAt).toLocaleDateString("en-US", {
							year: "numeric",
							month: "long",
							day: "numeric",
						});
						return (
							<Link
								key={"key2" + index}
								href={item.link ? item.link : "#"}
								style={item.link ? {} : { pointerEvents: "none" }}
							>
								<div className="flex order-card-container relative mb-16">
									<div className="notif-list-item-t">{item.subject}</div>
									{item.description}
									<div className="notif-list-item-d">{date}</div>
								</div>
							</Link>
						);
					})
				: loadingComp.map((item,index) => {
						return <div key={"key" + index + 1} className="notif-list-skeleton mb-16"></div>;
					})}

			<Pagination
				error={errorHandler}
				elemId="notifsItems"
				done={doneHandler}
				loading={loadingHandler}
				reqUrl="/api/notification/getAll"
				itemsCount={itemsCount}
				itemsShow={itemsShow}
			/>
		</>
	);
}

export default NotifList;
