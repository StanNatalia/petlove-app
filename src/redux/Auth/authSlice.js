import { createSlice } from "@reduxjs/toolkit";
import { loginThunk, logoutThunk, registerThunk } from "./options";

const initialState = {
  user: {
    name: "",
    email: "",
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
      .addCase(logoutThunk.fulfilled, () => initialState);
  },
});
export const { removeUser } = userSlice.actions;
export const authReducer = userSlice.reducer;
