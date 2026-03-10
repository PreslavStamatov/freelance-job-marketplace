import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { User, UserState } from '../models/userTypes';

const initialState: UserState = (() => {
  const user = localStorage.getItem("user");
  const jwt = localStorage.getItem("accessToken");

  if (user && jwt) {
    return {
      user: JSON.parse(user),
      jwt,
      isAuthenticated: true,
      isLoading: false
    };
  }

  return {
    user: null,
    jwt: null,
    isAuthenticated: false,
    isLoading: false
  };
})();

interface LoginPayload {
  user: User; 
  jwt: string;
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action: PayloadAction<LoginPayload>) => {
      state.user = action.payload.user;
      state.jwt = action.payload.jwt;
      state.isAuthenticated = true;
    },

    logout: (state) => {
      state.user = null;
      state.jwt = null;
      state.isAuthenticated = false;
      
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
    },

    updateUser: (state, action: PayloadAction<User>) => {
      if (state.user) {
        state.user = action.payload;
        localStorage.setItem("user", JSON.stringify(action.payload));
      }
    },

    updateAccessToken: (state, action: PayloadAction<string>) => {
      if (state.jwt) {
        state.jwt = action.payload;
        localStorage.setItem("accessToken", action.payload);
      }
    }
  },
});

export const { loginSuccess, logout, updateUser, updateAccessToken } = userSlice.actions;

export default userSlice.reducer;