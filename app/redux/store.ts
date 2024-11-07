"use client";
import { configureStore } from "@reduxjs/toolkit";
import gameDetails from "./Features/extraOptions/gameDetailsSlice";
import rankBoostSlice from "./Features/ordersDetails/rankBoostSlice";
import extraOptionSlice from "./Features/ordersDetails/extraOptionSlice";
import rankWinsSlice from "./Features/ordersDetails/rankWinsSlice";
import lvlBoost from "./Features/ordersDetails/lvlBoost";
import notificationSlice from "./Features/notifications/notificationSlice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

const reducer = combineReducers({
	gameDetails,
	rankBoostSlice,
	extraOptionSlice,
	rankWinsSlice,
	lvlBoost,
	notificationSlice,
});

export const makeStore = () => {
	return configureStore({
		reducer: reducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware({
				actionCreatorCheck: false,
				thunk: false,
				serializableCheck: false,
				immutableCheck: false,
			}),
		devTools: false,
	});
};
export const store = makeStore();
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
