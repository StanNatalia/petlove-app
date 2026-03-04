import { createSlice } from "@reduxjs/toolkit";
import { addToFavorites, removeFromFavorites } from "./options";
import { loginThunk, logoutThunk, refreshUser } from "../Auth/options";

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: [],
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.items = action.payload.user.noticesFavorites;
      })
      .addCase(refreshUser.fulfilled, (state, action) => {
        state.items = action.payload.noticesFavorites;
      })
      .addCase(addToFavorites.fulfilled, (state, action) => {
        if (!state.items.find((item) => item._id === action.payload._id)) {
          state.items.push(action.payload);
        }
      })
      .addCase(removeFromFavorites.fulfilled, (state, action) => {
        state.items = state.items.filter((item) => item._id !== action.payload);
      })
      .addCase(logoutThunk.fulfilled, (state) => {
        state.items = [];
      });
  },
});

export default favoritesSlice.reducer;
