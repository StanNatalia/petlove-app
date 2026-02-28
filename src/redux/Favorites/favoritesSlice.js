import { createSlice } from "@reduxjs/toolkit";
import { logoutThunk } from "../Auth/options";

const getInitialFavorites = () => {
  const saved = localStorage.getItem("favorites");
  return saved ? JSON.parse(saved) : [];
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState: {
    items: getInitialFavorites(),
  },
  reducers: {
    addToFavorites(state, action) {
      const exists = state.items.find(
        (item) => item._id === action.payload._id,
      );

      if (!exists) {
        state.items.push(action.payload);
      }
    },

    removeFromFavorites(state, action) {
      state.items = state.items.filter((item) => item._id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder.addCase(logoutThunk.fulfilled, (state) => {
      state.items = [];
    });
  },
});

export const { addToFavorites, removeFromFavorites } = favoritesSlice.actions;

export default favoritesSlice.reducer;
