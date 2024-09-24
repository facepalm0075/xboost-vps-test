import { z } from "zod";

export const EmailFormLoginData = z.object({
	email: z.string().email({ message: "Invalid Email Address" }),
});

export const addOrderNextRequest = z.object({
	gameName: z.string(),
	boostType: z.string(),
	credential: z.string(),
	boostDetails: z.object({}),
});

export const addOrderRankBoostRequest = z.object({
	currentRank: z.number().int("Current rank must be an integer"),
	desiredRank: z.number().int("Desired rank must be an integer"),
	dropDownOptions: z.array(
		z.object({
			optionName: z.string(),
			optionContent: z.string(),
		})
	),
	toggleOptions: z.array(
		z.object({
			optionName: z.string(),
		})
	),
});
