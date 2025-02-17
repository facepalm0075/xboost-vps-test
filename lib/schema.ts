import { z } from "zod";

export const EmailFormLoginData = z.object({
	email: z.string().email({ message: "Invalid Email Address" }),
});

export const addOrderNextRequest = z.object({
	gameName: z.string(),
	boostType: z.string(),
	credential: z.string().min(1, { message: "crentials required" }),
	boostDetails: z.object({}),
});

export const dropOptions = z.array(
	z.object({
		optionName: z.string(),
		optionContent: z.string(),
	})
);

export const toggleOptions = z.array(
	z.object({
		optionName: z.string(),
	})
);

export const options = z.array(
	z.object({
		optionName: z.string(),
	})
);

export const addOrderRankBoostRequest = z.object({
	currentRank: z.number().int("Current rank must be an integer"),
	desiredRank: z.number().int("Desired rank must be an integer"),
	dropDownOptions: dropOptions,
	toggleOptions: toggleOptions,
});

export const addOrderRankWinsRequest = z.object({
	currentRank: z.number().int("Current rank must be an integer"),
	rankWins: z.number().int("Desired rank must be an integer"),
	dropDownOptions: dropOptions,
	toggleOptions: toggleOptions,
});

export const addOrderLevelBoostRequest = z.object({
	currentLevel: z.number().int("Current rank must be an integer"),
	desiredLevel: z.number().int("Desired rank must be an integer"),
	dropDownOptions: dropOptions,
	toggleOptions: toggleOptions,
});

export const allNotifRequest = z.object({
	skip: z.number().int("skip must be an integer"),
	take: z.number().int("take rank must be an integer"),
});

export const DiscordUser = z.object({
	discordId: z.string().regex(/^[\w-]{2,32}\d{4}$/, {
		message: "Invalid Discord ID. It must be in the format 'username1234'.",
	}),
});

export const boosterForm = z.object({
	start: z.string(),
	EmailnDiscord: z.tuple([z.string(), z.string()]),
	Country: z.string(),
	Server: z.array(z.string()),
	Platform: z.array(z.string()),
	Rank: z.string(),
	TextArea: z.string(),
});
