import { authOptions } from "@/app/api/auth/_options";
import { getServerSession } from "next-auth";
import React from "react";
import StageManager from "./stages/StageManager";
import GameAplly from "./components/GameAplly";

async function page() {
	const session = await getServerSession(authOptions);

	if (!session) {
		return (
			<>
				<div>first u need to login my nigga</div>
			</>
		);
	}

	return <GameAplly />;
}

export default page;
