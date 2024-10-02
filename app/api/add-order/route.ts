import { NextRequest } from "next/server";
import { authCheck, baseValidation, rankBoostValidation } from "./modules/SmallValidations";
import { rankBoostDetailsContentValidation } from "./modules/RankBoostDetailsContentValidation";
import { addOrderToDatabase } from "./modules/AddOrderToDB";
import { duplicateCheck } from "./modules/DuplicateCheck";
import { getServerSession } from "next-auth";
import { authOptions } from "../auth/_options";
import { getBoostingOrder } from "./modules/GetBoostingOrder";
import calcPrice from "./modules/CalcPrice";

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

		// handling all boost types
		switch (requestData.boostType) {
			case "rank boost":
				// getting boosting order details from db
				const dbitems = await getBoostingOrder(requestData.gameName, requestData.boostType);

				// validating (add order) boostDetails data form
				if (!rankBoostValidation(requestData.boostDetails))
					return sendResponce("Invalid data", 400);
				const contentValidation = rankBoostDetailsContentValidation(requestData, dbitems);
				if (contentValidation !== "validated") return sendResponce(contentValidation, 400);

				// checking duplicate order
				// const duplicateValidation = await duplicateCheck(requestData, session!);
				// if (duplicateValidation.title !== "np")
				// 	return sendResponce(duplicateValidation.body, duplicateValidation.code);

				// calcing order price
				const price = calcPrice(requestData, requestData.boostType, dbitems);
				if (price === "error") return sendResponce("boost type not found", 400);

				// add order
				const addResult = await addOrderToDatabase(requestData, session!, Number(price));
				return sendResponceWithId(addResult.body, addResult.id, addResult.code);

			default:
				// if boost type not found
				return sendResponce("boost type not found", 400);
		}
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
