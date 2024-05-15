import {configureStore} from "@reduxjs/toolkit";
import logReducer from "../state/log/logSlice";
import techReducer from "../state/tech/techSlice";

export const store = configureStore({
  reducer: {
    log: logReducer,
    tech: techReducer,
  },
});
