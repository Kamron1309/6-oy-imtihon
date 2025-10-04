import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCarts = createAsyncThunk('carts/fetchAll', async () => {
  const res = await fetch('https://dummyjson.com/carts');
  const data = await res.json();
  return data.carts;
});

export const fetchCartByUser = createAsyncThunk('carts/fetchByUser', async (userId) => {
  const res = await fetch(`https://dummyjson.com/carts/user/${userId}`);
  const data = await res.json();
  return data.carts || [];
});

const cartSlice = createSlice({
  name: 'cartSlice',
  initialState: { 
    carts: [], 
    userCarts: [], 
    status: 'idle', 
    error: null 
  },
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchCarts.pending, state => { 
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
      .addCase(fetchCartByUser.pending, state => { 
        state.status = 'loading'; 
      })
      .addCase(fetchCartByUser.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.userCarts = action.payload; 
      })
      .addCase(fetchCartByUser.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message; 
      });
  }
});

export default cartSlice.reducer;