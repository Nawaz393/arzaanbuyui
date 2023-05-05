import { createSlice } from "@reduxjs/toolkit";
import { useEffect } from "react";

export const tokenSlice = createSlice({
  name: "token",
  initialState: {
    value: JSON.parse(localStorage.getItem("token")) || null,
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
