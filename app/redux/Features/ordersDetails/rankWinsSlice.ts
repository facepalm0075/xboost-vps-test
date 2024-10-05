"use client";

import { rnk, rnkw } from "@/app/components/types/Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type rankWinsStateType = {
	rankWinsState: {
		gameName: string;
		gameRankWins?: rnkw;
	}[];
};

const initialState = {
	rankWinsState: [],
} satisfies rankWinsStateType as rankWinsStateType;

export const rankWinsSlice = createSlice({
	name: "rankWinsState",
	initialState,
	reducers: {
		gameDefiendCheck: (state, action: PayloadAction<string>) => {
			let isIn = false;
			state.rankWinsState.forEach((item) => {
				if (item.gameName === action.payload) {
					isIn = true;
				}
			});
			if (!isIn) {
				state.rankWinsState = [
					...state.rankWinsState,
					{
						gameName: action.payload,
						gameRankWins:{currentRank:undefined,wins:undefined}
					},
				];
			}
		},		
		rankWinsChanged: (
      state,
      action: PayloadAction<{ game: string; rankNwin: rnkw }>
    ) => {
      rankWinsSlice.caseReducers.gameDefiendCheck(state, {
        payload: action.payload.game,
        type: action.type,
      });
      state.rankWinsState = state.rankWinsState.map((item) =>
        item.gameName === action.payload.game
          ? {
              ...item,
              gameRankWins: action.payload.rankNwin,
            }
          : item
      );
    },
	},
});

export const {
	gameDefiendCheck,
	rankWinsChanged,
} = rankWinsSlice.actions;

export default rankWinsSlice.reducer;
