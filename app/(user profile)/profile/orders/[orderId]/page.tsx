import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";
import prisma from "@/src/lib/db";
import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faCheck } from "@fortawesome/free-solid-svg-icons";
import { ToolTipEO } from "@/app/components/CostumToolTip";
import CopyOrderId from "@/app/components/CopyOrderId";
import MakePaymentBtn from "@/app/(user profile)/components/MakePaymentBtn";
import OrderProgres from "@/app/(user profile)/components/OrderProgres";

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
			</div>

			<OrderProgres status={dbitems.status}/>

			{dbitems.status === "not paid" && (
				<>
					
					<div className="flex">
						<div className="w-1/2 p-5">
							<div className="peyment-method-container">
								<h1>Select payment method</h1>
								<MakePaymentBtn
									price={dbitems.price}
									baseUrl={process.env.BASE_URL!}
									orderId={dbitems.id}
								/>
							</div>
						</div>
						<div className="w-1/2 p-5">
							<div className="checkout-review"></div>
						</div>
					</div>
				</>
			)}
		</>
	);
}

export default page;
