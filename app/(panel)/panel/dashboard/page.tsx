import React from "react";
import MainChatAdmin from "../../components/MainChatAdmin";
import { cookies } from "next/headers";

function page() {
	const cookieStore = cookies();
	const specificCookie = cookieStore.get("next-auth.session-token");
	return (
		<div>
			<MainChatAdmin coock={specificCookie?.value} />
		</div>
	);
}

export default page;
