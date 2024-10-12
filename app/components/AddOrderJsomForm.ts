import { slce } from "../(main)/services/[gameId]/boosting/[boostType]/Checkout";

type prop = {
	gameName: string;
	boostType: string;
	inputData: string;
	result: slce;
};

export const addOrderJsonForm = ({ gameName, boostType, inputData, result }: prop) => {
	const ddVar = result.gameOptions2?.map((item1) => {
		return { optionName: item1.optionName, optionContent: item1.optionContent };
	});
	const toVar = result.gameOptions?.map((item2) => {
		return { optionName: item2.optionName };
	});

	let details = {};
	if (boostType === "rank boost") {
		details = {
			currentRank: result.gameRanks?.currentRank?.rankNumber,
			desiredRank: result.gameRanks?.desiredRank?.rankNumber,
			dropDownOptions: ddVar,
			toggleOptions: toVar,
		};
	} else if (boostType === "rank wins") {
		details = {
			currentRank: result.gameRankWins?.currentRank?.rankNumber,
			rankWins: result.gameRankWins?.wins,
			dropDownOptions: ddVar,
			toggleOptions: toVar,
		};
	} else if (boostType === "level boost") {
		if (result.gameLVLrange) {
			details = {
				currentLevel: result.gameLVLrange[0],
				desiredLevel: result.gameLVLrange[1],
				dropDownOptions: ddVar,
				toggleOptions: toVar,
			};
		}
	}

	console.log({
		gameName: gameName,
		boostType: boostType,
		credential: inputData,
		boostDetails: details,
	});
	return {
		gameName: gameName,
		boostType: boostType,
		credential: inputData,
		boostDetails: details,
	};
};
