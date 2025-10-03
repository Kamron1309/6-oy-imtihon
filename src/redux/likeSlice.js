import { createSlice } from "@reduxjs/toolkit";

const initial = {
  data: JSON.parse(localStorage.getItem('likes_v1') || '[]')
};

const slice = createSlice({
  name: 'likeSlice',
  initialState: initial,
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
    }
  }
});

export const { addToLike, removeFromLike } = slice.actions;
export default slice.reducer;
