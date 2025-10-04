import { createSlice } from "@reduxjs/toolkit";

const initialState = { 
  data: JSON.parse(localStorage.getItem('cart_v1')) || [] 
};

const localCartSlice = createSlice({
  name: 'localCartSlice',
  initialState,
  reducers: {
    addToCartLocal: (state, action) => {
      const existingItem = state.data.find(item => item.id === action.payload.id);
      if (existingItem) {
        existingItem.qty += 1;
      } else {
        state.data.push({...action.payload, qty: 1});
      }
      localStorage.setItem('cart_v1', JSON.stringify(state.data));
    },
    removeFromCartLocal: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
      localStorage.setItem('cart_v1', JSON.stringify(state.data));
    },
    changeQty: (state, action) => {
      const { id, qty } = action.payload;
      const item = state.data.find(item => item.id === id);
      if (item) {
        item.qty = qty;
      }
      localStorage.setItem('cart_v1', JSON.stringify(state.data));
    },
    clearCart: (state) => {
      state.data = [];
      localStorage.setItem('cart_v1', JSON.stringify(state.data));
    }
  }
});

export const { addToCartLocal, removeFromCartLocal, changeQty, clearCart } = localCartSlice.actions;
export default localCartSlice.reducer;