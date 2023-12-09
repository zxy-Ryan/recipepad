import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import * as api from "../api";

export const login = createAsyncThunk(
  "auth/login",
  // rejectWithValue is used to handle the error from backend
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signIn(formValue);
      toast.success("Login successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const register = createAsyncThunk(
  "auth/register",
  // rejectWithValue is used to handle the error from backend
  async ({ formValue, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.signUp(formValue);
      toast.success("Register successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

export const googleSignIn = createAsyncThunk(
  "auth/googleSignIn",
  // rejectWithValue is used to handle the error from backend
  async ({ result, navigate, toast }, { rejectWithValue }) => {
    try {
      const response = await api.googleSignIn(result);
      toast.success("Google Sign-in successfully");
      navigate("/");
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);

// it generated promise lifecycle linke pending, fulfilled, rejected
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    loading: false,
    error: "",
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setLogout: (state) => {
      localStorage.clear();
      state.user = null;
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.loading = true;
    },
    [login.fulfilled]: (state, action) => {
      state.loading = false;
      //whatever the payload we are receiving from our backend we are storing it in our local storage
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [register.pending]: (state) => {
      state.loading = true;
    },
    [register.fulfilled]: (state, action) => {
      state.loading = false;
      //whatever the payload we are receiving from our backend we are storing it in our local storage
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
    [googleSignIn.pending]: (state) => {
      state.loading = true;
    },
    [googleSignIn.fulfilled]: (state, action) => {
      state.loading = false;
      //whatever the payload we are receiving from our backend we are storing it in our local storage
      localStorage.setItem("profile", JSON.stringify({ ...action.payload }));
      state.user = action.payload;
    },
    [googleSignIn.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload.message;
    },
  },
});
export const { setUser, setLogout } = authSlice.actions;
export default authSlice.reducer;
