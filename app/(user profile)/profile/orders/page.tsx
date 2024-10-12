import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";
import prisma from "@/src/lib/db";
import React, { Suspense } from "react";
import { LoginLoading } from "@/app/components/Loadings";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { ToolTipEO } from "@/app/components/CostumToolTip";
import CopyOrderId from "@/app/components/CopyOrderId";
import Link from "next/link";
import { boostingOrderJson } from "@/app/components/types/Types";

import {
	levelBoostOrderDetailsType,
	rankWinsOrderDetailsType,
	rankBoostOrderDetailsType,
} from "@/app/api/add-order/route";
import { dbRes } from "@/app/(main)/services/[gameId]/boosting/[boostType]/page";
import OrderCardGenerator from "../../components/OrderCardGenerator";

async function page() {
	const session = await getServerSession(authOptions);
	const dbitems = await prisma.userOrders.findMany({
		where: {
			userEmail: session?.user?.email,
		},
		select: {
			boostingOrder: true,
			accCrendential: true,
			boostDetails: true,
			boostType: true,
			gameName: true,
			price: true,
			status: true,
			id: true,
		},
	});
	if (!dbitems) return <div>not found!</div>;
	return (
		<div>
			<Suspense
				fallback={
					<>
						<div className="ocgl">
							<LoginLoading />
						</div>
					</>
				}
			>
				<div className="flex order-card-title-container">
					<div className="w-1/3 text-left">
						<strong>Details : </strong>
					</div>
					<div className="w-1/3 text-left">
						<strong>Account : </strong>
					</div>
					<div className="w-1/5 text-left">
						<strong>Price : </strong>
					</div>
					<div className="w-1/5 text-right pr-10">
						<strong>Status : </strong>
					</div>
				</div>
				<OrderCardGenerator dbitems={dbitems} />
			</Suspense>
		</div>
	);
}

export default page;
