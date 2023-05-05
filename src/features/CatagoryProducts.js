import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
export const getCatagory = createAsyncThunk(
  "Categoryproducts/getCategoryproducts",
  async (category) => {
    try {
      const response = await axios.get("/public/approved/catagory", {
        params: {
          category: category,
        },
      });
      const data = await response.data;
      return data;
    } catch (error) {
      
    }
  }
);
export const Categoryslice = createSlice({
  name: "Categoryproducts",
  initialState: {
    value: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCatagory.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(getCatagory.fulfilled, (state, action) => {
      state.isLoading = false;
      state.value = action.payload;
    });
    builder.addCase(getCatagory.rejected, (state, action) => {
      state.isLoading = false;
    });
  },
});

export default Categoryslice.reducer;
