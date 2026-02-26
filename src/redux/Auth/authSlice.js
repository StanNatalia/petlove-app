import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshUser,
  registerThunk,
  editUser,
} from "./options";

const initialState = {
  user: {
    name: "",
    email: "",
    avatar: "",
    phone: "",
  },
  token: "",
  isLoggedIn: false,
};

const userSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    removeUser() {
      return initialState;
    },
    setToken(state, action) {
      state.token = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = {
          name: action.payload.name,
          email: action.payload.email,
        };
        state.token = action.payload.token;
        state.isLoggedIn = true;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
      })
      .addCase(logoutThunk.fulfilled, () => initialState)
      .addCase(editUser.fulfilled, (state, action) => {
        state.user = { ...state.user, ...action.payload };
      });
  },
});
export const { removeUser } = userSlice.actions;
export const authReducer = userSlice.reducer;
