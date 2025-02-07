import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
// import { productsApiSlice } from "../slices/productsApiSlice";
import cartSliceReducer from "../slices/cartSlice";

const appStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    cart: cartSliceReducer,
    // [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default appStore;
