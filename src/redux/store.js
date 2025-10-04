import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice";
import productSlice from "./productSlice";
import likeSlice from "./like-Slice";
import localCartSlice from "./localCartSlice";

export const store = configureStore({
  reducer: {
    cartSlice,
    productSlice,
    likeSlice,
    localCartSlice
  }
});