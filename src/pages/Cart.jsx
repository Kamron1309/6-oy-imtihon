import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { removeFromCartLocal, changeQty, clearCart } from "../redux/localCartSlice.js";
import { Link } from "react-router-dom";

export default function Cart(){
  const dispatch = useDispatch();
  const { data: cart } = useSelector(s => s.localCartSlice);

  const totalPrice = cart.reduce((total, item) => total + (item.price * item.qty), 0);
  const totalItems = cart.reduce((total, item) => total + item.qty, 0);
  const shippingFee = totalPrice > 50 ? 0 : 9.99;
  const tax = totalPrice * 0.1;
  const grandTotal = totalPrice + shippingFee + tax;

  const handleClearCart = () => {
    if (window.confirm('Are you sure you want to clear your cart?')) {
      dispatch(clearCart());
    }
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-7xl mx-auto py-12 px-4">
        <div className="text-center max-w-md mx-auto">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Your cart is empty</h2>
          <p className="text-gray-600 mb-8 text-lg">Add some products to your cart to see them here.</p>
          <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold">
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
          <p className="text-gray-600 mt-2">
            {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
          </p>
        </div>
        <button
          onClick={handleClearCart}
          className="px-4 py-2 text-red-600 hover:text-red-800 font-medium border border-red-200 rounded-lg hover:bg-red-50 transition-colors"
        >
          Clear Cart
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <div className="space-y-4">
            {cart.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
                <div className="flex flex-col md:flex-row md:items-center gap-4">
                  <img 
                    src={item.thumbnail || item.image} 
                    alt={item.title || item.name}
                    className="w-20 h-20 object-cover rounded-lg"
                    onError={(e) => {
                      e.target.src = "https://via.placeholder.com/80x80/4F46E5/FFFFFF?text=Prod";
                    }}
                  />
                  
                  <div className="flex-1">
                    <Link to={`/product/${item.id}`} className="font-semibold text-gray-800 hover:text-indigo-600 transition-colors">
                      {item.title || item.name}
                    </Link>
                    <p className="text-gray-600 text-sm mt-1">{item.brand || "Unknown Brand"}</p>
                    <div className="text-lg font-bold text-green-600 mt-2">${item.price}</div>
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-3">
                      <button 
                        onClick={() => dispatch(changeQty({ id: item.id, qty: Math.max(1, item.qty - 1) }))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        -
                      </button>
                      <span className="font-semibold text-lg min-w-8 text-center">{item.qty}</span>
                      <button 
                        onClick={() => dispatch(changeQty({ id: item.id, qty: item.qty + 1 }))}
                        className="w-8 h-8 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                      >
                        +
                      </button>
                    </div>

                    <div className="text-right">
                      <div className="font-bold text-lg">${(item.price * item.qty).toFixed(2)}</div>
                    </div>

                    <button 
                      onClick={() => dispatch(removeFromCartLocal(item.id))}
                      className="text-red-500 hover:text-red-700 transition-colors p-2"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-gray-200 rounded-xl p-6 sticky top-24">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Order Summary</h2>

            <div className="space-y-4 mb-6">
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Subtotal ({totalItems} items)</span>
                <span className="font-semibold">${totalPrice.toFixed(2)}</span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Shipping</span>
                <span className="font-semibold">
                  {shippingFee === 0 ? 'Free' : `$${shippingFee}`}
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-gray-600">Tax (10%)</span>
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

            <Link 
              to="/checkout"
              className="w-full bg-indigo-600 text-white py-4 rounded-lg font-semibold text-lg hover:bg-indigo-700 transition-colors mb-4 block text-center"
            >
              Proceed to Checkout
            </Link>

            <Link
              to="/shop"
              className="w-full text-center block text-indigo-600 hover:text-indigo-800 font-medium py-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}