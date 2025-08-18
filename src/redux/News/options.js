import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchNews = createAsyncThunk(
  "news/fetchAll",
  async ({ page = 1, limit = 6 }, thunkAPI) => {
    try {
      const { data } = await api.get(`/news?page=${page}&limit${limit}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
