import { dbRes } from "@/app/(main)/services/[gameId]/boosting/[boostType]/page";
import {
	addOrderRequestType,
	dropDownOptionsOrderDetailsType,
	rankBoostOrderDetailsType,
	toggleOptionsOrderDetailsType,
} from "../route";
import { extraOptionsType, md, options2Type } from "@/app/components/types/Types";

const calcPrice = (requestData: addOrderRequestType, boostType: string, dbitems: any) => {
	// changing db reesponse type
	const res: dbRes = dbitems! as unknown as dbRes;

	switch (boostType) {
		case "rank boost":
			return rankBoostPrice(requestData.boostDetails, res);

		default:
			return "error";
	}
};

const rankBoostPrice = (requestData: rankBoostOrderDetailsType, dbData: dbRes) => {
	// option applyer function
	const applyer = (basePrice: number) => {
		const optionsPrice = dropNtogglePrice(
			basePrice,
			requestData.dropDownOptions,
			dbData.extraOptions2,
			requestData.toggleOptions,
			dbData.extraOptions
		);
		return Number(discountCalc(optionsPrice, dbData.discount).toFixed(2));
	};

	const ranksData = dbData.Data.ranksData;
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

			if (item2.mmr + nextRankDiff - 1 >= requestData.currentRank) {
				if (item2.mmr < requestData.desiredRank) {
					// calcing between ranks for current mmr
					if (!loopStart) {
						const mmrDiff = requestData.currentRank - item2.mmr;
						const calc = (item2.pricePerWin / nextRankDiff) * mmrDiff;
						basePrice -= calc;
						loopStart = true;
					}

					// calcing between ranks for desired mmr
					const more = requestData.desiredRank - item2.mmr;
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
	return applyer(basePrice);
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

export default calcPrice;
