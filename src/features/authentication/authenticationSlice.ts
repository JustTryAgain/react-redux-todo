import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createJWT, decodeToken, expiresIn } from "../../utils/jwt.ts";
import { RootState } from "../../app/store.ts";

export interface AuthenticationState {
  isAuth: boolean;
  userId: string | null;
  isLoading: boolean;
  userName: string | null;
}

const initialState: AuthenticationState = {
  isAuth: false,
  userId: null,
  isLoading: false,
  userName: null
};

type LoginPayload = { userId: string; userName: string };

export const login = createAsyncThunk(
  "authentication/login",
  async ({ userId, userName }: LoginPayload, { rejectWithValue }) => {
    try {
      const token = await createJWT({ userId, userName });
      // min
      const exp = new Date(Date.now() + expiresIn * 60 * 1000).getTime()

      localStorage.setItem("token", token);
      return { userId, exp, userName };
    } catch (error: any) {
      console.warn(error.message);
      return rejectWithValue(error);
    }
  }
);

export const auth = createAsyncThunk(
  "authentication/auth",
  async (_, { rejectWithValue }) => {
    try {
      const token = localStorage.getItem("token");

      if (!token) {
        throw Error("No token, need to login");
      }

      const decoded = await decodeToken(token);

      if (!decoded || !decoded?.payload?.exp) {
        throw new Error("Can't decode token");
      }

      const exp = decoded.payload.exp * 1000;
      const userId = decoded.payload.userId as string;
      const userName = decoded.payload.userName as string;
      return { exp, userId, userName };
    } catch (error: any) {
      console.warn(error.message);
      return rejectWithValue(error);
    }
  }
);

export const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: state => {
      state.isAuth = false;
      state.userId = null;
      state.userName = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        console.log("login", action.payload);
        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        console.log("login.rejected ", action.payload);
      })

      .addCase(auth.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(auth.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isAuth = true;
        console.log("auth", action.payload);
        state.userId = action.payload.userId;
        state.userName = action.payload.userName;
      })
      .addCase(auth.rejected, (state, action) => {
        state.isLoading = false;
        console.log("auth.rejected ", action.payload);
      });
  }
});

export const selectIsAuth = (state: RootState) => state.auth.isAuth;
export const selectUserId = (state: RootState) => state.auth.userId;
export const selectUserName = (state: RootState) => state.auth.userName;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;

export const { logout } = authenticationSlice.actions;
export default authenticationSlice.reducer;