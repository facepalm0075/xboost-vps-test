import prisma from "@/src/lib/db";
import {
	addOrderRequestType,
	levelBoostOrderDetailsType,
	rankBoostOrderDetailsType,
	rankWinsOrderDetailsType,
} from "../route";
import { Prisma } from "@prisma/client";
import { dbRes } from "@/app/(main)/services/[gameId]/boosting/[boostType]/page";
import { dropDownOptionValidator } from "./DropDownOptionValidator";
import { toggleOptionsValidator } from "./ToogleOptionsValidator";

export const levelBoostDetailsContentValidation = (
	requestData: addOrderRequestType,
	dbitems: any
) => {
	try {
		// extracting request parts
		const gameName = requestData.gameName;
		const boostType = requestData.boostType;
		const boostDetails = requestData.boostDetails as unknown as levelBoostOrderDetailsType;

		// changing db reesponse type
		const res: dbRes = dbitems! as unknown as dbRes;

		// validating current and desired level
		if (boostDetails.currentLevel < 1) return "Invalid current level";
		else if (boostDetails.desiredLevel > res.Data.lvlRange.maxNum)
			return "Invalid desired level";
		else if (boostDetails.desiredLevel - boostDetails.currentLevel < res.Data.lvlRange.dis)
			return "Invalid level distance";

		// validating drop down options name + content and numbers
		const dropDownOptionValidatorResult = dropDownOptionValidator(
			boostDetails.dropDownOptions,
			res.extraOptions2
		);
		if (dropDownOptionValidatorResult !== "validated") return dropDownOptionValidatorResult;

		// validating toggle options
		const toggleOptionValidatorResult = toggleOptionsValidator(
			boostDetails.toggleOptions,
			res.extraOptions
		);
		if (toggleOptionValidatorResult !== "validated") return toggleOptionValidatorResult;

		return "validated";
	} catch (error) {
		// any error that prisma throws + typesafety. both code and message are a string
		if (error instanceof Prisma.PrismaClientKnownRequestError) {
			const message = "database error : " + error.code + error.message;
			return message;
		} else {
			return "unknown database request error; please contact support";
		}
	}
};
