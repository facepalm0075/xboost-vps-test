import { getServerSession, Session } from "next-auth";
import { authOptions } from "../../auth/_options";
import prisma from "@/src/lib/db";
import { addOrderRequestType } from "../route";
import { Prisma } from "@prisma/client";

export const addOrderToDatabase = async (
	requestData: addOrderRequestType,
	session: Session,
	price: number
) => {
	try {
		// extracting request parts
		const gameName = requestData.gameName;
		const boostType = requestData.boostType;
		const boostDetails = requestData.boostDetails;
		const credential = requestData.credential;

		//if (!session) return { title: "mailError", body: "cant find your email please re-login or contanct support", code: 500 };
		const dbRes = await prisma.userOrders.create({
			data: {
				gameName: gameName,
				boostType: boostType,
				price: price,
				boostDetails: boostDetails,
				userEmail: session?.user?.email,
				accCrendential: credential,
			},
		});
		return {
			title: "added",
			body: "order added, order id: " + dbRes.id,
			id: dbRes.id,
			code: 200,
		};
	} catch (error) {
		// any error that prisma throws + typesafety. both code and message are a string
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const message = "database error : " + error.code + error.message;
			return { title: "dbError", body: message, id: "null", code: 500 };
		} else {
			const message = "unknown database request error; please contact support | " + error;
			return { title: "dbError", body: message, id: "null", code: 500 };
		}
	}
};
