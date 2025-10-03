import { createSlice } from "@reduxjs/toolkit";

const initial = { data: JSON.parse(localStorage.getItem('cart_v1') || '[]') };

const slice = createSlice({
  name: 'localCartSlice',
  initialState: initial,
  reducers: {
    addToCartLocal: (state, action) => {
      const exists = state.data.find(i => i.id === action.payload.id);
      if (!exists) state.data.push({...action.payload, qty:1});
      localStorage.setItem('cart_v1', JSON.stringify(state.data));
    },
    removeFromCartLocal: (state, action) => {
      state.data = state.data.filter(i => i.id !== action.payload);
      localStorage.setItem('cart_v1', JSON.stringify(state.data));
    },
    changeQty: (state, action) => {
      const { id, qty } = action.payload;
      state.data = state.data.map(i => i.id === id ? {...i, qty} : i);
      localStorage.setItem('cart_v1', JSON.stringify(state.data));
    }
  }
});

export const { addToCartLocal, removeFromCartLocal, changeQty } = slice.actions;
export default slice.reducer;
