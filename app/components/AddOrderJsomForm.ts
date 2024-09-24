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

	return {
		gameName: gameName,
		boostType: boostType,
		credential: inputData,
		boostDetails: {
			currentRank: result.gameRanks?.currentRank?.rankNumber,
			desiredRank: result.gameRanks?.desiredRank?.rankNumber,
			dropDownOptions: ddVar,
			toggleOptions: toVar,
		},
	};
};
