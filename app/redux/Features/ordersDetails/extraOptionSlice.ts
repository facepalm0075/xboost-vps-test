"use client";

import { op, op2, rnk } from "@/app/components/types/Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type extraOptiontStateType = {
	extraOptiontState: {
		gameName: string;
		boostType: string;
		gameOptions?: op[];
		gameOptions2?: op2[];
	}[];
};

const initialState = {
	extraOptiontState: [],
} satisfies extraOptiontStateType as extraOptiontStateType;

export const extraOptiontSlice = createSlice({
	name: "extraOptiontState",
	initialState,
	reducers: {
		gameNTypeDefiendCheck: (
			state,
			action: PayloadAction<{ gameName: string; boostType: string }>
		) => {
			let isIn = false;
			state.extraOptiontState.forEach((item) => {
				if (
					item.gameName === action.payload.gameName &&
					item.boostType === action.payload.boostType
				) {
					isIn = true;
				}
			});
			if (!isIn) {
				state.extraOptiontState = [
					...state.extraOptiontState,
					{
						gameName: action.payload.gameName,
						boostType: action.payload.boostType,
						gameOptions: [],
						gameOptions2: [],
					},
				];
			}
		},
		extraOptionAdded: (
			state,
			action: PayloadAction<{ game: string; type: string; option: op }>
		) => {
			extraOptiontSlice.caseReducers.gameNTypeDefiendCheck(state, {
				payload: { gameName: action.payload.game, boostType: action.payload.type },
				type: action.type,
			});
			state.extraOptiontState = state.extraOptiontState.map((item) => {
				if (
					item.gameName === action.payload.game &&
					item.boostType === action.payload.type
				) {
					let arr = [action.payload.option];
					if (item.gameOptions) {
						arr = [...item.gameOptions, action.payload.option];
					}
					return {
						...item,
						gameOptions: arr,
					};
				} else {
					return item;
				}
			});
		},
		extraOptionRemoved: (
			state,
			action: PayloadAction<{ game: string; type: string; optionName: string }>
		) => {
			state.extraOptiontState = state.extraOptiontState.map((item) => {
				if (
					item.gameName === action.payload.game &&
					item.boostType === action.payload.type
				) {
					let removed = item.gameOptions?.filter(
						(item) => item.optionName != action.payload.optionName
					);
					return {
						...item,
						gameOptions: removed,
					};
				} else {
					return item;
				}
			});
		},
		option2Changed: (
			state,
			action: PayloadAction<{
				game: string;
				type: string;
				items: {
					optionName: string;
					optionContent: string;
					optionValue: string;
				}[];
			}>
		) => {
			state.extraOptiontState = state.extraOptiontState.map((item) => {
				if (
					item.gameName === action.payload.game &&
					item.boostType === action.payload.type
				) {
					let arr = action.payload.items;
					return {
						...item,
						gameOptions2: arr,
					};
				} else {
					return item;
				}
			});
		},
	},
});

export const { extraOptionAdded, extraOptionRemoved, gameNTypeDefiendCheck, option2Changed } =
	extraOptiontSlice.actions;

export default extraOptiontSlice.reducer;
