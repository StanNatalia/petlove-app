// https://petlove.b.goit.study/api

import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

axios.defaults.baseURL = "https://petlove.b.goit.study/api";

export const registerThunk = createAsyncThunk(
  "auth/signup",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signup", body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const loginThunk = createAsyncThunk(
  "auth/login",
  async (body, thunkAPI) => {
    try {
      const { data } = await axios.post("/users/signin", body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
