import prisma from "@/src/lib/db";
export const getBoostingOrder = async (gameName: string, boostType: string) => {
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

	return dbitems;
};
