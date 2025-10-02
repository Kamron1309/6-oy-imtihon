// src/redux/cartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Async thunks for DummyJSON carts
export const fetchCarts = createAsyncThunk(
  'carts/fetchAll', 
  async () => {
    const res = await fetch('https://dummyjson.com/carts');
    const data = await res.json();
    return data.carts;
  }
);

export const fetchCartByUser = createAsyncThunk(
  'carts/fetchByUser', 
  async (userId) => {
    const res = await fetch(`https://dummyjson.com/carts/user/${userId}`);
    const data = await res.json();
    return data.carts || [];
  }
);

export const fetchSingleCart = createAsyncThunk(
  'carts/fetchSingle',
  async (cartId) => {
    const res = await fetch(`https://dummyjson.com/carts/${cartId}`);
    const data = await res.json();
    return data;
  }
);

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: { 
    carts: [], 
    userCarts: [], 
    currentCart: null,
    status: 'idle', 
    error: null 
  },
  reducers: {
    clearCarts: (state) => {
      state.carts = [];
      state.userCarts = [];
      state.currentCart = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch all carts
      .addCase(fetchCarts.pending, (state) => { 
        state.status = 'loading'; 
      })
      .addCase(fetchCarts.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.carts = action.payload; 
      })
      .addCase(fetchCarts.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message; 
      })
      // Fetch cart by user
      .addCase(fetchCartByUser.pending, (state) => { 
        state.status = 'loading'; 
      })
      .addCase(fetchCartByUser.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.userCarts = action.payload; 
      })
      .addCase(fetchCartByUser.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message; 
      })
      // Fetch single cart
      .addCase(fetchSingleCart.fulfilled, (state, action) => {
        state.currentCart = action.payload;
      });
  }
});

export const { clearCarts } = cartSlice.actions;
export default cartSlice.reducer;