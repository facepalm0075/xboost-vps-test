"use client";
import React, { useEffect, useState } from "react";
import NotifStatus from "@/app/components/clientNotifs/showNotifs";
import ClearNotifBtn from "@/app/components/clientNotifs/ClearNotifBtn";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChartLine, faBell, faBasketShopping } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";
import { usePathname } from "next/navigation";

function SidebarLinks() {
	const router = usePathname();
	const [currentP, setCurrentP] = useState("");
	useEffect(() => {
		setCurrentP(router);
	}, [router]);
	return (
		<div className="profile-sidebar-links">
			<Link href="/profile/dashboard">
				<div
					className={`profp-profc-item
             ${currentP === "/profile/dashboard" ? "profp-profc-item-a" : ""}`}
				>
					<FontAwesomeIcon icon={faChartLine} className="mr-1" />
					Dashboard
				</div>
			</Link>
			<Link href="/profile/orders">
				<div className={`profp-profc-item
             ${currentP === "/profile/orders" ? "profp-profc-item-a" : ""}`}>
					<FontAwesomeIcon icon={faBasketShopping} className="mr-1" />
					Orders
				</div>
			</Link>

			<ClearNotifBtn>
				<Link href="/profile/notifications">
					<div className={`profp-profc-item
             ${currentP === "/profile/notifications" ? "profp-profc-item-a" : ""}`}>
						<FontAwesomeIcon icon={faBell} className="mr-1" />
						Notification
						<div className="ml-2 inline-block">
							<NotifStatus />
						</div>
					</div>
				</Link>
			</ClearNotifBtn>
		</div>
	);
}

export default SidebarLinks;
