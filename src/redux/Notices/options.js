import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchNotices = createAsyncThunk(
  "pets/fetchAll",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/notices");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
