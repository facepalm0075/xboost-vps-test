import React from "react";
import prisma from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";

async function Cashback() {
	const session = await getServerSession(authOptions);
	const dbitem = await prisma.user.findFirst({
		where: {
			email: session?.user?.email!,
		},
		select: {
			walletBalance: true,
		},
	});
	return (
		<>
			<h2>3% Cashback</h2>
			<span>your xboost coin balance : {dbitem?.walletBalance}</span>
		</>
	);
}

export default Cashback;
