import { configureStore } from "@reduxjs/toolkit";
import counterReducer from "../features/counterSlice";
import productReducer from "../features/RecentProductSlice";
import adsReducer from "../features/PostSlices/AdsPostSlice";
import tokenReducer from "../features/useSlice";
import categoryslice from "../features/CatagoryProducts";

const store = configureStore({
  reducer: {
    counter: counterReducer,
    product: productReducer,
    form: adsReducer,
    user: tokenReducer,
    catagory: categoryslice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
