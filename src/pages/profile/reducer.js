import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  currentUser: null,
};

const slice = createSlice({
  name: "users",
  initialState,
  reducers: {
    setCurrentUser: (state, action) => {
      state.currentUser = action.payload;
    },
    clearCurrentUser: (state) => {
      state.currentUser = null;
    },
  },
});

export const { setCurrentUser, clearCurrentUser } = slice.actions;
export default slice.reducer;
