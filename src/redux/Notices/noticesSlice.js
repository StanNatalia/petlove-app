import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCategories,
  fetchNotices,
  fetchSex,
  fetchSpecies,
} from "./options";

const initialState = {
  items: [],
  page: 1,
  perPage: 0,
  totalPages: 0,
  sex: [],
  species: [],
  categories: [],
  isLoading: false,
  error: null,
};

const noticesSlice = createSlice({
  name: "notices",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotices.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchNotices.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.results;
        state.page = action.payload.page;
        state.perPage = action.payload.perPage;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchNotices.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(fetchCategories.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(fetchSex.fulfilled, (state, action) => {
        state.sex = action.payload;
      })
      .addCase(fetchSpecies.fulfilled, (state, action) => {
        state.species = action.payload;
      });
  },
});

export const noticesReducer = noticesSlice.reducer;
