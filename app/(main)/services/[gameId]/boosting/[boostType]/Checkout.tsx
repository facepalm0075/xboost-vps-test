"use client";

import { ArrowBlue } from "../svgs";
import Image from "next/image";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClock } from "@fortawesome/free-solid-svg-icons";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/app/redux/hooks";
import { titleCase } from "@/app/components/TitleCase";
import { dbRes } from "./page";
import { op, op2, rnk, rnkw } from "@/app/components/types/Types";
import { signIn, useSession } from "next-auth/react";
import React from "react";
type props = {
	gameN: string;
	boostType: string;
	dbData: dbRes;
};
export type slce = {
	gameName: string;
	gameOptions?: op[];
	gameOptions2?: op2[];
	gameRanks?: rnk;
	gameRankWins?: rnkw;
	gameUnrankedWins?: number | undefined;
	gameLVLrange?: number[];
};

function Checkout({ gameN, boostType, dbData }: props) {
	const [loading, setLoading] = useState(1);
	if (loading === 2) {
		const resize_ob = new ResizeObserver(function (entries) {
			const item = document.getElementById("gtcont")!;
			const item2 = document.getElementById("checkout-c1i")!;
			if (item2) {
				let height =
					item.clientHeight -
					(item2.getBoundingClientRect().top - item.getBoundingClientRect().top);

				item2.style.height = `${height}px`;
			}
		});
		setLoading(3);
		resize_ob.observe(document.querySelector("#gtcont")!);
	}

	useEffect(() => {
		setLoading(2);
	}, []);

	const OptionMainNameer = useAppSelector((state) => state.extraOptionSlice);
	const OptionNameer = OptionMainNameer.extraOptiontState;
	let data: slce = { gameName: "" };

	if (boostType === "rank boost") {
		const mainNameer = useAppSelector((state) => state.rankBoostSlice);
		const nameer = mainNameer.rankBoostState;
		nameer.forEach((item) => {
			if (item.gameName === gameN) {
				data = item;
			}
		});
	} else if (boostType === "rank wins") {
		const mainNameer = useAppSelector((state) => state.rankWinsSlice);
		const nameer = mainNameer.rankWinsState;
		nameer.forEach((item) => {
			if (item.gameName === gameN) {
				data = item;
			}
		});
	} else if (boostType === "level boost") {
		const mainNameer = useAppSelector((state) => state.lvlBoost);
		const nameer = mainNameer.lvlBoostState;
		nameer.forEach((item) => {
			if (item.gameName === gameN) {
				data = item;
			}
		});
	}
	let result = data;

	let eoResult = { op: [] as op[] | undefined };
	let eo2Result = { op2: [] as op2[] | undefined };
	OptionNameer.forEach((item) => {
		if (item.gameName === gameN && item.boostType === boostType) {
			eoResult.op = item.gameOptions;
			eo2Result.op2 = item.gameOptions2;
		}
	});

	//---------------------------------------------------------------------------

	// calcing price main

	const calcPrice = (boostType: string) => {
		switch (boostType) {
			case "rank boost":
				return applyer(rankPrice());
			case "rank wins":
				return applyer(rankWinsPrice());
			case "level boost":
				return applyer(lvlBoostPrice());
		}
		return 0.0;
	};

	//applyer

	const applyer = (item: number) => {
		const op1app = tOptions(item);
		const op2app = dOptions(op1app);
		return op2app;
	};

	// calc discount
	const discountCalc = (item: number) => {
		if (dbData.discount) {
			const discount = (item * dbData.discount) / 100;
			return item - discount;
		}
		return item;
	};

	//applying toggle options

	const tOptions = (item: number) => {
		const ops = eoResult.op;
		if (ops) {
			if (ops.length > 0) {
				let sum = item;
				ops.map((item1) => {
					// for % options
					if (item1.value.includes("%")) {
						let num = Number(item1.value.replace("%", ""));
						let operator = (item / 100) * num;
						sum += operator;
					} else if (item1.value.includes("$")) {
						let num = Number(item1.value.replace("$", ""));
						let operator = item + num;
						sum = operator;
					}
				});
				return sum;
			}
		}
		return item;
	};

	//applying dropdown options

	const dOptions = (item: number) => {
		const ops = eo2Result.op2;
		if (ops) {
			if (ops.length > 0) {
				let sum = item;
				ops.map((item1) => {
					// for % options
					if (item1.optionValue.includes("%")) {
						let num = Number(item1.optionValue.replace("%", ""));
						let operator = (item / 100) * num;
						sum += operator;
					} else if (item1.optionValue.includes("$")) {
						let num = Number(item1.optionValue.replace("$", ""));
						let operator = item + num;
						sum = operator;
					}
				});
				return sum;
			}
		}
		return item;
	};

	// calcing rank price
	const rankPrice = () => {
		const userData = result?.gameRanks!;
		const ranksData = dbData.Data.ranksData;
		let basePrice = 0;
		if (userData && userData.currentRank && userData.desiredRank) {
			const requestDataC = userData.currentRank?.rankNumber!;
			const requestDataD = userData.desiredRank?.rankNumber!;

			let loopStart = false;
			ranksData.forEach((item, index) => {
				item.rankNums.forEach((item2, index2) => {
					// finding next rank
					let nextRankMmr =
						ranksData[ranksData.length - 1].rankNums[
							ranksData[ranksData.length - 1].rankNums.length - 1
						].mmr;
					let nextRankDiff = 0;
					if (ranksData[index + 1] || item.rankNums[index + 2]) {
						let rankCount = index;
						let numsCount = index2 + 1;
						if (index2 > item.rankNums.length - 2) {
							rankCount = index + 1;
							numsCount = 0;
						}
						nextRankMmr = ranksData[rankCount].rankNums[numsCount].mmr;
						nextRankDiff = nextRankMmr - item2.mmr;
					}

					if (item2.mmr + nextRankDiff - 1 >= requestDataC) {
						if (item2.mmr < requestDataD) {
							// calcing between ranks for current mmr
							if (!loopStart) {
								const mmrDiff = requestDataC - item2.mmr;
								const calc = (item2.pricePerWin / nextRankDiff) * mmrDiff;
								basePrice -= calc;
								loopStart = true;
							}

							// calcing between ranks for desired mmr
							const more = requestDataD - item2.mmr;
							if (more <= nextRankDiff) {
								const calc = (item2.pricePerWin / nextRankDiff) * more;
								basePrice += calc;
							} else {
								basePrice += item2.pricePerWin;
							}
						}
					}
				});
			});
		}

		return Number(basePrice);
	};

	// calcing rank wins price
	const rankWinsPrice = () => {
		const userData = result?.gameRankWins!;
		const ranksData = dbData.Data.ranksData;
		let basePrice = 0;
		ranksData.forEach((item) => {
			item.rankNums.forEach((item2) => {
				if (item2.mmr === userData?.currentRank?.rankNumber) {
					basePrice = userData.wins! * item2.pricePerWin;
				}
			});
		});
		return basePrice;
	};

	// calcing lvl boost price
	const lvlBoostPrice = () => {
		const userData = result?.gameLVLrange!;
		const ranksData = dbData.Data.lvlRange;
		let basePrice = (userData[1] - userData[0]) * ranksData.price;

		return basePrice;
	};

	const { data: session, status } = useSession();
	const handleCheckout = () => {
		if (status === "authenticated") {
			const element = document.getElementById("cfc");
			element?.classList.add("checkout-form-container-a");
		} else if (status === "loading") {
		} else {
			signIn();
		}
	};
	const price = calcPrice(boostType).toFixed(2);
	const discounted = discountCalc(Number(price)).toFixed(2);

	return (
		<div id="checkout-c1i" className="checkout-c1">
			<div className="checkout-c2">
				<div className="gameType-base checkout">
					<h4 className="text-center text-white text-lg mt-3 font-bold">Checkout</h4>
					<div style={{ marginBottom: "30px" }} className="det-base w-t-w">
						{boostType == "rank boost" ? (
							<>
								<Image
									src={`/ranksimages/${result?.gameRanks?.currentRank?.rankImage}`}
									alt="archon rank"
									width={35}
									height={45}
									className=""
								/>
								<span>{`${result?.gameRanks?.currentRank?.rankName} ${result?.gameRanks?.currentRank?.rankStar}`}</span>
								<ArrowBlue />
								<Image
									src={`/ranksimages/${result?.gameRanks?.desiredRank?.rankImage}`}
									alt="archon rank"
									width={35}
									height={45}
									className=""
								/>
								<span>{`${result?.gameRanks?.desiredRank?.rankName} ${result?.gameRanks?.desiredRank?.rankStar}`}</span>
							</>
						) : (
							""
						)}
						{boostType == "rank wins" ? (
							<>
								<Image
									src={`/ranksimages/${result?.gameRankWins?.currentRank?.rankImage}`}
									alt="archon rank"
									width={35}
									height={45}
									className=""
								/>
								<span>{`${result?.gameRankWins?.currentRank?.rankName} ${result?.gameRankWins?.currentRank?.rankStar}`}</span>
								<ArrowBlue />
								<span>
									{`${result?.gameRankWins?.wins}`}
									<span className="wtw-s-span">Wins</span>
								</span>
							</>
						) : (
							""
						)}
						{boostType == "unrated matches" ? (
							<>
								<span>{`Unrated`}</span>
								<ArrowBlue />
								<span>
									{`${result?.gameUnrankedWins}`}
									<span className="wtw-s-span">Wins</span>
								</span>
							</>
						) : (
							""
						)}
						{boostType == "level boost" ? (
							<>
								<span>{`Level ${
									result?.gameLVLrange != undefined ? result?.gameLVLrange[0] : ""
								}`}</span>
								<ArrowBlue />
								<span>{`Level ${
									result?.gameLVLrange != undefined ? result?.gameLVLrange[1] : ""
								}`}</span>
							</>
						) : (
							""
						)}
					</div>
					<div>
						{eo2Result?.op2?.map((item, key) => {
							if (item.optionValue.includes("calc")) return;
							return (
								<div key={key} className="checkoutDetails">
									<span>
										<span className="checkoutDetails-label-t">{`${item.optionName} : `}</span>
										{item.optionContent}
									</span>
									<span className="checkoutDetails-label">
										{item.optionValue}
									</span>
								</div>
							);
						})}
						{eoResult?.op?.map((item, key) => {
							return (
								<div key={key} className="checkoutDetails">
									<span>{titleCase(item.optionName)}</span>
									<span className="checkoutDetails-label">{item.value}</span>
								</div>
							);
						})}
					</div>
					<div style={{ marginTop: "30px" }} className="det-base checkout-time">
						<FontAwesomeIcon icon={faClock} className="t-icon" />
						<span>Completion Time :</span>
						<strong>~ 12 day, 10hrs</strong>
					</div>
					<div className="promo">
						<input placeholder="Promo Code" className="promo-txt" type="text" />
						<input className="promo-btn" type="submit" value="Apply" />
					</div>
					<div className="discount">
						<div>
							{dbData.discount && (
								<>
									<span>Discount :</span>
									<strong>{dbData.discount}%</strong>
								</>
							)}
						</div>
						{/* <div>
              <span>Promo Code :</span>
              <strong>15%</strong>
            </div> */}
					</div>
					<div className="total">
						<span>Total Price :</span>
						<div className="price">
							{dbData.discount && <span>${price}</span>}
							<strong>${discounted}</strong>
						</div>
					</div>
					<div className="flex justify-center">
						<div onClick={handleCheckout} className="checkout-final">
							<span>Checkout (${discounted})</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Checkout;
