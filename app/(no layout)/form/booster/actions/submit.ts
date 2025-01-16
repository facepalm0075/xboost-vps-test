"use server";
import { authOptions } from "@/app/api/auth/_options";
import { getServerSession } from "next-auth";
import { boosterFormType } from "../stages/StageManager";
import { boosterForm, DiscordUser, EmailFormLoginData } from "@/lib/schema";
import json from "@/public/booster_questions.json";
import prisma from "@/src/lib/db";

export async function boosterFormSubmit(form: boosterFormType, gameN: string) {
	const session = await getServerSession(authOptions);
	if (!session) return { message: "Unauthorized" };
	//else if (session.role != "user") return { message: "Forbidden" };

	//	validating
	const { error: zodError } = boosterForm.safeParse(form);
	const { error: zodError2 } = EmailFormLoginData.safeParse({ email: form.EmailnDiscord[0] });
	const { error: zodError3 } = DiscordUser.safeParse({ discordId: form.EmailnDiscord[1] });
	if (zodError || zodError2 || zodError3) {
		return { message: "Data is invalid" };
	}

	// sanitizing
	const data: any = json;
	if (data.games[gameN]) {
		const game = data.games[gameN];
		console.log(game);
	} else {
		return { message: "Game not found" };
	}

	// saving
	const db = await prisma.boosterRoleRequests.create({
		data: {
			userEmail: session.user?.email!,
			game: gameN,
			data: form,
		},
	});

	return { message: "W" };
}
