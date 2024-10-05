export type op = {
	optionName: string;
	value: string;
};

export type op2 = {
	optionName: string;
	optionContent: string;
	optionValue: string;
};

export type rnk = {
	currentRank: rnkDet | undefined;
	desiredRank: rnkDet | undefined;
};

export type rnkw = {
	currentRank: rnkDet | undefined;
	wins: number | undefined;
};

export type ExtraOptionsState = {
	gameDetails: {
		gameName: string;
		gameOptions?: op[];
		gameOptions2?: op2[];
		gameRanks?: rnk;
		gameRankWins?: rnkw;
		gameUnrankedWins?: number | undefined;
		gameLVLrange?: number[];
	}[];
};

export type rnkDet = {
	rankNumber: number;
	rankImage: string;
	rankName: string;
	rankStar: string;
};

export type mdn = {
	content: string;
	mmr: number;
	img: string;
	pricePerWin: number;
};

export type md = {
	rankName: string;
	rankImg: string;
	rankColor: string;
	rankNums: mdn[];
};

export type boostingOrderJson = {
	maxWins: number;
	ranksData: md[];
	rankMmrShow: [boolean, boolean];
	unrankMaxWins: { wins: number; pricePerWin: number };
	lvlRange: { maxNum: number; dis: number; price: number };
};

export type extraOptionsType = {
	id: string;
	name: string;
	value: string;
	tooltip: string;
}[];

export type options2Type = {
	title: string;
	items: { value: string; content: string }[];
}[];
