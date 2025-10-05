import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const ORDERS_API = "https://68a6b3c3639c6a54e99f8b80.mockapi.io/dustim/buyurtma";

// Buyurtmalarni olish
export const fetchOrders = createAsyncThunk('orders/fetchAll', async () => {
  try {
    const res = await fetch(ORDERS_API);
    if (!res.ok) throw new Error('Failed to fetch orders');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching orders:', error);
    // Agar MockAPI ishlamasa, bo'sh array qaytaramiz
    return [];
  }
});

// Yangi buyurtma yaratish
export const createOrder = createAsyncThunk('orders/create', async (orderData) => {
  try {
    const res = await fetch(ORDERS_API, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        ...orderData,
        createdAt: new Date().toISOString(),
        status: 'pending'
      }),
    });
    
    if (!res.ok) throw new Error('Failed to create order');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error creating order:', error);
    throw error;
  }
});

// Buyurtmani yangilash
export const updateOrder = createAsyncThunk('orders/update', async ({ id, orderData }) => {
  try {
    const res = await fetch(`${ORDERS_API}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(orderData),
    });
    
    if (!res.ok) throw new Error('Failed to update order');
    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error updating order:', error);
    throw error;
  }
});

// Buyurtmani o'chirish
export const deleteOrder = createAsyncThunk('orders/delete', async (id) => {
  try {
    const res = await fetch(`${ORDERS_API}/${id}`, {
      method: 'DELETE',
    });
    
    if (!res.ok) throw new Error('Failed to delete order');
    return id;
  } catch (error) {
    console.error('Error deleting order:', error);
    throw error;
  }
});

const orderSlice = createSlice({
  name: 'orderSlice',
  initialState: {
    orders: [],
    status: 'idle',
    error: null,
    currentOrder: null
  },
  reducers: {
    clearCurrentOrder: (state) => {
      state.currentOrder = null;
    },
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    // Local order qo'shish (agar API ishlamasa)
    addLocalOrder: (state, action) => {
      const newOrder = {
        ...action.payload,
        id: Date.now().toString(), // Temporary ID
        createdAt: new Date().toISOString()
      };
      state.orders.push(newOrder);
    }
  },
  extraReducers: builder => {
    builder
      // Fetch orders
      .addCase(fetchOrders.pending, state => { 
        state.status = 'loading'; 
      })
      .addCase(fetchOrders.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.orders = action.payload; 
      })
      .addCase(fetchOrders.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message; 
      })
      // Create order
      .addCase(createOrder.pending, state => { 
        state.status = 'loading'; 
      })
      .addCase(createOrder.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.orders.push(action.payload);
        state.currentOrder = action.payload;
      })
      .addCase(createOrder.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message;
        // Agar API ishlamasa, local ga saqlaymiz
        if (action.payload) {
          const localOrder = {
            ...action.meta.arg,
            id: Date.now().toString(),
            createdAt: new Date().toISOString()
          };
          state.orders.push(localOrder);
          state.currentOrder = localOrder;
        }
      })
      // Update order
      .addCase(updateOrder.pending, state => { 
        state.status = 'loading'; 
      })
      .addCase(updateOrder.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        const index = state.orders.findIndex(order => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateOrder.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message; 
      })
      // Delete order
      .addCase(deleteOrder.pending, state => { 
        state.status = 'loading'; 
      })
      .addCase(deleteOrder.fulfilled, (state, action) => { 
        state.status = 'succeeded'; 
        state.orders = state.orders.filter(order => order.id !== action.payload);
      })
      .addCase(deleteOrder.rejected, (state, action) => { 
        state.status = 'failed'; 
        state.error = action.error.message; 
      });
  }
});

export const { clearCurrentOrder, setCurrentOrder, addLocalOrder } = orderSlice.actions;
export default orderSlice.reducer;