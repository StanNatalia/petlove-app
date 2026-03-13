import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const addToFavorites = createAsyncThunk(
  "favorites/add",
  async (id, thunkAPI) => {
    try {
      await api.post(`/notices/favorites/add/${id}`);
      const { data } = await api.get(`/notices/${id}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const removeFromFavorites = createAsyncThunk(
  "favorites/remove",
  async (id, thunkAPI) => {
    try {
      await api.delete(`/notices/favorites/remove/${id}`);
      return id;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchNoticesById = createAsyncThunk(
  "favorites/fetchNoticesById",
  async (id, thunkAPI) => {
    try {
      const { data } = await api.get("/notices/${id}");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
