import { createSlice } from "@reduxjs/toolkit";
import { getCities, getLocations } from "./options";

const citiesSlice = createSlice({
  name: "cities",
  initialState: {
    items: [],
    loading: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCities.pending, (state) => {
        state.loading = true;
      })
      .addCase(getCities.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getCities.rejected, (state) => {
        state.loading = false;
      })
      .addCase(getLocations.pending, (state) => {
        state.loading = true;
      })
      .addCase(getLocations.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(getLocations.rejected, (state) => {
        state.loading = false;
      });
  },
});

export default citiesSlice.reducer;
