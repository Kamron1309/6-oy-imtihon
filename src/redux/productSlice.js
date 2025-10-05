import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Ikkala MockAPI endpoints
const PRODUCTS_API = "https://68a6b3c3639c6a54e99f8b80.mockapi.io/dustim/market";
const DUMMYJSON_API = "https://dummyjson.com/products";

export const fetchProducts = createAsyncThunk('products/fetchAll', async () => {
  try {
    // Avval MockAPI dan urinib ko'ramiz
    const res = await fetch(PRODUCTS_API);
    if (res.ok) {
      const data = await res.json();
      if (data.length > 0) {
        return data; // MockAPI dan ma'lumot kelgan bo'lsa
      }
    }
    
    // Agar MockAPI ishlamasa, dummyjson dan olamiz
    const fallbackRes = await fetch(`${DUMMYJSON_API}?limit=20`);
    const fallbackData = await fallbackRes.json();
    return fallbackData.products;
  } catch (error) {
    // Xatolik bo'lsa, dummyjson ga o'tamiz
    const fallbackRes = await fetch(`${DUMMYJSON_API}?limit=20`);
    const fallbackData = await fallbackRes.json();
    return fallbackData.products;
  }
});

export const fetchProductById = createAsyncThunk('products/fetchById', async (id) => {
  try {
    // Avval MockAPI dan urinib ko'ramiz
    const res = await fetch(`${PRODUCTS_API}/${id}`);
    if (res.ok) {
      const data = await res.json();
      if (data.id) {
        return data; // MockAPI dan ma'lumot kelgan bo'lsa
      }
    }
    
    // Agar MockAPI ishlamasa, dummyjson dan olamiz
    const fallbackRes = await fetch(`${DUMMYJSON_API}/${id}`);
    const fallbackData = await fallbackRes.json();
    return fallbackData;
  } catch (error) {
    // Xatolik bo'lsa, dummyjson ga o'tamiz
    const fallbackRes = await fetch(`${DUMMYJSON_API}/${id}`);
    const fallbackData = await fallbackRes.json();
    return fallbackData;
  }
});

export const searchProducts = createAsyncThunk('products/search', async (query) => {
  try {
    // Avval MockAPI dan qidirib ko'ramiz
    const res = await fetch(`${PRODUCTS_API}?search=${encodeURIComponent(query)}`);
    if (res.ok) {
      const data = await res.json();
      if (data.length > 0) {
        return data;
      }
    }
    
    // Agar MockAPI dan topilmasa, dummyjson dan qidiramiz
    const fallbackRes = await fetch(`${DUMMYJSON_API}/search?q=${encodeURIComponent(query)}`);
    const fallbackData = await fallbackRes.json();
    return fallbackData.products || [];
  } catch (error) {
    // Xatolik bo'lsa, dummyjson ga o'tamiz
    const fallbackRes = await fetch(`${DUMMYJSON_API}/search?q=${encodeURIComponent(query)}`);
    const fallbackData = await fallbackRes.json();
    return fallbackData.products || [];
  }
});

const productSlice = createSlice({
  name: 'productSlice',
  initialState: {
    products: [],
    productDetail: null,
    status: 'idle',
    error: null,
    apiSource: 'mockapi' // Qaysi API dan foydalanyapmiz
  },
  reducers: {
    clearProductDetail: (state) => {
      state.productDetail = null;
    },
    setApiSource: (state, action) => {
      state.apiSource = action.payload;
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
        // Ma'lumot qayerdan kelganligini aniqlaymiz
        state.apiSource = action.payload[0]?.createdAt ? 'mockapi' : 'dummyjson';
      })
      .addCase(fetchProducts.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message;
        state.apiSource = 'dummyjson';
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

export const { clearProductDetail, setApiSource } = productSlice.actions;
export default productSlice.reducer;