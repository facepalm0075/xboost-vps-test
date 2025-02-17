"use client";

import UserAccLoading from "@/app/components/UserAccLoading";
import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";

function UserInfo() {
	const { data: session, status } = useSession();
	if (status === "loading") {
		return <UserAccLoading />;
	}
	return (
		<>
			<div>
				<div className="flex justify-center">
					<div className="ud-profile-pic">
						<span className="ud-profile-pic-span">
							{session?.user?.name && session?.user?.name[0]}
						</span>
						{session?.user?.image && (
							<Image
								src={session?.user?.image}
								alt="profile image"
								width={107}
								height={107}
							/>
						)}
					</div>
				</div>
				<div className="text-center">
					{session?.user?.name && <div className="ud-name">{session?.user?.name}</div>}
					{session?.user?.email && <div className="ud-email">{session?.user?.email}</div>}
					<div className="ud-mode">User Mode</div>
				</div>
			</div>
		</>
	);
}

export default UserInfo;
