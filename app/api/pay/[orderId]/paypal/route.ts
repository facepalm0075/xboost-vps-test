import { NextRequest } from "next/server";

type props = { params: { orderId: string } };

export async function POST(request: NextRequest, { params }: props) {
	return sendResponce(params.orderId, 200);
}

const sendResponce = (message: string, code: number) => {
	return Response.json({ Message: message }, { status: code });
};
