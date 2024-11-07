"use client";

import { rnk } from "@/app/components/types/Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import presistState from "../../components/presistState";

export type lvlBoostStateType = {
	lvlBoostState: {
		gameName: string;
		gameLVLrange?: number[];
	}[];
};
const [getLocalState, localStateSaver] = presistState("lvlBoostState");
const initialState = {
	lvlBoostState: getLocalState([])!,
} satisfies lvlBoostStateType as lvlBoostStateType;

export const lvlBoostSlice = createSlice({
	name: "lvlBoostState",
	initialState,
	reducers: {
		gameDefiendCheck: (state, action: PayloadAction<string>) => {
			localStateSaver(state.lvlBoostState);
			let isIn = false;
			state.lvlBoostState.forEach((item) => {
				if (item.gameName === action.payload) {
					isIn = true;
				}
			});
			if (!isIn) {
				state.lvlBoostState = [
					...state.lvlBoostState,
					{
						gameName: action.payload,
						gameLVLrange: [],
					},
				];
			}
		},
		lvlRangeChanged: (state, action: PayloadAction<{ game: string; lvlRange: number[] }>) => {
			lvlBoostSlice.caseReducers.gameDefiendCheck(state, {
				payload: action.payload.game,
				type: action.type,
			});
			state.lvlBoostState = state.lvlBoostState.map((item) =>
				item.gameName === action.payload.game
					? {
							...item,
							gameLVLrange: action.payload.lvlRange,
						}
					: item
			);
		},
	},
});

export const { gameDefiendCheck, lvlRangeChanged } = lvlBoostSlice.actions;

export default lvlBoostSlice.reducer;
