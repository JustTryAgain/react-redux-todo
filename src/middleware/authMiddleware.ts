import { Middleware } from "@reduxjs/toolkit";
import { auth, login, logout } from "../features/authentication/authenticationSlice.ts";

let logoutTimer: number | null = null;

export const authMiddleware: Middleware = (store) => (next) => (action) => {
  if (login.fulfilled.match(action) || auth.fulfilled.match(action)) {
    const { exp } = action.payload;

    const timeUntilLogout = exp - Date.now();

    if (logoutTimer) {
      clearTimeout(logoutTimer);
    }

    logoutTimer = setTimeout(() => {
      store.dispatch(logout());
    }, timeUntilLogout);
  }

  if (logout.match(action)) {
    if (logoutTimer) {
      clearTimeout(logoutTimer);
      logoutTimer = null;
    }
    localStorage.removeItem("token");
  }

  return next(action);
};