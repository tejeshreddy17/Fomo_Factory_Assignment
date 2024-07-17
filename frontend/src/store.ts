import { configureStore } from "@reduxjs/toolkit";
import stockCryptoReducer from "./features/slice";

const store = configureStore({
  reducer: {
    stockCrypto: stockCryptoReducer,
  },
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
