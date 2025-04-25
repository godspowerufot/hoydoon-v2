import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getAccessToken, removeTokens } from '@/utils/cookies';

interface AuthState {
  isAuthenticated: boolean;
  user: any; // You can replace `any` with your actual user type
  unverifiedEmail: string | null;
}

const initialState: AuthState = {
  isAuthenticated: !!getAccessToken(),
  user: null,
  unverifiedEmail: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<any>) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      state.unverifiedEmail = null;
      removeTokens();
    },
    setUnverifiedEmail: (state, action: PayloadAction<string>) => {
      state.unverifiedEmail = action.payload;
    },
    clearUnverifiedEmail: (state) => {
      state.unverifiedEmail = null;
    },
  },
});

export const { setUser, logout, setUnverifiedEmail, clearUnverifiedEmail } = authSlice.actions;
export default authSlice.reducer;
