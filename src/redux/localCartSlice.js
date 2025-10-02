// src/redux/localCartSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { cartAPI } from "./cart-api";

// Async thunks for Market API
export const fetchMarketProducts = createAsyncThunk(
  'localCart/fetchMarketProducts',
  async () => {
    const response = await cartAPI.getMarketProducts();
    return response;
  }
);

export const addToMarketAPI = createAsyncThunk(
  'localCart/addToMarket',
  async (product) => {
    const response = await cartAPI.addToMarket(product);
    return response;
  }
);

export const updateMarketProductAPI = createAsyncThunk(
  'localCart/updateMarketProduct',
  async ({ id, updates }) => {
    const response = await cartAPI.updateMarketProduct(id, updates);
    return response;
  }
);

export const removeFromMarketAPI = createAsyncThunk(
  'localCart/removeFromMarket',
  async (id) => {
    await cartAPI.removeFromMarket(id);
    return id;
  }
);

export const clearMarketAPI = createAsyncThunk(
  'localCart/clearMarket',
  async () => {
    await cartAPI.clearMarket();
    return [];
  }
);

// Async thunks for Buyurtma API
export const fetchBuyurtmalar = createAsyncThunk(
  'localCart/fetchBuyurtmalar',
  async () => {
    const response = await cartAPI.getBuyurtmalar();
    return response;
  }
);

export const addToBuyurtmaAPI = createAsyncThunk(
  'localCart/addToBuyurtma',
  async (product) => {
    const response = await cartAPI.addToBuyurtma(product);
    return response;
  }
);

export const updateBuyurtmaAPI = createAsyncThunk(
  'localCart/updateBuyurtma',
  async ({ id, updates }) => {
    const response = await cartAPI.updateBuyurtma(id, updates);
    return response;
  }
);

export const removeFromBuyurtmaAPI = createAsyncThunk(
  'localCart/removeFromBuyurtma',
  async (id) => {
    await cartAPI.removeFromBuyurtma(id);
    return id;
  }
);

export const clearBuyurtmalarAPI = createAsyncThunk(
  'localCart/clearBuyurtmalar',
  async () => {
    await cartAPI.clearBuyurtmalar();
    return [];
  }
);

const initialState = { 
  data: JSON.parse(localStorage.getItem('cart_v1') || '[]'),
  marketProducts: [],
  buyurtmalar: [],
  status: 'idle',
  error: null
};

const localCartSlice = createSlice({
  name: 'localCartSlice',
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {
      const exists = state.data.find(i => i.id === action.payload.id);
      if (!exists) {
        state.data.push({...action.payload, qty: 1});
        localStorage.setItem('cart_v1', JSON.stringify(state.data));
      }
    },
    removeFromCartLocal: (state, action) => {
      state.data = state.data.filter(i => i.id !== action.payload);
      localStorage.setItem('cart_v1', JSON.stringify(state.data));
    },
    changeQty: (state, action) => {
      const { id, qty } = action.payload;
      state.data = state.data.map(i => 
        i.id === id ? {...i, qty: Math.max(1, qty)} : i
      );
      localStorage.setItem('cart_v1', JSON.stringify(state.data));
    },
    incrementQty: (state, action) => {
      const id = action.payload;
      state.data = state.data.map(i => 
        i.id === id ? {...i, qty: i.qty + 1} : i
      );
      localStorage.setItem('cart_v1', JSON.stringify(state.data));
    },
    decrementQty: (state, action) => {
      const id = action.payload;
      state.data = state.data.map(i => 
        i.id === id ? {...i, qty: Math.max(1, i.qty - 1)} : i
      );
      localStorage.setItem('cart_v1', JSON.stringify(state.data));
    },
    clearLocalCart: (state) => {
      state.data = [];
      localStorage.setItem('cart_v1', JSON.stringify(state.data));
    }
  },
  extraReducers: (builder) => {
    builder
      // Market Products
      .addCase(fetchMarketProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchMarketProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.marketProducts = action.payload;
      })
      .addCase(fetchMarketProducts.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToMarketAPI.fulfilled, (state, action) => {
        state.marketProducts.push(action.payload);
      })
      .addCase(updateMarketProductAPI.fulfilled, (state, action) => {
        const index = state.marketProducts.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.marketProducts[index] = action.payload;
        }
      })
      .addCase(removeFromMarketAPI.fulfilled, (state, action) => {
        state.marketProducts = state.marketProducts.filter(item => item.id !== action.payload);
      })
      .addCase(clearMarketAPI.fulfilled, (state) => {
        state.marketProducts = [];
      })
      
      // Buyurtmalar
      .addCase(fetchBuyurtmalar.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchBuyurtmalar.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.buyurtmalar = action.payload;
      })
      .addCase(fetchBuyurtmalar.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addToBuyurtmaAPI.fulfilled, (state, action) => {
        state.buyurtmalar.push(action.payload);
      })
      .addCase(updateBuyurtmaAPI.fulfilled, (state, action) => {
        const index = state.buyurtmalar.findIndex(item => item.id === action.payload.id);
        if (index !== -1) {
          state.buyurtmalar[index] = action.payload;
        }
      })
      .addCase(removeFromBuyurtmaAPI.fulfilled, (state, action) => {
        state.buyurtmalar = state.buyurtmalar.filter(item => item.id !== action.payload);
      })
      .addCase(clearBuyurtmalarAPI.fulfilled, (state) => {
        state.buyurtmalar = [];
      });
  }
});

export const { 
  addToCartLocal, 
  removeFromCartLocal, 
  changeQty, 
  incrementQty, 
  decrementQty,
  clearLocalCart 
} = localCartSlice.actions;

export default localCartSlice.reducer;