import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import data from "./data";
export const getrecentProducts = createAsyncThunk(
  "recentProduct/getrecentProducts",
  async () => {
    try {
      const response = await axios.get("/public/approved");
      const data = await response.data;

      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
export const recentProductSlice = createSlice({
  name: "recentProduct",
  initialState: {
    value: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getrecentProducts.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getrecentProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value = action.payload;
    });
    builder.addCase(getrecentProducts.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default recentProductSlice.reducer;
