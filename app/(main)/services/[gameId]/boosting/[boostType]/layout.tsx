import { titleCase } from "@/app/components/TitleCase";
import Image from "next/image";
import { BoostingPage, ShieldTick } from "../svgs";
import prisma from "@/src/lib/db";
import Link from "next/link";
import React from "react";

type props = {
	params: { gameId: string; boostType: string };
	children: React.ReactNode;
};

export default async function Layout({ children, params }: props) {
	const gameId = params.gameId.replaceAll("-", " ");
	const boostType = params.boostType.replaceAll("-", " ");
	const dbitems = await prisma.boostingOrders.findMany({
		where: {
			orderedIn: {
				game: {
					name: gameId,
				},
			},
		},
		orderBy: {
			id: "asc",
		},
	});

	return (
		<>
			<div id="gtcont" className="gameType-container">
				<div className="relative">
					<Image
						src="/cs2-bg-img5.png"
						alt="cs2-bg"
						width={400}
						height={347}
						className="absolute right-20 -mt-10 -z-10 opacity-20"
					/>
				</div>
				<div className="flex gameType-h1 mt-16">
					<div>
						<div>
							<BoostingPage />
						</div>
					</div>
					<div>
						<div className="ml-3">
							<h1>{titleCase(gameId) + " " + titleCase(boostType)}</h1>
							<span>
								Select a desired rank and get Boosted by a Professional player.
							</span>
						</div>
					</div>
				</div>
				<div className="flex mt-7">
					{dbitems.map((item, key) => {
						if (item.isEnabled) {
							return (
								<Link key={key} href={`${item.name.replaceAll(" ", "-")}`}>
									<div
										className={`gameType-btn ${boostType === item.name ? "gameType-btn-active" : ""}`}
									>
										{titleCase(item.name)}
									</div>
								</Link>
							);
						}
					})}
				</div>
				<div className="flex gameType-safe mt-8">
					<div>
						<div className="mt-1">
							<ShieldTick />
						</div>
					</div>
					<div>
						<div className="ml-1">
							<h3>100% Safe & Secure Checkout </h3>
							<span>
								Shop with confidence - Our secure payment system ensures your
								transactions are safe and protected from fraud.
							</span>
						</div>
					</div>
				</div>
				{children}
			</div>
		</>
	);
}
