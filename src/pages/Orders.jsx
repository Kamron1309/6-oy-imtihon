import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrders, deleteOrder, updateOrder } from "../redux/orderSlice.js";
import { Link } from "react-router-dom";

export default function Orders(){
  const dispatch = useDispatch();
  const { orders, status, error } = useSelector(s => s.orderSlice);

  useEffect(() => { 
    dispatch(fetchOrders()); 
  }, [dispatch]);

  const handleDeleteOrder = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      dispatch(deleteOrder(orderId));
    }
  };

  const handleUpdateStatus = (orderId, currentStatus) => {
    const newStatus = currentStatus === 'pending' ? 'completed' : 'pending';
    dispatch(updateOrder({ 
      id: orderId, 
      orderData: { status: newStatus } 
    }));
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (status === 'loading') {
    return (
      <div className="max-w-7xl mx-auto py-8 px-4">
        <div className="animate-pulse space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="bg-gray-200 h-20 rounded-lg"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">My Orders</h1>
          <p className="text-gray-600 mt-2">Manage your purchase orders</p>
        </div>
        <Link 
          to="/cart"
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
        >
          Back to Cart
        </Link>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          Error loading orders: {error}
        </div>
      )}

      {orders.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
          </div>
          <h2 className="text-2xl font-semibold text-gray-600 mb-4">No Orders Yet</h2>
          <p className="text-gray-500 mb-6">You haven't placed any orders yet.</p>
          <Link 
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors font-semibold"
          >
            Start Shopping
          </Link>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map(order => (
            <div key={order.id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-center gap-4 mb-3">
                    <h3 className="text-xl font-semibold text-gray-900">
                      Order #{order.id}
                    </h3>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(order.status)}`}>
                      {order.status?.charAt(0).toUpperCase() + order.status?.slice(1)}
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
                    <div>
                      <strong>Date:</strong> {new Date(order.createdAt || order.date).toLocaleDateString()}
                    </div>
                    <div>
                      <strong>Total:</strong> ${order.totalAmount || order.total}
                    </div>
                    <div>
                      <strong>Items:</strong> {order.items?.length || order.products?.length || 0}
                    </div>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">Order Items:</h4>
                      <div className="space-y-2">
                        {order.items.map((item, index) => (
                          <div key={index} className="flex items-center gap-3 text-sm">
                            <img 
                              src={item.image || item.thumbnail} 
                              alt={item.name || item.title}
                              className="w-10 h-10 object-cover rounded"
                              onError={(e) => {
                                e.target.src = "https://via.placeholder.com/40x40/4F46E5/FFFFFF?text=Prod";
                              }}
                            />
                            <span className="flex-1">{item.name || item.title}</span>
                            <span className="text-gray-900 font-medium">
                              ${item.price} x {item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <button
                    onClick={() => handleUpdateStatus(order.id, order.status)}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
                  >
                    {order.status === 'pending' ? 'Mark Complete' : 'Mark Pending'}
                  </button>
                  <button
                    onClick={() => handleDeleteOrder(order.id)}
                    className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors text-sm font-semibold"
                  >
                    Delete Order
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}