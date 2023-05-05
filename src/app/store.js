import { configureStore } from "@reduxjs/toolkit";
import tokenReducer from "../features/useSlice";
import categoryslice from "../features/CatagoryProducts";

const store = configureStore({
  reducer: {
    user: tokenReducer,
    catagory: categoryslice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
