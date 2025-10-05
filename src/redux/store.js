import { configureStore } from "@reduxjs/toolkit";
import cartSlice from "./cartSlice.js";
import productSlice from "./productSlice.js";
import likeSlice from "./like-Slice.js";
import localCartSlice from "./localCartSlice.js";
import orderSlice from "./orderSlice.js";

export const store = configureStore({
  reducer: {
    cartSlice,
    productSlice,
    likeSlice,
    localCartSlice,
    orderSlice
  }
});