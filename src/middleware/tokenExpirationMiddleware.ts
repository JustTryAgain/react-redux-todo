export const tokenExpirationMiddleware = (store) => (next) => (action) => {
  // Pass the action along to the reducers
  const result = next(action);

  // Get the current token from the state
  const state = store.getState();
  const token = state.auth.token;

  if (token) {
    const decodedToken = parseJwt(token); // Custom function to decode JWT
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds

    if (decodedToken.exp < currentTime) {
      console.warn("Token expired. Logging out...");
      store.dispatch({ type: "auth/logout" });
    }
  }

  return result;
};


// if (action.type === "authentication/login") {
//     const { token } = action.payload;
//     const decoded = decodeToken(token);
//
//     if (decoded) {
//       const timeToExpire = decoded.exp * 1000 - Date.now();
//
//       if (timeToExpire > 0) {
//         setTimeout(() => {
//           storeAPI.dispatch(logout()); // Логаут пользователя при истечении токена
//           localStorage.removeItem("token");
//         }, timeToExpire);
//       }
//     }
//   }
//
//   return next(action);



// export const checkLogin = createAsyncThunk(
//   "authentication/checkLogin",
//   async (_, { rejectWithValue }) => {
//     try {
//       const token = localStorage.getItem("token");
//
//       if (!token) {
//         throw new Error("No token found");
//       }
//
//       const isValid = await validateToken(token);
//
//       if (!isValid) {
//         throw new Error("Invalid token");
//       }
//
//       return token;
//     } catch (error: any) {
//       return rejectWithValue(error.message);
//     }
//   }
// );