import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/_options";
import prisma from "@/src/lib/db";
import React, { Suspense } from "react";
import { LoginLoading } from "@/app/components/Loadings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft } from "@fortawesome/free-solid-svg-icons";
import OrderCardGenerator from "../../components/OrderCardGenerator";
import Link from "next/link";

async function page() {
	const session = await getServerSession(authOptions);
	const dbitems = await prisma.userOrders.findMany({
		where: {
			userEmail: session?.user?.email,
		},
		select: {
			boostingOrder: true,
			accCrendential: true,
			boostDetails: true,
			boostType: true,
			gameName: true,
			price: true,
			status: true,
			id: true,
		},
		orderBy: {
			updatedAt: "desc",
		},
	});
	if (dbitems.length === 0) return <div>not found!</div>;
	return (
		<div>
			<div className="user-prof-h1-bck">
				<Link href={"/profile/dashboard"}>
					<span>
						<FontAwesomeIcon icon={faAngleLeft} />
					</span>
				</Link>
				<h1>Orders</h1>
			</div>
			<Suspense
				fallback={
					<>
						<div className="ocgl">
							<LoginLoading />
						</div>
					</>
				}
			>
				<div className="flex order-card-title-container">
					<div className="w-1/3 text-left">
						<strong>Details : </strong>
					</div>
					<div className="w-1/3 text-left">
						<strong>Account : </strong>
					</div>
					<div className="w-1/5 text-left">
						<strong>Price : </strong>
					</div>
					<div className="w-1/5 text-right pr-10">
						<strong>Status : </strong>
					</div>
				</div>
				<OrderCardGenerator dbitems={dbitems} />
			</Suspense>
		</div>
	);
}

export default page;
