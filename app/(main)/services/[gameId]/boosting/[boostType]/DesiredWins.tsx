"use client";
import { md, rnkDet } from "@/app/components/types/Types";
import RankSelect from "./RankSelect";
import SelectWins from "./SelectWins";
import { BoostingPage, RightARROW } from "../svgs";
import { useAppSelector, useAppDispatch } from "@/app/redux/hooks";
import {
	gameDefiendCheck,
	rankWinsChanged,
} from "@/app/redux/Features/ordersDetails/rankWinsSlice";
import { useEffect, useState } from "react";
import React from "react";

type mainProps = {
	gameN: string;
	data: md[];
	maxWins: number;
};

function DesiredWins({ gameN, data, maxWins }: mainProps) {
	const mainNameer = useAppSelector((state) => state.rankWinsSlice);
	const nameer = mainNameer.rankWinsState;

	let rank = 0;
	nameer.forEach((item) => {
		if (item.gameName === gameN) {
			rank = item.gameRankWins?.currentRank?.rankNumber!;
		}
	});
	let number = 0;
	nameer.map((item) => {
		if (item.gameName === gameN) {
			number = item.gameRankWins?.wins!;
		}
	});
	const dispatch = useAppDispatch();

	const CurrentHandler = (item: rnkDet) => {
		let currentGame: number = 1;
		nameer.map((item) => {
			if (item.gameName === gameN) {
				currentGame = item.gameRankWins?.wins!;
			}
		});

		dispatch(
			rankWinsChanged({
				game: gameN,
				rankNwin: {
					currentRank: item,
					wins: currentGame,
				},
			})
		);
	};
	const winHandler = (num: number) => {
		let currentGame2: rnkDet = {
			rankNumber: 10,
			rankImage: "string",
			rankName: "string",
			rankStar: "string",
		};
		nameer.map((item) => {
			if (item.gameName === gameN) {
				currentGame2 = item.gameRankWins?.currentRank!;
			}
		});

		dispatch(
			rankWinsChanged({
				game: gameN,
				rankNwin: {
					currentRank: currentGame2,
					wins: num,
				},
			})
		);
	};
	const initVal = {
		currentRank: {
			rankNumber: data[0].rankNums[0].mmr,
			rankImage: data[0].rankNums[0].img,
			rankName: data[0].rankName,
			rankStar: data[0].rankNums[0].content,
		},
		wins: 1,
	};

	useEffect(() => {
		dispatch(gameDefiendCheck(gameN));
		nameer.map((item) => {
			if (item.gameName === gameN) {
				if (!item.gameRankWins) {
					dispatch(rankWinsChanged({ game: gameN, rankNwin: initVal }));
				} else if (!item.gameRankWins.currentRank) {
					dispatch(rankWinsChanged({ game: gameN, rankNwin: initVal }));
				}
			}
		});
	});

	return (
		<div className="flex items-center">
			<div className="w-1/2">
				<RankSelect
					currentChanged={CurrentHandler}
					data={data}
					type="current"
					mmrEnabled={false}
					desiredChanged={() => {}}
					lastRank={true}
					rankNumber={rank}
				/>
			</div>
			<div className="selectRank-arrow">
				<RightARROW />
			</div>
			<div className="w-1/2">
				<div className="gameType-base win-select">
					<div className="flex items-center win-select-title">
						<BoostingPage />
						<div className="ml-3">
							<h3>Wins Amount</h3>
							<p>Select the number of desired wins</p>
						</div>
					</div>
					<div className="h-16"></div>
					<SelectWins
						maxNum={maxWins}
						cNum={number}
						name={gameN}
						numberChanged={winHandler}
					/>
				</div>
			</div>
		</div>
	);
}

export default DesiredWins;
