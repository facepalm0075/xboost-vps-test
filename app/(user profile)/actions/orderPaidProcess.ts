import prisma from "@/src/lib/db";
import { addUserNotification } from "./addNotif";

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
	addUserNotification({
		userEmail: dbitem.userEmail!,
		subject: "Order Paid",
		description: "Your order payment completed.",
		link: "/profile/orders/" + orderId,
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
	addUserNotification({
		userEmail: dbitem.userEmail!,
		subject: "Cashback",
		description: `${price} coins added to your wallet`,
		link: null,
	});

	return dbitem;
};
