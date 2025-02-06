import { configureStore } from "@reduxjs/toolkit";
import { apiSlice } from "../slices/apiSlice";
// import { productsApiSlice } from "../slices/productsApiSlice";

const appStore = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    // [productsApiSlice.reducerPath]: productsApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

export default appStore;
