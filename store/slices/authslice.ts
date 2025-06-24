import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAccessToken, removeTokens } from "@/utils/cookies";

interface AuthState {
  isAuthenticated: boolean;
  user: any;
  unverifiedEmail: string | null;
  unverifiedOtp: string | null; // 👈 ADD THIS
}

const initialState: AuthState = {
  isAuthenticated: !!getAccessToken(),
  user: null,
  unverifiedEmail: null,
  unverifiedOtp: null, // 👈 INITIAL VALUE
};

const authSlice = createSlice({
  name: "auth",
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
      state.unverifiedOtp = null; // 👈 clear OTP too
      removeTokens();
    },
    setUnverifiedEmail: (state, action: PayloadAction<string>) => {
      state.unverifiedEmail = action.payload;
    },
    setUnverifiedOtp: (state, action: PayloadAction<string>) => {
      state.unverifiedOtp = action.payload; // 👈 SET OTP
    },
    clearUnverifiedEmail: (state) => {
      state.unverifiedEmail = null;
    },
    clearUnverifiedOtp: (state) => {
      state.unverifiedOtp = null;
    },
  },
});

export const {
  setUser,
  logout,
  setUnverifiedEmail,
  setUnverifiedOtp, // 👈 export it
  clearUnverifiedEmail,
  clearUnverifiedOtp, // 👈 export clear too
} = authSlice.actions;

export default authSlice.reducer;
