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
      localStorage.setItem("token", data.token);
      const userResponse = await api.get("/users/current/full");

      return {
        ...userResponse.data,
        token: data.token,
      };
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
      localStorage.removeItem("favorites");
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
      let savedToken = state.auth.token;

      if (!savedToken) {
        savedToken = localStorage.getItem("token");
      }

      if (savedToken === null) {
        return thunkAPI.rejectWithValue("Token is not exist");
      }

      if (!savedToken) {
        return thunkAPI.rejectWithValue("Token is not exist");
      }

      setAuthHeader(savedToken);
      const { data } = await api.get("/users/current/full");
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const editUser = createAsyncThunk(
  "auth/edit",
  async (body, thunkAPI) => {
    try {
      const state = thunkAPI.getState();
      const token = state.auth.token;
      if (!token) {
        return thunkAPI.rejectWithValue("No token found");
      }
      setAuthHeader(token);
      const { data } = await api.patch("/users/current/edit", body);
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  },
);

export const addPet = createAsyncThunk(
  "auth/addpet",
  async (body, thuncAPI) => {
    try {
      const { data } = await api.post("/users/current/pets/add", body);
      console.log("SERVER RESPONSE:", data);
      return data;
    } catch (error) {
      return thuncAPI.rejectWithValue(error.message);
    }
  },
);
