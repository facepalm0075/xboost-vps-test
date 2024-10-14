import React from "react";
import { capturePayment as capturePaymentPaypal } from "@/app/api/pay/boosting-order/[currency]/[orderId]/paypal/modules/paypal";
import { redirect, RedirectType } from "next/navigation";
import { savePaypalTransaction } from "@/app/(user profile)/actions/transaction";
import { orderPaidProcess } from "@/app/(user profile)/actions/orderPaidProcess";
import Link from "next/link";

type props = {
	params: { orderId: string };
	searchParams?: { token?: string; paymentStatus?: string; paymentGateway?: string };
};
async function page({ params, searchParams }: props) {
	if (searchParams?.paymentStatus === "ok") {
		if (searchParams?.paymentGateway === "paypal") {
			if (searchParams.token) {
				try {
					const result = await capturePaymentPaypal(searchParams.token);
					await savePaypalTransaction(result, params.orderId);
					if (result.status === "COMPLETED") {
						const dbitem = await orderPaidProcess(params.orderId);
						if (!dbitem)
							return (
								<div>
									order payment completed but process faild. please contact
									support
								</div>
							);
						return (
							<>
								<div>
									order id : {dbitem.id}
									<br />
									order price : {dbitem.price}
									<br />
									order status : {dbitem.status}
									<br />
									order game account : {dbitem.accCrendential}
									<br />
								</div>
								<a href={"/profile/orders/" + params.orderId} type="replace">
									Back To Order
								</a>
							</>
						);
					} else {
						return <div>payment not completed</div>;
					}
				} catch (error) {
					return (
						<div>
							peyment capture faild : <br />
							no order to capture
						</div>
					);
				}
			}
		}
	} else if (searchParams?.paymentStatus === "canceled") {
		redirect("/profile/orders/" + params.orderId, RedirectType.replace);
	}
	return <div></div>;
}

export default page;
