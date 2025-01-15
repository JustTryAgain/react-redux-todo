import {configureStore} from "@reduxjs/toolkit";
import authenticationReducer from "../features/authentication/authenticationSlice.ts";

const store = configureStore({
  reducer: {
    auth: authenticationReducer,
  },
});

export type AppDispatch = typeof store.dispatch;

export default store;