"use client";
import axios from "axios";
import React from "react";
import { useRouter } from "next/navigation";

type props = {
	price: number;
	baseUrl: string;
	orderId: string;
};
function MakePaymentBtn({ price, baseUrl, orderId }: props) {
	const router = useRouter();
	const clickHandler = async () => {
		const response = await axios({
			url: baseUrl + "/api/pay/boosting-order/usd/" + orderId + "/paypal",
			method: "POST",
		});

		if (response.status === 200) {
			if (typeof window !== "undefined") {
				router.push(response.data.Message);
			}
		}
	};
	return (
		<>
			<div className="peyment-method-item">paypal</div>
			<div className="peyment-method-item">stripe</div>
			<div className="peyment-method-item">crypto.com</div>
			<div className="peyment-method-item">etc...</div>
			<div className="flex justify-center">
				<div onClick={clickHandler} className="make-payment-btn">
					make payment({price})
				</div>
			</div>
		</>
	);
}

export default MakePaymentBtn;
