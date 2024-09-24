import prisma from "@/src/lib/db";
import { addOrderRequestType, rankBoostOrderDetailsType } from "../route";
import { Prisma } from "@prisma/client";
import { dbRes } from "@/app/(main)/services/[gameId]/boosting/[boostType]/page";
import { dropDownOptionValidator } from "./DropDownOptionValidator";
import { toggleOptionsValidator } from "./ToogleOptionsValidator";

export const rankBoostDetailsContentValidation = async (requestData: addOrderRequestType) => {
	try {
		// extracting request parts
		const gameName = requestData.gameName;
		const boostType = requestData.boostType;
		const boostDetails = requestData.boostDetails as unknown as rankBoostOrderDetailsType;

		// getting data from database for validating
		const dbitems = await prisma.boostingOrders.findFirst({
			where: {
				orderedIn: {
					game: {
						name: gameName,
					},
				},
				name: boostType,
			},
		});

		// if nothing found on database
		if (!dbitems) return "order not found; Invalid game name";

		// changing db reesponse type
		const res: dbRes = dbitems! as unknown as dbRes;

		// validating current rank
		const CurrentRankMin = res.Data.ranksData[0].rankNums[0].mmr;
		const CurrentRankMax =
			res.Data.ranksData[res.Data.ranksData.length - 1].rankNums[
				res.Data.ranksData[res.Data.ranksData.length - 1].rankNums.length - 1
			].mmr;
		if (boostDetails.currentRank < CurrentRankMin || boostDetails.currentRank >= CurrentRankMax)
			return "Invalid current rank";

		// validating desired rank
		const DesiredRankMin = boostDetails.currentRank;
		const DesiredRankMax =
			res.Data.ranksData[res.Data.ranksData.length - 1].rankNums[
				res.Data.ranksData[res.Data.ranksData.length - 1].rankNums.length - 1
			].mmr;
		if (boostDetails.desiredRank <= DesiredRankMin || boostDetails.desiredRank > DesiredRankMax)
			return "Invalid desired rank";

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
			return "unknown database request error; please contact support | " + error;
		}
	}
};
