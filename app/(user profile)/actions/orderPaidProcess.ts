import prisma from "@/src/lib/db";

export const orderPaidProcess = async (orderId: string) => {
	const dbitem = await prisma.userOrders.update({
		where: {
			id: orderId,
		},
		data: {
			status: "paid",
		},
		include: {
			User: {
				select: {
					walletBalance: true,
				},
			},
		},
	});

	const price = Math.floor((dbitem.price * 3) / 100 / 0.01);
	const dbitem2 = await prisma.user.update({
		where: {
			email: dbitem.userEmail!,
		},
		data: {
			walletBalance: dbitem.User!.walletBalance! + price,
		},
	});

	return dbitem;
};
