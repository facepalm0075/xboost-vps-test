import prisma from "@/src/lib/db";

type props = {
	userEmail: string | null;
	subject: string;
	description: string;
	link: string | null;
};

export const addUserNotification = async (params: props) => {
	const dbitem = await prisma.userNotification.create({
		data: {
			userEmail: params.userEmail,
			subject: params.subject,
			description: params.description,
			link: params.link,
		},
	});
};
