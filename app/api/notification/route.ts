import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";
import prisma from "@/src/lib/db";
export const dynamic = "force-dynamic";

export async function GET() {
	const session = await getServerSession(authOptions);
	if (!session) return Response.json({ Message: "you are not logged in" }, { status: 400 });

	const db = await prisma.userNotification.findMany({
		where: {
			userEmail: session.user!.email,
			read: false,
		},
		orderBy: {
			updatedAt: "desc",
		},
	});

	return Response.json({ Message: db }, { status: 200 });
}

export async function PUT() {
	const session = await getServerSession(authOptions);
	if (!session) return Response.json({ Message: "you are not logged in" }, { status: 400 });

	const db = await prisma.userNotification.updateMany({
		where: {
			userEmail: session.user!.email,
			read: false,
		},
		data: {
			read: true,
		},
	});
	return Response.json({ Message: "read" }, { status: 200 });
}
