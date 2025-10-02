import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import likeSlice from "./likeSlice";
import localCartSlice from "./localCartSlice";


export const store = configureStore({
  reducer: {
    cartSlice,
    productSlice,
    likeSlice,
    localCartSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});
