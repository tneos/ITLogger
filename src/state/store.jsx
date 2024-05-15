import {configureStore} from "@reduxjs/toolkit";
import logReducer from "../state/log/logSlice";

export const store = configureStore({
  reducer: {
    log: logReducer,
  },
});
