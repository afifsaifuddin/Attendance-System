import { configureStore } from "@reduxjs/toolkit";
import AuthReducer from "./AuthReducer";
import HistoryReducer from "./historyREducer";

export const store = configureStore({
  reducer: {
    AuthReducer: AuthReducer,
    HistoryReducer: HistoryReducer,
  },
});
