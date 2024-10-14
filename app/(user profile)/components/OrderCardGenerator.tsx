"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { dbRes } from "@/app/(main)/services/[gameId]/boosting/[boostType]/page";
import { ArrowBlue } from "@/app/(main)/services/[gameId]/boosting/svgs";

type props = {
	dbitems: any[];
};

function OrderCardGenerator({ dbitems }: props) {
	return (
		<>
			{dbitems.map((item, index) => {
				const boostingOrderDBitems = item.boostingOrder as unknown as dbRes;
				const item2 = item.boostDetails as any;
				let loopStart = false;
				let rankItems = ["", ""];
				if (item.boostType === "rank boost") {
					const ranksData = boostingOrderDBitems.Data.ranksData;
					boostingOrderDBitems.Data.ranksData.forEach((i1, x1) => {
						i1.rankNums.forEach((i2, x2) => {
							// finding next rank
							let nextRankMmr =
								ranksData[ranksData.length - 1].rankNums[
									ranksData[ranksData.length - 1].rankNums.length - 1
								].mmr;

							let nextRankDiff = 0;
							if (ranksData[x1 + 1] || i1.rankNums[x1 + 2]) {
								let rankCount = x1;
								let numsCount = x2 + 1;
								if (x2 > i1.rankNums.length - 2) {
									rankCount = x1 + 1;
									numsCount = 0;
								}
								nextRankMmr = ranksData[rankCount].rankNums[numsCount].mmr;
								nextRankDiff = nextRankMmr - i2.mmr;
							}
							if (i2.mmr + nextRankDiff - 1 >= item2.currentRank) {
								if (!loopStart) {
									rankItems[0] = `${i1.rankName} ${i2.content !== "mt" && i2.content !== "MMR" ? i2.content : ""}`;

									loopStart = true;
								}
							}
							if (i2.mmr <= item2.desiredRank) {
								rankItems[1] = `${i1.rankName} ${i2.content !== "mt" && i2.content !== "MMR" ? i2.content : ""}`;
							}
						});
					});
				} else if (item.boostType === "rank wins") {
					boostingOrderDBitems.Data.ranksData.forEach((i1) => {
						i1.rankNums.forEach((i2) => {
							if (i2.mmr === item2.currentRank) {
								rankItems[0] = `${i1.rankName} ${i2.content !== "mt" && i2.content !== "MMR" ? i2.content : ""}`;
							}
						});
					});
				}
				const gameNameForImage = item.gameName.replaceAll(" ", "-");
				return (
					<Link href={`./orders/${item.id}`} key={index}>
						<div className="flex order-card-container">
							<div className="w-1/3 text-left">
								<div className="flex items-center">
									<Image
										src={`/gameicons/${gameNameForImage}.png`}
										alt="archon rank"
										width={45}
										height={50}
										style={{ borderRadius: "8px" }}
										className="mr-3"
									/>
									<div>
										<span className="block uppercase font-bold">{item.boostType}</span>
										<span style={{ color: "var(--theme-main-color)", fontSize:"13px" }}>
											{item.boostType === "rank boost" && (
												<>
													{rankItems[0]} <ArrowBlue /> {rankItems[1]}
												</>
											)}
											{item.boostType === "rank wins" && (
												<>
													{rankItems[0]} <ArrowBlue /> {item2.rankWins}
												</>
											)}
											{item.boostType === "level boost" && (
												<>
													{item2.currentLevel} <ArrowBlue />{" "}
													{item2.desiredLevel}
												</>
											)}
										</span>
									</div>
								</div>
							</div>
							<div className="w-1/3 text-left">
								<span>{item.accCrendential}</span>
							</div>
							<div
								style={
									{
										/*fontSize: "18px", fontWeight: 600*/
									}
								}
								className="w-1/5 text-left"
							>
								<span className="font-bold">${item.price}</span>
							</div>
							<div className="w-1/5">
								<span
									style={{
										backgroundColor:
											item.status === "not paid" ? "lightyellow" : item.status === "paid" ? "lightgreen" : "",
											
									}}
									className="oco-status-span"
								>
									{item.status}
								</span>
							</div>
						</div>
					</Link>
				);
			})}
		</>
	);
}

export default OrderCardGenerator;
