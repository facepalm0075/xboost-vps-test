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
	function commafy(num: number | undefined) {
		if (num) {
			return Number(num).toLocaleString(); 
		}
	}
	return (
		<>
			<div className="cash-back-container">
				<h2 className="cb-container-h2">xBoost Wallet</h2>
				<div className="cb-container-d">
					<strong>{commafy(dbitem?.walletBalance)}</strong>
					<span> Coins</span>
				</div>
				<span className="cb-container-span">3% cashback for every purchase</span>
				<div className="cash-back-details-btn">details</div>
			</div>
		</>
	);
}

export default Cashback;
