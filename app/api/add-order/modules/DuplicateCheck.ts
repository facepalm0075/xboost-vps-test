import { authOptions } from "../../auth/_options";
import prisma from "@/src/lib/db";
import { addOrderRequestType } from "../route";
import { Prisma } from "@prisma/client";
import { Session } from "next-auth";

export const duplicateCheck = async (requestData: addOrderRequestType, session: Session) => {
	try {
		// extracting request parts
		const gameName = requestData.gameName;
		const credential = requestData.credential;

		const dbRes = await prisma.userOrders.findFirst({
			where: {
				gameName: gameName,
				userEmail: session?.user?.email,
				accCrendential: credential,
			},
		});
		if (dbRes)
			return {
				title: "duplicate",
				body: credential + " game account already have active order",
				code: 403,
			};

		return { title: "np", body: "", code: 0 };
	} catch (error) {
		// any error that prisma throws + typesafety. both code and message are a string
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const message = "database error : " + error.code + error.message;
			return { title: "dbError", body: message, code: 500 };
		} else {
			const message = "unknown database request error; please contact support | " + error;
			return { title: "dbError", body: message, code: 500 };
		}
	}
};
