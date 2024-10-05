"use client";

import { rnk } from "@/app/components/types/Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type rankBoostStateType = {
	rankBoostState: {
		gameName: string;
		gameRanks?: rnk;
	}[];
};

const initialState = {
	rankBoostState: [],
} satisfies rankBoostStateType as rankBoostStateType;

export const rankBoostSlice = createSlice({
	name: "rankBoostState",
	initialState,
	reducers: {
		gameDefiendCheck: (state, action: PayloadAction<string>) => {
			let isIn = false;
			state.rankBoostState.forEach((item) => {
				if (item.gameName === action.payload) {
					isIn = true;
				}
			});
			if (!isIn) {
				state.rankBoostState = [
					...state.rankBoostState,
					{
						gameName: action.payload,
						gameRanks: { currentRank: undefined, desiredRank: undefined },
					},
				];
			}
		},		
		rankChanged: (state, action: PayloadAction<{ game: string; ranks: rnk }>) => {
			rankBoostSlice.caseReducers.gameDefiendCheck(state, {
				payload: action.payload.game,
				type: action.type,
			});
			state.rankBoostState = state.rankBoostState.map((item) =>
				item.gameName === action.payload.game
					? {
							...item,
							gameRanks: action.payload.ranks,
						}
					: item
			);
		},
	},
});

export const {
	gameDefiendCheck,
	rankChanged,
} = rankBoostSlice.actions;

export default rankBoostSlice.reducer;
