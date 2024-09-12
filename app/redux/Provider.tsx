"use client";
import { useRef } from "react";
import { Provider } from "react-redux";
import { makeStore, AppStore } from "./store";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";

export default function StoreProvider({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const store = makeStore();
  const persistor = persistStore(store);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {children}
      </PersistGate>
    </Provider>
  );
}
