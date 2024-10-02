"use client";

import { RightARROW } from "../svgs";

import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import { gameDefiendCheck, rankChanged } from "@/app/redux/Features/extraOptions/gameDetailsSlice";
import RankSelect from "./RankSelect";
import { rnkDet, md } from "@/app/components/types/Types";
import { useEffect } from "react";

type mainProps = {
	gameN: string;
	data: md[];
	rankMmrShow: [boolean, boolean];
};

const getNext = (cr: number, data: md[]) => {
	let counter = 0;
	let lastRank = {
		rankNumber: 0,
		rankImage: "",
		rankName: "",
		rankStar: "",
	};
	let nextRank = {
		rankNumber: 0,
		rankImage: "",
		rankName: "",
		rankStar: "",
	};
	let Result = {
		rankNumber: 0,
		rankImage: "",
		rankName: "",
		rankStar: "",
	};
	data.map((item) => {
		item.rankNums.map((item2: any) => {
			if (item2.mmr !== undefined) {
				if (item2.mmr <= cr) {
				} else {
					if (counter == 0) {
						nextRank.rankNumber = item2.mmr;
						nextRank.rankImage = item2.img;
						nextRank.rankName = item.rankName;
						nextRank.rankStar = item2.content;
						counter = 1;
					}
				}
				lastRank.rankNumber = item2.mmr;
				lastRank.rankImage = item2.img;
				lastRank.rankName = item.rankName;
				lastRank.rankStar = item2.content;
			}
		});
	});
	if (counter == 1) {
		Result = {
			rankNumber: nextRank.rankNumber,
			rankImage: nextRank.rankImage,
			rankName: nextRank.rankName,
			rankStar: nextRank.rankStar,
		};
	} else {
		Result = {
			rankNumber: lastRank.rankNumber + 1,
			rankImage: lastRank.rankImage,
			rankName: lastRank.rankName,
			rankStar: lastRank.rankStar,
		};
	}
	return Result;
};

export default function DesiredRank({ gameN, data, rankMmrShow }: mainProps) {
	const mainNameer = useAppSelector((state) => state.gameDetails);
	const nameer = mainNameer.gameDetails;

	const dispatch = useAppDispatch();
	const initVal = {
		currentRank: {
			rankNumber: data[0].rankNums[0].mmr,
			rankImage: data[0].rankNums[0].img,
			rankName: data[0].rankName,
			rankStar: data[0].rankNums[0].content,
		},
		desiredRank: {
			rankNumber: data[data.length - 1].rankNums[0].mmr,
			rankImage: data[data.length - 1].rankNums[0].img,
			rankName: data[data.length - 1].rankName,
			rankStar: data[data.length - 1].rankNums[0].content,
		},
	};
	useEffect(() => {
		nameer.map((item) => {
			if (item.gameName === gameN) {
				if (!item.gameRanks) {
					dispatch(rankChanged({ game: gameN, ranks: initVal }));
				} else if (!item.gameRanks.currentRank) {
					dispatch(rankChanged({ game: gameN, ranks: initVal }));
				}
			}
		});
	});

	const mainCurrentHandler = (item: rnkDet) => {
		let des = initVal.desiredRank;
		nameer.map((item) => {
			if (item.gameName === gameN) {
				const fix = item.gameRanks?.desiredRank!;
				des = fix;
			}
		});
		if (item.rankNumber >= des.rankNumber) {
			des = getNext(item.rankNumber, data);
		}
		dispatch(
			rankChanged({
				game: gameN,
				ranks: { currentRank: item, desiredRank: des },
			})
		);
	};

	const mainDesiredHandler = (item: rnkDet) => {
		let des = initVal.currentRank;
		nameer.map((item) => {
			if (item.gameName === gameN) {
				const fix = item.gameRanks?.currentRank!;
				des = fix!;
			}
		});
		if (item.rankNumber > des.rankNumber) {
			dispatch(
				rankChanged({
					game: gameN,
					ranks: { currentRank: des, desiredRank: item },
				})
			);
		} else {
			dispatch(
				rankChanged({
					game: gameN,
					ranks: {
						currentRank: des,
						desiredRank: getNext(des.rankNumber, data),
					},
				})
			);
		}
	};

	const getCurrentRankValue = () => {
		let res = initVal.desiredRank.rankNumber;
		nameer.map((item) => {
			if (item.gameName === gameN) {
				const fix = item.gameRanks?.currentRank?.rankNumber!;
				res = fix;
			}
		});
		return res;
	};

	return (
		<div className="flex items-center">
			<div className="w-1/2">
				<RankSelect
					currentChanged={mainCurrentHandler}
					name={gameN}
					data={data}
					type="current"
					mmrEnabled={rankMmrShow[0]}
					desiredChanged={() => {}}
					mainNameer={mainNameer}
					lastRank={false}
				/>
			</div>
			<div className="selectRank-arrow">
				<RightARROW />
			</div>
			<div className="w-1/2">
				<RankSelect
					desiredChanged={mainDesiredHandler}
					currentChanged={() => {}}
					name={gameN}
					data={data}
					type="desired"
					mmrEnabled={rankMmrShow[1]}
					disables={getCurrentRankValue()}
					mainNameer={mainNameer}
					lastRank={true}
				/>
			</div>
		</div>
	);
}
