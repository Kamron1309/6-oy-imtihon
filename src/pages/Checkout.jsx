import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createOrder } from "../redux/orderSlice.js";
import { clearCart } from "../redux/localCartSlice.js";

export default function Checkout(){
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data: cart } = useSelector(s => s.localCartSlice);
  const { status } = useSelector(s => s.orderSlice);

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zipCode: '',
    paymentMethod: 'card'
  });

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const shippingFee = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + shippingFee + tax;

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    const orderData = {
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      zipCode: formData.zipCode,
      paymentMethod: formData.paymentMethod,
      items: cart.map(item => ({
        id: item.id,
        name: item.title || item.name,
        price: item.price,
        quantity: item.qty,
        image: item.thumbnail || item.image
      })),
      totalAmount: grandTotal,
      status: 'pending',
      createdAt: new Date().toISOString()
    };

    try {
      await dispatch(createOrder(orderData)).unwrap();
      dispatch(clearCart());
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      alert('Error creating order. Please try again.');
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-12 text-center px-4">
        <h2 className="text-3xl font-bold text-gray-600 mb-4">Your cart is empty</h2>
        <p className="text-gray-500 mb-8">Add some items to your cart before checkout.</p>
        <button 
          onClick={() => navigate('/shop')}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Continue Shopping
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Checkout Form */}
        <div className="bg-white border border-gray-200 rounded-xl p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="John Doe"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="john@example.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Phone Number *
              </label>
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="+1 (555) 123-4567"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Address *
              </label>
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                placeholder="123 Main St"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  City *
                </label>
                <input
                  type="text"
                  name="city"
                  value={formData.city}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="New York"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  ZIP Code *
                </label>
                <input
                  type="text"
                  name="zipCode"
                  value={formData.zipCode}
                  onChange={handleInputChange}
                  required
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  placeholder="10001"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Payment Method *
              </label>
              <select
                name="paymentMethod"
                value={formData.paymentMethod}
                onChange={handleInputChange}
                required
                className="w-full border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              >
                <option value="card">Credit/Debit Card</option>
                <option value="paypal">PayPal</option>
                <option value="cash">Cash on Delivery</option>
              </select>
            </div>

            <button
              type="submit"
              disabled={status === 'loading'}
              className="w-full bg-green-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
            >
              {status === 'loading' ? 'Placing Order...' : `Place Order - $${grandTotal.toFixed(2)}`}
            </button>
          </form>
        </div>

        {/* Order Summary */}
        <div className="bg-white border border-gray-200 rounded-xl p-6 h-fit sticky top-24">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">Order Summary</h2>
          
          <div className="space-y-4 mb-6">
            {cart.map(item => (
              <div key={item.id} className="flex items-center gap-4">
                <img 
                  src={item.thumbnail || item.image} 
                  alt={item.title || item.name}
                  className="w-16 h-16 object-cover rounded"
                  onError={(e) => {
                    e.target.src = "https://via.placeholder.com/64x64/4F46E5/FFFFFF?text=Prod";
                  }}
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-800 text-sm">
                    {item.title || item.name}
                  </h3>
                  <p className="text-gray-600 text-sm">Qty: {item.qty}</p>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-green-600">
                    ${(item.price * item.qty).toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-gray-200 pt-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-gray-600">Subtotal</span>
              <span className="font-semibold">${totalPrice.toFixed(2)}</span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Shipping</span>
              <span className="font-semibold">
                {shippingFee === 0 ? 'Free' : `$${shippingFee}`}
              </span>
            </div>
            
            <div className="flex justify-between">
              <span className="text-gray-600">Tax</span>
              <span className="font-semibold">${tax.toFixed(2)}</span>
            </div>
            
            <div className="border-t border-gray-200 pt-4">
              <div className="flex justify-between items-center">
                <span className="text-lg font-bold text-gray-900">Total</span>
                <span className="text-2xl font-bold text-green-600">
                  ${grandTotal.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}