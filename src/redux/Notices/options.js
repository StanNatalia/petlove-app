import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../services/api";

export const fetchNotices = createAsyncThunk(
  "pets/fetchAll",
  async ({ page = 1, limit = 2000, ...params } = {}, thunkAPI) => {
    try {
      const query = new URLSearchParams({
        page,
        limit,
        ...params,
      }).toString();

      const { data } = await api.get(`/notices?${query}`);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/notices/categories");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchSex = createAsyncThunk(
  "sex/fetchSex",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/notices/sex");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const fetchSpecies = createAsyncThunk(
  "species/fetchSpecies",
  async (_, thunkAPI) => {
    try {
      const { data } = await api.get("/notices/species");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
