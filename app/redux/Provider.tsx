"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore, store } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function StoreProvider({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <Provider store={store}>{children}</Provider>;
}
