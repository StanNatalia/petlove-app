import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchFriends = createAsyncThunk(
  "friends/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/friends");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
