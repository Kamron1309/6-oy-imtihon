import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const MOCKAPI_BASE_URL = "https://68a6b3c3639c6a54e99f8b80.mockapi.io/dustim/market";

export const fetchCarts = createAsyncThunk('carts/fetchAll', async () => {
  const res = await fetch(`${MOCKAPI_BASE_URL}/carts`);
  const data = await res.json();
  return data;
});

export const fetchCartByUser = createAsyncThunk('carts/fetchByUser', async (userId) => {
  const res = await fetch(`${MOCKAPI_BASE_URL}/carts?userId=${userId}`);
  const data = await res.json();
  return data || [];
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