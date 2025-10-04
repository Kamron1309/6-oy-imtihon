import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  const res = await fetch('https://dummyjson.com/products?limit=100');
  const data = await res.json();
  return data.products;
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id) => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  const data = await res.json();
  return data;
});

export const searchProducts = createAsyncThunk('products/search', async (query) => {
  const res = await fetch(`https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`);
  const data = await res.json();
  return data.products;
});

const productSlice = createSlice({
  name: 'productSlice',
  initialState: {
    products: [],
    productDetail: null,
    status: 'idle',
    error: null
  },
  reducers: {
    clearProductDetail: (state) => {
      state.productDetail = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(fetchProducts.pending, state => { 
        state.status = 'loading'; 
      })
      .addCase(fetchProducts.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.products = action.payload; 
      })
      .addCase(fetchProducts.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message; 
      })
      .addCase(fetchProductById.pending, state => { 
        state.status = 'loading'; 
      })
      .addCase(fetchProductById.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.productDetail = action.payload; 
      })
      .addCase(fetchProductById.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message; 
      })
      .addCase(searchProducts.pending, state => { 
        state.status = 'loading'; 
      })
      .addCase(searchProducts.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.products = action.payload; 
      })
      .addCase(searchProducts.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message; 
      });
  }
});

export const { clearProductDetail } = productSlice.actions;
export default productSlice.reducer;