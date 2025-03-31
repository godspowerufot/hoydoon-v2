import { configureStore } from "@reduxjs/toolkit";
import authApi from "./slices/api/authapi";
import authReducer from "./slices/authslice";
export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    // ✅ Add listing slice reducer
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat( authApi.middleware),
  devTools: true,
});

export default store;
