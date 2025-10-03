// src/redux/store.js
import { configureStore } from '@reduxjs/toolkit';
import productSlice from './productSlice';
import cartSlice from './cartSlice';
import localCartSlice from './localCartSlice';
import likeSlice from './likeSlice';
import marketSlice from './marketSlice';

export const store = configureStore({
  reducer: {
    productSlice,
    cartSlice,
    localCartSlice,
    likeSlice,
    marketSlice,
  },
});