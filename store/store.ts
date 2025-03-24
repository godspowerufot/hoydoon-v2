import { configureStore } from '@reduxjs/toolkit';
import authApi  from "./slices/api/authapi"
import authReducer from './slices/authslice';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});

export default store;
