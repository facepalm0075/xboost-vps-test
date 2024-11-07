import React from "react";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";
import prisma from "@/src/lib/db";
import NotifRead from "@/app/components/clientNotifs/NotifRead";
import NotifList from "../../components/NotifList";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

async function page() {
	const session = await getServerSession(authOptions);

	const dbitems = await prisma.userNotification.count({
		where: {
			userEmail: session?.user?.email,
		},
	});

	return (
		<>
			<div className="user-prof-h1-bck">
				<Link href={"/profile/dashboard"}>
					<span>
						<FontAwesomeIcon icon={faAngleLeft} />
					</span>
				</Link>
				<h1>Notifications</h1>
			</div>
			<NotifRead />
			<div className="h-6"></div>
			<NotifList itemsCount={dbitems} />
		</>
	);
}

export default page;
