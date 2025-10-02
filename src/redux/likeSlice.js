// src/redux/likeSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: JSON.parse(localStorage.getItem('likes_v1') || '[]')
};

const likeSlice = createSlice({
  name: 'likeSlice',
  initialState,
  reducers: {
    addToLike: (state, action) => {
      if (!state.data.find(i => i.id === action.payload.id)) {
        state.data.push(action.payload);
        localStorage.setItem('likes_v1', JSON.stringify(state.data));
      }
    },
    removeFromLike: (state, action) => {
      state.data = state.data.filter(i => i.id !== action.payload);
      localStorage.setItem('likes_v1', JSON.stringify(state.data));
    },
    clearLikes: (state) => {
      state.data = [];
      localStorage.setItem('likes_v1', JSON.stringify(state.data));
    },
    toggleLike: (state, action) => {
      const existingIndex = state.data.findIndex(i => i.id === action.payload.id);
      if (existingIndex >= 0) {
        state.data.splice(existingIndex, 1);
      } else {
        state.data.push(action.payload);
      }
      localStorage.setItem('likes_v1', JSON.stringify(state.data));
    }
  }
});

export const { addToLike, removeFromLike, clearLikes, toggleLike } = likeSlice.actions;
export default likeSlice.reducer;