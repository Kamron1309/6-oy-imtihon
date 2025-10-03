// src/redux/cart-api.js
import axios from 'axios';

// API URLs
const MARKET_API_URL = 'https://68a6b3c3639c6a54e99f8b80.mockapi.io/dustim/market';
const BUYURTMA_API_URL = 'https://68a6b3c3639c6a54e99f8b80.mockapi.io/dustim/buyurtma';

// API so'rovlari uchun konfiguratsiya
const api = axios.create({
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache'
  }
});

// Har bir so'rovga cache busting parametri qo'shamiz
const addCacheBust = (url) => {
  return `${url}${url.includes('?') ? '&' : '?'}_=${Date.now()}`;
};

export const cartAPI = {
  // Market (Mahsulotlar) API
  getMarketProducts: async () => {
    try {
      const response = await api.get(addCacheBust(MARKET_API_URL));
      return response.data;
    } catch (error) {
      console.error('Error fetching market products:', error);
      throw error;
    }
  },

  addToMarket: async (product) => {
    try {
      const marketItem = {
        ...product,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        status: 'active'
      };
      const response = await api.post(MARKET_API_URL, marketItem);
      return response.data;
    } catch (error) {
      console.error('Error adding to market:', error);
      throw error;
    }
  },

  updateMarketProduct: async (id, updates) => {
    try {
      const response = await api.put(`${MARKET_API_URL}/${id}`, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error updating market product:', error);
      throw error;
    }
  },

  removeFromMarket: async (id) => {
    try {
      const response = await api.delete(`${MARKET_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from market:', error);
      throw error;
    }
  },

  clearMarket: async () => {
    try {
      const items = await cartAPI.getMarketProducts();
      const deletePromises = items.map(item => 
        api.delete(`${MARKET_API_URL}/${item.id}`)
      );
      await Promise.all(deletePromises);
      return { success: true, message: 'Market cleared successfully' };
    } catch (error) {
      console.error('Error clearing market:', error);
      throw error;
    }
  },

  // Buyurtma (Savat) API
  getBuyurtmalar: async () => {
    try {
      const response = await api.get(addCacheBust(BUYURTMA_API_URL));
      return response.data;
    } catch (error) {
      console.error('Error fetching buyurtmalar:', error);
      throw error;
    }
  },

  addToBuyurtma: async (product) => {
    try {
      const buyurtmaItem = {
        ...product,
        quantity: product.quantity || 1,
        totalPrice: (product.price || product.productPrice) * (product.quantity || 1),
        orderDate: new Date().toISOString(),
        status: 'pending',
        orderId: `ORD-${Date.now()}`
      };
      const response = await api.post(BUYURTMA_API_URL, buyurtmaItem);
      return response.data;
    } catch (error) {
      console.error('Error adding to buyurtma:', error);
      throw error;
    }
  },

  updateBuyurtma: async (id, updates) => {
    try {
      const response = await api.put(`${BUYURTMA_API_URL}/${id}`, {
        ...updates,
        updatedAt: new Date().toISOString()
      });
      return response.data;
    } catch (error) {
      console.error('Error updating buyurtma:', error);
      throw error;
    }
  },

  removeFromBuyurtma: async (id) => {
    try {
      const response = await api.delete(`${BUYURTMA_API_URL}/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from buyurtma:', error);
      throw error;
    }
  },

  clearBuyurtmalar: async () => {
    try {
      const items = await cartAPI.getBuyurtmalar();
      const deletePromises = items.map(item => 
        api.delete(`${BUYURTMA_API_URL}/${item.id}`)
      );
      await Promise.all(deletePromises);
      return { success: true, message: 'All buyurtmalar cleared successfully' };
    } catch (error) {
      console.error('Error clearing buyurtmalar:', error);
      throw error;
    }
  }
};