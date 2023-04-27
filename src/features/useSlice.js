import { createSlice } from "@reduxjs/toolkit";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: JSON.parse(sessionStorage.getItem("token")) || null,
  },

  reducers: {
    setToken: (state, action) => {
      state.value = action.payload;
    },
    deleteToken: (state) => {
      state.value = null;
    },
  },
});

export const { setToken, deleteToken } = tokenSlice.actions;

export default tokenSlice.reducer;
