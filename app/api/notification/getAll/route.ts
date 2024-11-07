import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";
import prisma from "@/src/lib/db";
import { NextRequest } from "next/server";
export const dynamic = "force-dynamic";

type query = {
	skip: number;
	take: number;
};

export async function GET(request: NextRequest) {
	try {
		const session = await getServerSession(authOptions);
		if (!session) return Response.json({ Message: "not logged in" }, { status: 400 });

		// get request json
		const url = new URL(request.url);
		let skip = url.searchParams.get("skip");
		let take = url.searchParams.get("take");
		const isInteger = (value: string) => {
			return /^\d+$/.test(value);
		};
		if (!skip || !take)
			return Response.json({ Message: "required queries not found" }, { status: 400 });

		if (!isInteger(skip) || !isInteger(take))
			return Response.json({ Message: "values not number" }, { status: 400 });

		const db = await prisma.userNotification.findMany({
			where: {
				userEmail: session.user!.email!,
			},
			orderBy: {
				updatedAt: "desc",
			},
			skip: Number(skip)!,
			take: Number(take)!,
		});

		return Response.json({ Message: db }, { status: 200 });
	} catch (error) {
		console.log(error);
		return Response.json({ Message: "bad json" }, { status: 400 });
	}
}
