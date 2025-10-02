// src/redux/marketSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const MARKET_API_URL = "https://68a6b3c3639c6a54e99f8b80.mockapi.io/dustim/market";

// async action
export const addToMarketAPI = createAsyncThunk(
  "market/addToMarketAPI",
  async (product) => {
    const res = await axios.post(MARKET_API_URL, product);
    return res.data;
  }
);

const marketSlice = createSlice({
  name: "market",
  initialState: { items: [], status: "idle" },
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addToMarketAPI.fulfilled, (state, action) => {
      state.items.push(action.payload);
    });
  }
});

export default marketSlice.reducer;
