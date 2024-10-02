import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";
import prisma from "@/src/lib/db";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCopy } from "@fortawesome/free-solid-svg-icons";
import { ToolTipEO } from "@/app/components/CostumToolTip";
import CopyOrderId from "@/app/components/CopyOrderId";

type props = {
	params: { orderId: string };
};

async function page({ params }: props) {
	const session = await getServerSession(authOptions);
	const dbitems = await prisma.userOrders.findFirst({
		where: {
			id: params.orderId,
			userEmail: session?.user?.email,
		},
	});
	if (!dbitems) return <div>not found!</div>;

	return (
		<>
			<div className="order-id-container flex items-center flex-wrap">
				<strong>order id : </strong>
				<span id="order-id" className="oic-span1">
					{dbitems?.id}
				</span>

				<CopyOrderId />

				<span
					style={{ backgroundColor: dbitems.status && "lightyellow" }}
					className="oic-span2"
				>
					{dbitems.status}
				</span>
			</div>
		</>
	);
}

export default page;
