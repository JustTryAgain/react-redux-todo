import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { createJWT, decodeToken } from "../../utils/jwt.ts";
import { AppDispatch } from "../../app/store.ts";

export interface AuthenticationState {
  isAuth: boolean;
  userId: string | null;
  isLoading: boolean;
  exp: number | null;
}

const initialState: AuthenticationState = {
  isAuth: false,
  userId: null,
  isLoading: false,
  exp: null
};

export const login = createAsyncThunk(
  "authentication/login",
  async (userId: string, { rejectWithValue }) => {
    try {
      const token = await createJWT({ userId });
      localStorage.setItem("token", token);

      const decoded = await decodeToken(token);

      if (!decoded || !decoded?.payload?.exp) {
        throw new Error("Can't decode token or setup exp timer");
      }

      const exp = decoded.payload.exp * 1000;

      return { userId, exp };
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
      state.userId = null;
      state.isAuth = false;
      state.userId = null;
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
        console.log("userid", action.payload);
        state.userId = action.payload.userId;
        state.exp = action.payload.exp;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        console.log("login.rejected ", action.payload);
      });
  }
});

export const logout = () => (dispatch: AppDispatch) => {
  localStorage.removeItem("token");
  dispatch(authenticationSlice.actions.logout());
};

export default authenticationSlice.reducer;