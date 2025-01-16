import { NextRequest } from "next/server";
import {
	authCheck,
	baseValidation,
	levelBoostValidation,
	rankBoostValidation,
	rankWinsValidation,
} from "./modules/SmallValidations";
import { rankBoostDetailsContentValidation } from "./modules/RankBoostDetailsContentValidation";
import { addOrderToDatabase } from "./modules/AddOrderToDB";
import { duplicateCheck } from "./modules/DuplicateCheck";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/_options";
import { getBoostingOrder } from "./modules/GetBoostingOrder";
import calcPrice from "./modules/CalcPrice";
import { rankWinsDetailsContentValidation } from "./modules/RankWinsDetailsContentValidation";
import { levelBoostDetailsContentValidation } from "./modules/LevelBoostDetailContentValidation";
import { addUserNotification } from "@/app/(user profile)/actions/addNotif";

export type addOrderRequestType = {
	gameName: string;
	boostType: string;
	credential: string;
	boostDetails: any;
};

export type rankBoostOrderDetailsType = {
	currentRank: number;
	desiredRank: number;
	dropDownOptions: dropDownOptionsOrderDetailsType[];
	toggleOptions: toggleOptionsOrderDetailsType[];
};

export type rankWinsOrderDetailsType = {
	currentRank: number;
	rankWins: number;
	dropDownOptions: dropDownOptionsOrderDetailsType[];
	toggleOptions: toggleOptionsOrderDetailsType[];
};

export type levelBoostOrderDetailsType = {
	currentLevel: number;
	desiredLevel: number;
	dropDownOptions: dropDownOptionsOrderDetailsType[];
	toggleOptions: toggleOptionsOrderDetailsType[];
};

export type dropDownOptionsOrderDetailsType = {
	optionName: string;
	optionContent: string;
};
export type toggleOptionsOrderDetailsType = {
	optionName: string;
};

export async function POST(request: NextRequest) {
	try {
		// check if user logged in
		const session = await getServerSession(authOptions);
		if (!(await authCheck(session))) return sendResponce("not Logged in!", 401);

		// get request json
		const requestData: addOrderRequestType = await request.json();

		// validating (add order) request data base form
		if (!baseValidation(requestData)) return sendResponce("Bad input", 400);

		//---------------------------------------------------------------------

		// getting boosting order details from db
		const dbitems = await getBoostingOrder(requestData.gameName, requestData.boostType);
		if (!dbitems) return sendResponce("order not found; Invalid game name or order type", 400);

		// validating all boost types details content with db
		switch (requestData.boostType) {
			case "rank boost":
				// validating data form
				if (!rankBoostValidation(requestData.boostDetails))
					return sendResponce("Invalid data", 400);

				// validating content
				const contentValidation1 = rankBoostDetailsContentValidation(requestData, dbitems);
				if (contentValidation1 !== "validated")
					return sendResponce(contentValidation1, 400);
				break;
			case "rank wins":
				// validating data form
				if (!rankWinsValidation(requestData.boostDetails))
					return sendResponce("Invalid data", 400);

				// validating content
				const contentValidation2 = rankWinsDetailsContentValidation(requestData, dbitems);
				if (contentValidation2 !== "validated")
					return sendResponce(contentValidation2, 400);
				break;
			case "level boost":
				// validating data form
				if (!levelBoostValidation(requestData.boostDetails))
					return sendResponce("Invalid data", 400);

				// validating content
				const contentValidation3 = levelBoostDetailsContentValidation(requestData, dbitems);
				if (contentValidation3 !== "validated")
					return sendResponce(contentValidation3, 400);
				break;
			default:
				// if boost type not found
				return sendResponce("boost type not found", 400);
		}

		// checking duplicate order
		// const duplicateValidation = await duplicateCheck(requestData, session!);
		// if (duplicateValidation.title !== "np")
		// 	return sendResponce(duplicateValidation.body, duplicateValidation.code);

		// calcing order price
		const price = calcPrice(requestData, requestData.boostType, dbitems);
		if (price === "error") return sendResponce("boost type not found", 400);

		// add order
		const addResult = await addOrderToDatabase(
			requestData,
			session!,
			Number(price),
			dbitems.id
		);
		
		addUserNotification({
			userEmail: session!.user!.email!,
			subject: "Order Added",
			description: "New order added in to your order list.",
			link: "/profile/orders/" + addResult.id,
		});
		return sendResponceWithId(addResult.body, addResult.id, addResult.code);
	} catch (err) {
		// this try catch used for catch error when user not sending json data in request body
		console.log(err);
		return sendResponce("Invalid json data", 400);
	}
}

// gets error message + error code and makes response interface
const sendResponce = (message: string, code: number) => {
	return Response.json({ Message: message }, { status: code });
};

// gets error message + error code and makes response interface
const sendResponceWithId = (message: string, id: string, code: number) => {
	return Response.json({ Message: message, Id: id }, { status: code });
};
