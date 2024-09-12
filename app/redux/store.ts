"use client";
import { configureStore } from "@reduxjs/toolkit";
import gameDetails from "./Features/extraOptions/gameDetailsSlice";
import { persistReducer } from "redux-persist";
import { combineReducers } from "@reduxjs/toolkit";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { WebStorage } from "redux-persist/lib/types";

export function createPersistStorage(): WebStorage {
  const isServer = typeof window === "undefined";

  // Returns noop (dummy) storage.
  if (isServer) {
    return {
      getItem() {
        return Promise.resolve(null);
      },
      setItem() {
        return Promise.resolve();
      },
      removeItem() {
        return Promise.resolve();
      },
    };
  }

  return createWebStorage("local");
}

const storage = createPersistStorage();

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const reducer = combineReducers({
  gameDetails,
});

const persistedReducer = persistReducer(persistConfig, reducer);

export const makeStore = () => {
  return configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        actionCreatorCheck: false,
        thunk: false,
        serializableCheck: false,
        immutableCheck: false,
      }),
  });
};
export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
