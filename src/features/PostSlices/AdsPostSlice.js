import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

import axios from "axios";
export const submitForm = createAsyncThunk(
  "form/submitForm",

  async (form, { rejectWithValue }) => {
    try {

      console.log(form)
      const response = await axios.post("/ads/pending", form);
      if (!response.ok) {
        throw new Error("Something went wrong");
      }
      return response.data;
    } catch (error) {
      console.log(error);
      return rejectWithValue(error.response.data);
    }
  }
);

const initialState = {
  adValues: {
    name: "",
    tagline: "",
    price: "",
    category: "",
    detail: "",
    description: "",
    images: [],
    email: "",
    whatsapp: "",
    phone: "",
    address: "",
    website: "",
  },
  isLoading: false,
  isError: null,
};

const AdsSlice = createSlice({
  name: "form",
  initialState,
  reducers: {
    setAdValues: (state, action) => {
      const { name, value } = action.payload;
      state.adValues[name] = value;
    },
    setImages: (state, action) => {
      state.adValues.images = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setIsError: (state, action) => {
      state.isError = action.payload;
    },

    Reset: (state) => {
      state.form.name = "";
      state.form.tagline = "";
      state.form.price = "";
      state.form.category = "";
      state.form.detail = "";
      state.form.description = "";
      state.form.image = [];
      state.form.email = "";
      state.form.whatsapp = "";
      state.form.phone = "";
      state.form.address = "";
      state.form.website = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(submitForm.pending, (state, action) => {
      state.isSuccess = action.payload;
      state.isLoading = true;
    });
    builder.addCase(submitForm.fulfilled, (state) => {
      state.isLoading = false;
      state.isError = null;
    });
    builder.addCase(submitForm.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    });
  },
});

export const { setAdValues, setIsLoading, setIsError, Reset, setImages } =
  AdsSlice.actions;
export default AdsSlice.reducer;
