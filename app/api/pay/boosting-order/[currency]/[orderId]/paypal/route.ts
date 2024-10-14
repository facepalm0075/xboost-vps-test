import { NextRequest } from "next/server";
import { getOrderDetails } from "./modules/getOrderDetails";
import { createOrder } from "./modules/paypal";

type props = { params: { currency: string; orderId: string } };

export async function POST(request: NextRequest, { params }: props) {
	// validating currency
	if (params.currency !== "usd" && params.currency !== "eur")
		return sendResponce("Invalid currency", 400);

	// validating and getting order from db
	const dbRes = await getOrderDetails(params.orderId);
	if (!dbRes) return sendResponce("order not found", 400);

	try {
		const url: string = await createOrder(dbRes, params.currency);

		return sendResponce(url, 200);
	} catch (error) {
		return sendResponce("faild to create paypal order", 500);
	}
}

const sendResponce = (message: string, code: number) => {
	return Response.json({ Message: message }, { status: code });
};
