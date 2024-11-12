import React from "react";
import MainChatAdmin from "../../components/MainChatAdmin";
import { cookies } from "next/headers";
import SessionProviderSv from "@/app/components/SessionProviderSv";

function page() {
	const cookieStore = cookies();
	const specificCookie = cookieStore.get("next-auth.session-token");
	return (
		<div>
			<SessionProviderSv>
				<MainChatAdmin coock={specificCookie?.value} />
			</SessionProviderSv>
		</div>
	);
}

export default page;
