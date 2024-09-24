import { NextRequest } from "next/server";
import { authCheck, baseValidation, rankBoostValidation } from "./modules/SmallValidations";
import { rankBoostDetailsContentValidation } from "./modules/RankBoostDetailsContentValidation";
import { addOrderToDatabase } from "./modules/AddOrderToDB";

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
		if (!(await authCheck())) return sendResponce("not Logged in!", 401);

		// get request json
		const requestData: addOrderRequestType = await request.json();

		// validating (add order) request data base form
		if (!baseValidation(requestData)) return sendResponce("Bad input", 400);

		//---------------------------------------------------------------------

		// handling all boost types
		switch (requestData.boostType) {
			case "rank boost":
				// validating (add order) boostDetails data form
				if (!rankBoostValidation(requestData.boostDetails))
					return sendResponce("Invalid data", 400);
				const contentValidation = await rankBoostDetailsContentValidation(requestData);
				if (contentValidation !== "validated") return sendResponce(contentValidation, 400);

				// checking duplicate order

				// add order
				const addResult = await addOrderToDatabase(requestData);
				return sendResponce(addResult.body, addResult.code);
				break;

			default:
				// if boost type not found
				return sendResponce("boost type not found", 400);
		}

		return Response.json({ Message: "order added :)" }, { status: 200 });
	} catch {
		// this try catch used for catch error when user not sending json data in request body
		return sendResponce("Invalid json data", 400);
	}
}

// gets error message + error code and makes response interface
const sendResponce = (message: string, code: number) => {
	return Response.json({ Message: message }, { status: code });
};
