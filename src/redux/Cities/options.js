import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const getCities = createAsyncThunk(
  "cities/get",
  async (keyword, thunkAPI) => {
    try {
      const { data } = await api.get(`/cities?keyword=${keyword}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const getLocations = createAsyncThunk(
  "locations/get",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/cities/locations");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
