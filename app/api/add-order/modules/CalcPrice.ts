import { dbRes } from "@/app/(main)/services/[gameId]/boosting/[boostType]/page";
import {
	addOrderRequestType,
	dropDownOptionsOrderDetailsType,
	levelBoostOrderDetailsType,
	rankBoostOrderDetailsType,
	rankWinsOrderDetailsType,
	toggleOptionsOrderDetailsType,
} from "../route";
import { extraOptionsType, options2Type } from "@/app/components/types/Types";

const calcPrice = (requestData: addOrderRequestType, boostType: string, dbitems: any) => {
	// changing db reesponse type
	const res: dbRes = dbitems! as unknown as dbRes;
	const req2 = requestData.boostDetails;

	// option applyer function
	const applyer = (basePrice: number) => {
		let optionsPrice = dropNtogglePrice(
			basePrice,
			req2.dropDownOptions,
			res.extraOptions2,
			req2.toggleOptions,
			res.extraOptions
		);
		optionsPrice = Number(optionsPrice.toFixed(2));
		return Number(discountCalc(optionsPrice, res.discount).toFixed(2));
	};

	const rankBoostPrice = (
		requestData: rankBoostOrderDetailsType,
		dbData: dbRes,
		amount: number,
		gain: number
	) => {
		const ranksData = dbData.Data.ranksData;
		let requestData2 = {
			currentRank: requestData.currentRank,
			desiredRank: requestData.desiredRank,
		};
		requestData2.currentRank += amount;
		let basePrice = 0;
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

				if (item2.mmr + nextRankDiff - 1 >= requestData2.currentRank) {
					if (item2.mmr < requestData2.desiredRank) {
						// calcing between ranks for current mmr
						if (!loopStart) {
							const mmrDiff = requestData2.currentRank - item2.mmr;
							const calc = (item2.pricePerWin / nextRankDiff) * mmrDiff;
							basePrice -= calc;
							loopStart = true;
						}

						// calcing between ranks for desired mmr
						const more = requestData2.desiredRank - item2.mmr;
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
		return (basePrice * gain) / 100;
	};

	// calcing rank wins price
	const rankWinsPrice = (requestData: rankWinsOrderDetailsType, dbData: dbRes) => {
		let basePrice = 0;
		dbData.Data.ranksData.forEach((item) => {
			item.rankNums.forEach((item2) => {
				if (item2.mmr === requestData.currentRank) {
					basePrice = requestData.rankWins! * item2.pricePerWin;
				}
			});
		});
		return basePrice;
	};

	// calcing level boost price
	const levelBoostPrice = (requestData: levelBoostOrderDetailsType, dbData: dbRes) => {
		let basePrice =
			(requestData.desiredLevel - requestData.currentLevel) * dbData.Data.lvlRange.price;
		return basePrice;
	};

	// calc discount
	const discountCalc = (item: number, dbDiscount: number | null) => {
		if (dbDiscount) {
			const discount = (item * dbDiscount) / 100;
			return item - discount;
		}
		return item;
	};

	const dropNtogglePrice = (
		basePrice: number,
		requestDataDropDownOptions: dropDownOptionsOrderDetailsType[],
		dbDataExtraOptions2: options2Type,
		requestDataToggleOptions: toggleOptionsOrderDetailsType[],
		dbDataExtraOptions: extraOptionsType
	) => {
		// drop down calc
		let dropCalc = 0;
		requestDataDropDownOptions.forEach((item) => {
			if (item.optionName.includes("Gain")) {
			} else if (item.optionName.includes("Amount")) {
			} else {
				dbDataExtraOptions2.forEach((item2) => {
					if (item.optionName === item2.title) {
						item2.items.forEach((item3) => {
							if (item3.content === item.optionContent) {
								if (item3.value.includes("%")) {
									const val = item3.value.replace("%", "");
									dropCalc += (basePrice * Number(val)) / 100;
								} else if (item3.value.includes("$")) {
									const val = item3.value.replace("$", "");
									dropCalc += Number(val);
								}
							}
						});
					}
				});
			}
		});

		// toggle calc
		let toggleCalc = 0;
		requestDataToggleOptions.forEach((item) => {
			dbDataExtraOptions.forEach((item2) => {
				if (item.optionName === item2.name) {
					if (item2.value.includes("%")) {
						const val = item2.value.replace("%", "");
						toggleCalc += (basePrice * Number(val)) / 100;
					} else if (item2.value.includes("$")) {
						const val = item2.value.replace("$", "");
						toggleCalc += Number(val);
					}
				}
			});
		});

		return dropCalc + toggleCalc + basePrice;
	};

	switch (boostType) {
		case "rank boost":
			const req = requestData.boostDetails as unknown as rankBoostOrderDetailsType;

			let amount = 0;
			let gain = 100;
			req.dropDownOptions.forEach((item) => {
				// calcing amount
				if (item.optionName.includes("Amount")) {
					res.extraOptions2.forEach((item2) => {
						if (item2.title === item.optionName) {
							item2.items.forEach((item3) => {
								if (item.optionContent === item3.content) {
									amount = Number(item3.value.replace("calcA", ""));
								}
							});
						}
					});
					// calcing gain
				} else if (item.optionName.includes("Gain")) {
					res.extraOptions2.forEach((item2) => {
						if (item2.title === item.optionName) {
							item2.items.forEach((item3) => {
								if (item.optionContent === item3.content) {
									let option = item3.value.replace("calcG", "");
									if (option.includes("%")) {
										gain = Number(option.replace("%", ""));
									}
								}
							});
						}
					});
				}
			});
			return applyer(rankBoostPrice(requestData.boostDetails, res, amount, gain));
		case "rank wins":
			return applyer(rankWinsPrice(requestData.boostDetails, res));
		case "level boost":
			return applyer(levelBoostPrice(requestData.boostDetails, res));
		default:
			return "error";
	}
};

export default calcPrice;
