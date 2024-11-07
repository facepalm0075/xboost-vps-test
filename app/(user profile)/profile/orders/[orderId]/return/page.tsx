import React from "react";
import { capturePayment as capturePaymentPaypal } from "@/app/api/pay/boosting-order/[currency]/[orderId]/paypal/modules/paypal";
import { redirect, RedirectType } from "next/navigation";
import { savePaypalTransaction } from "@/app/(user profile)/actions/transaction";
import { orderPaidProcess } from "@/app/(user profile)/actions/orderPaidProcess";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";

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
					await savePaypalTransaction(
						result,
						params.orderId,
						searchParams.paymentGateway
					);
					if (result.status === "COMPLETED") {
						const dbitem = await orderPaidProcess(params.orderId);
						if (!dbitem)
							return (
								<div>
									order payment completed but process faild. please contact
									support or check your order status
								</div>
							);
						return (
							<>
								<div className="gateway-return-title">
									<h1>Payment Confirmation</h1>
								</div>
								<div className="payment-status-circles-container">
									<div className="payment-status-circles-base">
										<div className="payment-status-circles-base">
											<div className="payment-status-circles-base payment-status-circles-last">
												<FontAwesomeIcon icon={faCheck} />
											</div>
										</div>
									</div>
								</div>
								<div className="gateway-return-status-title">
									Payment Successful
								</div>
								<div className="gateway-return-status-decrip">
									Order paid by <strong>paypal</strong>.<br />
									Thank you for your trust.
								</div>
								<div className="gateway-return-price">
									<strong>Total Price:</strong>
									<span>${dbitem.price}</span>
								</div>

								<a href={"/profile/orders/" + params.orderId} type="replace">
									<div className="gateway-return-bto">Back to order</div>
								</a>
							</>
						);
					} else {
						return <div>payment not completed</div>;
					}
				} catch (error) {
					return (
						<>
							<div>
								peyment capture faild : <br />
								no order to capture
							</div>
						</>
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
