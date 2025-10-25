import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

export interface AuthState {
  accessToken: string | null;
}

const initialState: AuthState = { accessToken: null };

const sessionSlice = createSlice({
  name: 'auth',
  initialState,
  selectors: {
    getAccessToken: (state) => state.accessToken,
  },
  reducers: {
    setAccessToken(state, action: PayloadAction<string | null>) {
      state.accessToken = action.payload;
    },
    clearAccessToken(state) {
      state.accessToken = null;
    },
  },
});

export const { setAccessToken, clearAccessToken } = sessionSlice.actions;

export const sessionReducer = sessionSlice.reducer;
