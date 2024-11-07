import React from "react";
import prisma from "@/src/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBitcoinSign } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

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
				<h2 className="cb-container-h2">Wallet</h2>
				<div className="cb-container-d">
					<strong>{commafy(dbitem?.walletBalance)}</strong>
					<span>
						{" "}
						<FontAwesomeIcon icon={faBitcoinSign} />
					</span>
				</div>
				<span className="cb-container-span">3% cashback for every purchase</span>
				<Link href={"/profile/transactions"}>
					<div className="cash-back-details-btn">details</div>
				</Link>
			</div>
		</>
	);
}

export default Cashback;
