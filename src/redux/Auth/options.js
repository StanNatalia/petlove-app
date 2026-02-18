import { createAsyncThunk } from "@reduxjs/toolkit";
import { api, clearAuthHeader, setAuthHeader } from "../../services/api";

export const registerThunk = createAsyncThunk(
  "auth/signup",
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post("/users/signup", body);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (body, thunkAPI) => {
    try {
      const { data } = await api.post("/users/signin", body);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const logoutThunk = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      await api.post("/users/signout");
      clearAuthHeader();
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const refreshUser = createAsyncThunk(
  "auth/refresh",
  async (_, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const savedToken = state.auth.token;
      if (savedToken === null) {
        return thunkAPI.rejectWithValue("Token is not exist");
      }

      setAuthHeader(savedToken);
      const { data } = await api.get("/users/current");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);
