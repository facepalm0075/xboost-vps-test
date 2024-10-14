import prisma from "@/src/lib/db";
export const getOrderDetails = async (orderId: string) => {
	const dbitems = await prisma.userOrders.findFirst({
		where: {
			id: orderId,
		},
	});

	return dbitems;
};
