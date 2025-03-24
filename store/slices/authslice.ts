import { createSlice } from '@reduxjs/toolkit';
import { getAccessToken, removeTokens } from '@/utils/cookies';

const initialState = {
  isAuthenticated: !!getAccessToken(),
  user: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
      removeTokens();
    },
  },
});

export const { setUser, logout } = authSlice.actions;
export default authSlice.reducer;
