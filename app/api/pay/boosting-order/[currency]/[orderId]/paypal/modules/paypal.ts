import axios from "axios";
const generateAccessToken = async () => {
	const auth = {
		username: process.env.PAYPAL_CLIENT_ID!,
		password: process.env.PAYPAL_CLIENT_SECRET!,
	};

	const response = await axios({
		url: process.env.PAYPAL_BASE_URL! + "/v1/oauth2/token",
		method: "POST",
		data: "grant_type=client_credentials",
		auth: auth,
	});
	return response.data.access_token;
};

export const createOrder = async (order: any, paramCrrency: string) => {
	const token = await generateAccessToken();

	const currency = "usd".toUpperCase();

	let price = order.price;
	const name = order.gameName + " " + order.boostType;

	const response = await axios({
		url: process.env.PAYPAL_BASE_URL! + "/v2/checkout/orders",
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + token,
		},
		data: JSON.stringify({
			intent: "CAPTURE",
			purchase_units: [
				{
					items: [
						{
							name: name,
							description: name,
							quantity: 1,
							unit_amount: {
								currency_code: currency,
								value: price,
							},
						},
					],

					amount: {
						currency_code: currency,
						value: price,
						breakdown: {
							item_total: {
								currency_code: currency,
								value: price,
							},
						},
					},
				},
			],

			application_context: {
				return_url:
					process.env.BASE_URL! +
					"/profile/orders/" +
					order.id +
					"/return?paymentStatus=ok&paymentGateway=paypal",
				cancel_url:
					process.env.BASE_URL! +
					"/profile/orders/" +
					order.id +
					"/return?paymentStatus=canceled&paymentGateway=paypal",
				shipping_preference: "NO_SHIPPING",
				user_action: "PAY_NOW",
				brand_name: "xBoost.gg",
			},
		}),
	});

	return response.data.links.find((link: any) => link.rel === "approve").href;
};

export const capturePayment = async (orderId: string) => {
	const accessToken = await generateAccessToken();

	const response = await axios({
		url: process.env.PAYPAL_BASE_URL! + `/v2/checkout/orders/${orderId}/capture`,
		method: "POST",
		headers: {
			"Content-Type": "application/json",
			Authorization: "Bearer " + accessToken,
		},
	});

	return response.data;
};
