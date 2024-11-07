"use client";

import { notifications, op, op2, rnk } from "@/app/components/types/Types";
import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import presistState from "../../components/presistState";

export type notificationStateType = {
	notificationState: notifications;
};

const [getLocalState, localStateSaver] = presistState("notificationState");

const initialState = {
	notificationState: getLocalState([])!,
} satisfies notificationStateType as notificationStateType;

export const notificationSlice = createSlice({
	name: "notificationState",
	initialState,
	reducers: {
		notificationChanged: (
			state,
			action: PayloadAction<{
				state: notifications;
			}>
		) => {
			localStateSaver(state.notificationState);
			state.notificationState = action.payload.state;
		},
	},
});

export const { notificationChanged } = notificationSlice.actions;

export default notificationSlice.reducer;
