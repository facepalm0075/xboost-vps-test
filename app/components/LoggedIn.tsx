"use client";
import { useSession, signOut } from "next-auth/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
	faEllipsisV,
	faRightFromBracket,
	faChartLine,
	faCartShopping,
	faBell,
	faBasketShopping,
	faHeadset,
} from "@fortawesome/free-solid-svg-icons";

import { faBell as bellReg } from "@fortawesome/free-regular-svg-icons";

import Image from "next/image";
import { useEffect, useRef } from "react";
import Link from "next/link";
import NotifStatus from "./clientNotifs/showNotifs";
import { useSaveNotifs } from "./customHooks/saveNotifs";
import SmallMenuOpener from "./SmallMenuOpener";
import ClearNotifBtn from "./clientNotifs/ClearNotifBtn";
import { readNotifs } from "./clientNotifs/NotifRead";
import NavbarNotifBtn from "./NavbarNotifBtn";

type props = {
	path: string;
};

function LoggedIn({ path }: props) {
	const elRefs = useRef<HTMLDivElement>(null);
	const saveNotifs = useSaveNotifs();

	const pathname = path;
	let id = "not";
	if (["/profile"]?.some((path) => pathname.startsWith(path))) {
		id = "sec";
	}
	useEffect(() => {
		document.addEventListener(
			"click",
			(e: globalThis.MouseEvent | React.MouseEvent<HTMLElement, HTMLElement>) => {
				e = e as React.MouseEvent<HTMLElement, HTMLElement>;
				var target = e.target as HTMLElement,
					ElID = target?.parentElement?.id;
				if (ElID === "UserProfile") {
					return;
				} else {
					const item = elRefs.current!;
					item.className == "profile-content profile-content-a"
						? (item.className = "profile-content")
						: "";
				}
			},
			false
		);
		saveNotifs();
	}, []);

	const clickHandler = () => {
		const item = elRefs.current!;
		item.className == "profile-content"
			? (item.className = "profile-content profile-content-a")
			: "";
	};

	const { data: session } = useSession();

	const isOpened = (status:boolean) =>{

	}
	return (
		<>
			<div id="UserProfile" className="desktop-menu-logged float-right flex items-center">
				

				<NavbarNotifBtn/>

				<div id="UserProfile" className="profile-container ml-5" onClick={clickHandler}>
					<div id="UserProfile" className="profile">
						<div id="UserProfile" className="profile-pic">
							<span id="UserProfile" className="profile-pic-span">
								{session?.user?.name && session?.user?.name[0]}
							</span>
							{session?.user?.image && (
								<Image
									id="UserProfile"
									src={session?.user?.image}
									alt="profile image"
									width={38}
									height={38}
								/>
							)}
						</div>

						<FontAwesomeIcon id="UserProfile" icon={faEllipsisV} className="ml-1" />
					</div>
					<div id="UserProfile" className="profile-content" ref={elRefs}>
						<div id="UserProfile" className="profc-top">
							{session?.user?.name && (
								<div id="UserProfile">
									{session?.user?.name}{" "}
									{session?.user?.email && <span>{session?.user?.email}</span>}
								</div>
							)}
						</div>
						<Link href="/profile/dashboard">
							<div className="profc-item">
								<FontAwesomeIcon icon={faChartLine} className="mr-1" />
								Dashboard
							</div>
						</Link>

						<Link href="/profile/orders">
							<div className="profc-item">
								<FontAwesomeIcon icon={faBasketShopping} className="mr-1" />
								Orders
							</div>
						</Link>

						<Link href="/profile/notifications">
							<div className="profc-item">
								<FontAwesomeIcon icon={faBell} className="mr-1" />
								Notification
								<div className="ml-1 inline-block">
									<NotifStatus />
								</div>
							</div>
						</Link>

						<div
							onClick={() => signOut(id == "sec" ? { callbackUrl: "/" } : {})}
							style={{ borderTop: "1px solid #2d2d2d" }}
							className="profc-item"
						>
							<FontAwesomeIcon icon={faRightFromBracket} className="mr-1" />
							Logout
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default LoggedIn;
