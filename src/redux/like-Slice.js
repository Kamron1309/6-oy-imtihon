import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: JSON.parse(localStorage.getItem("likes_v1")) || [],
};

const likeSlice = createSlice({
  name: "likeSlice",
  initialState,
  reducers: {
    addToLike: (state, action) => {
      if (!state.data.find(item => item.id === action.payload.id)) {
        state.data.push(action.payload);
        localStorage.setItem("likes_v1", JSON.stringify(state.data));
      }
    },
    removeFromLike: (state, action) => {
      state.data = state.data.filter(item => item.id !== action.payload);
      localStorage.setItem("likes_v1", JSON.stringify(state.data));
    },
    clearLike: (state) => {
      state.data = [];
      localStorage.setItem("likes_v1", JSON.stringify(state.data));
    },
  },
});

export const { addToLike, removeFromLike, clearLike } = likeSlice.actions;
export default likeSlice.reducer;