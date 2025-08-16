import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchNews = createAsyncThunk(
  "news/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/news");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
