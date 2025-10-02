// src/pages/Cart.jsx
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts } from "../redux/cartSlice";
import { 
  removeFromCartLocal, 
  incrementQty, 
  decrementQty,
  clearLocalCart,
  fetchMarketProducts,
  fetchBuyurtmalar,
  removeFromMarketAPI,
  removeFromBuyurtmaAPI,
  clearBuyurtmalarAPI,
  clearMarketAPI,
  updateBuyurtmaAPI
} from "../redux/localCartSlice";
import { Link } from "react-router-dom";

export default function Cart() {
  const dispatch = useDispatch();
  const { carts, status } = useSelector(s => s.cartSlice);
  const { 
    data: localCart, 
    marketProducts, 
    buyurtmalar, 
    status: apiStatus 
  } = useSelector(s => s.localCartSlice);
  
  const [activeTab, setActiveTab] = useState('local');

  useEffect(() => { 
    dispatch(fetchCarts()); 
    dispatch(fetchMarketProducts());
    dispatch(fetchBuyurtmalar());
  }, [dispatch]);

  // Calculate totals
  const localTotal = localCart.reduce((total, item) => total + (item.price * item.qty), 0);
  const marketTotal = marketProducts.reduce((total, item) => total + (item.price || 0), 0);
  const buyurtmaTotal = buyurtmalar.reduce((total, item) => total + (item.totalPrice || item.price || 0), 0);
  const localTotalItems = localCart.reduce((total, item) => total + item.qty, 0);

  const handleRemoveFromMarket = async (id) => {
    try {
      await dispatch(removeFromMarketAPI(id)).unwrap();
      alert('✅ Mahsulot marketdan muvaffaqiyatli o\'chirildi!');
    } catch (error) {
      alert('❌ Marketdan o\'chirishda xatolik');
    }
  };

  const handleRemoveFromBuyurtma = async (id) => {
    try {
      await dispatch(removeFromBuyurtmaAPI(id)).unwrap();
      alert('✅ Buyurtma muvaffaqiyatli o\'chirildi!');
    } catch (error) {
      alert('❌ Buyurtmadan o\'chirishda xatolik');
    }
  };

  const handleUpdateBuyurtmaQuantity = async (id, newQuantity) => {
    if (newQuantity < 1) return;
    try {
      const buyurtma = buyurtmalar.find(item => item.id === id);
      if (buyurtma) {
        await dispatch(updateBuyurtmaAPI({
          id,
          updates: {
            quantity: newQuantity,
            totalPrice: (buyurtma.productPrice || buyurtma.price) * newQuantity
          }
        })).unwrap();
      }
    } catch (error) {
      alert('❌ Miqdorni yangilashda xatolik');
    }
  };

  const handleClearBuyurtmalar = async () => {
    if (window.confirm('Hamma buyurtmalarni o\'chirishni tasdiqlaysizmi?')) {
      try {
        await dispatch(clearBuyurtmalarAPI()).unwrap();
        alert('✅ Buyurtmalar muvaffaqiyatli tozalandi!');
      } catch (error) {
        alert('❌ Buyurtmalarni tozalashda xatolik');
      }
    }
  };

  const handleClearMarket = async () => {
    if (window.confirm('Marketdagi barcha mahsulotlarni o\'chirishni tasdiqlaysizmi?')) {
      try {
        await dispatch(clearMarketAPI()).unwrap();
        alert('✅ Market muvaffaqiyatli tozalandi!');
      } catch (error) {
        alert('❌ Marketni tozalashda xatolik');
      }
    }
  };

  const handleClearLocalCart = () => {
    if (window.confirm('Local savatni tozalashni tasdiqlaysizmi?')) {
      dispatch(clearLocalCart());
      alert('✅ Local savat tozalandi!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">🛒 Savatlar Boshqaruvi</h1>
      <p className="text-gray-600 mb-6">Turli xil saqlash tizimlaridagi savatlaringizni boshqaring</p>

      {/* Tabs */}
      <div className="flex flex-wrap gap-2 border-b mb-6">
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
            activeTab === 'local' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('local')}
        >
          📱 Local Savat ({localTotalItems})
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
            activeTab === 'market' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('market')}
        >
          🏪 Market ({marketProducts.length})
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
            activeTab === 'buyurtma' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('buyurtma')}
        >
          📦 Buyurtmalar ({buyurtmalar.length})
        </button>
        <button
          className={`px-4 py-2 font-semibold rounded-t-lg transition-colors ${
            activeTab === 'dummy' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
          onClick={() => setActiveTab('dummy')}
        >
          🎯 DummyJSON Savatlar ({carts.length})
        </button>
      </div>

      {/* Local Cart Tab */}
      {activeTab === 'local' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">📱 Local Saqlash Savati</h2>
            {localCart.length > 0 && (
              <button
                onClick={handleClearLocalCart}
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                🗑️ Savatni Tozalash
              </button>
            )}
          </div>

          {localCart.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Local savatingiz bo'sh</h3>
              <p className="text-gray-500 mb-4">Do'kondan mahsulot qo'shing</p>
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                🛍️ Xarid Qilishni Boshlash
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {localCart.map(item => (
                <div key={item.id} className="bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <img 
                        src={item.thumbnail || item.image} 
                        alt={item.title || item.name}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <Link 
                          to={`/product/${item.id}`}
                          className="font-semibold text-lg hover:text-blue-600 transition-colors"
                        >
                          {item.title || item.name}
                        </Link>
                        <p className="text-gray-600 text-sm">{item.brand}</p>
                        <p className="text-green-600 font-bold text-lg">${item.price}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      {/* Quantity Controls */}
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => dispatch(decrementQty(item.id))}
                          disabled={item.qty <= 1}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                            item.qty <= 1 
                              ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                              : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          -
                        </button>
                        <span className="font-semibold text-lg w-8 text-center">{item.qty}</span>
                        <button
                          onClick={() => dispatch(incrementQty(item.id))}
                          className="w-8 h-8 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      {/* Total Price */}
                      <div className="text-right">
                        <div className="font-bold text-lg text-green-600">
                          ${(item.price * item.qty).toFixed(2)}
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex gap-2">
                        <button
                          onClick={() => dispatch(removeFromCartLocal(item.id))}
                          className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          title="Savatdan o'chirish"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Local Cart Summary */}
              <div className="bg-white rounded-lg border p-6 mt-6">
                <div className="flex justify-between items-center mb-4">
                  <span className="text-xl font-semibold">Local Savat Jami:</span>
                  <span className="text-2xl font-bold text-green-600">${localTotal.toFixed(2)}</span>
                </div>
                <div className="flex gap-4">
                  <Link
                    to="/shop"
                    className="flex-1 text-center px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                  >
                    ← Xaridni Davom Ettirish
                  </Link>
                  <button
                    onClick={handleClearLocalCart}
                    className="flex-1 px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                  >
                    🗑️ Savatni Tozalash
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Market Tab */}
      {activeTab === 'market' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">🏪 Market Mahsulotlari</h2>
            <div className="flex items-center gap-4">
              <div className="text-lg font-semibold text-green-600">
                Jami: ${marketTotal.toFixed(2)}
              </div>
              {marketProducts.length > 0 && (
                <button
                  onClick={handleClearMarket}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  🗑️ Marketni Tozalash
                </button>
              )}
            </div>
          </div>

          {apiStatus === 'loading' ? (
            <div className="text-center py-8">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p>Market mahsulotlari yuklanmoqda...</p>
            </div>
          ) : marketProducts.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Marketda mahsulot yo'q</h3>
              <p className="text-gray-500 mb-4">Mahsulotlarni marketga saqlash uchun "Marketga Saqlash" tugmasidan foydalaning</p>
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                🛍️ Mahsulot Qo'shish
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {marketProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <img 
                    src={product.thumbnail || product.image} 
                    alt={product.title || product.name}
                    className="w-full h-48 object-cover rounded-lg mb-3"
                  />
                  <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title || product.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{product.brand}</p>
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-green-600 font-bold text-lg">${product.price}</span>
                    {product.rating && (
                      <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                        ⭐ {product.rating}
                      </span>
                    )}
                  </div>
                  <div className="text-xs text-gray-500 mb-3">
                    Qo'shilgan: {new Date(product.createdAt).toLocaleDateString()}
                  </div>
                  <button
                    onClick={() => handleRemoveFromMarket(product.id)}
                    className="w-full bg-red-600 text-white py-2 rounded-lg hover:bg-red-700 transition-colors font-semibold"
                  >
                    🗑️ Marketdan O'chirish
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Buyurtmalar Tab */}
      {activeTab === 'buyurtma' && (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold">📦 Mening Buyurtmalarim</h2>
            {buyurtmalar.length > 0 && (
              <div className="flex items-center gap-4">
                <div className="text-lg font-semibold text-green-600">
                  Jami: ${buyurtmaTotal.toFixed(2)}
                </div>
                <button
                  onClick={handleClearBuyurtmalar}
                  className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  🗑️ Hammasini O'chirish
                </button>
              </div>
            )}
          </div>

          {apiStatus === 'loading' ? (
            <div className="text-center py-8">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p>Buyurtmalar yuklanmoqda...</p>
            </div>
          ) : buyurtmalar.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg border-2 border-dashed border-gray-300">
              <div className="text-gray-400 mb-4">
                <svg className="w-16 h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                    d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Buyurtmalar yo'q</h3>
              <p className="text-gray-500 mb-4">Mahsulotlarni buyurtma qilish uchun "Buyurtma" tugmasidan foydalaning</p>
              <Link
                to="/shop"
                className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                🛍️ Buyurtma Berish
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {buyurtmalar.map(buyurtma => (
                <div key={buyurtma.id} className="bg-white rounded-lg border p-4 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-4 flex-1">
                      <img 
                        src={buyurtma.productImage || buyurtma.thumbnail} 
                        alt={buyurtma.productName || buyurtma.title}
                        className="w-20 h-20 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg mb-1">{buyurtma.productName || buyurtma.title}</h3>
                        <p className="text-gray-600 text-sm mb-2">{buyurtma.brand}</p>
                        <p className="text-green-600 font-bold">
                          ${buyurtma.productPrice || buyurtma.price} × {buyurtma.quantity}
                        </p>
                        <p className="text-xs text-gray-500">
                          📋 Buyurtma ID: {buyurtma.orderId} | 
                          📅 Sana: {new Date(buyurtma.orderDate).toLocaleDateString()} |
                          🚦 Holati: <span className={`font-semibold ${
                            buyurtma.status === 'completed' ? 'text-green-600' : 
                            buyurtma.status === 'pending' ? 'text-yellow-600' : 'text-red-600'
                          }`}>
                            {buyurtma.status || 'pending'}
                          </span>
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-3">
                        <button
                          onClick={() => handleUpdateBuyurtmaQuantity(buyurtma.id, buyurtma.quantity - 1)}
                          disabled={buyurtma.quantity <= 1}
                          className={`w-8 h-8 rounded-full border flex items-center justify-center transition-colors ${
                            buyurtma.quantity <= 1 
                              ? 'border-gray-300 text-gray-400 cursor-not-allowed' 
                              : 'border-blue-600 text-blue-600 hover:bg-blue-50'
                          }`}
                        >
                          -
                        </button>
                        <span className="font-semibold text-lg w-8 text-center">{buyurtma.quantity}</span>
                        <button
                          onClick={() => handleUpdateBuyurtmaQuantity(buyurtma.id, buyurtma.quantity + 1)}
                          className="w-8 h-8 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-colors flex items-center justify-center"
                        >
                          +
                        </button>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-lg text-green-600">
                          ${buyurtma.totalPrice?.toFixed(2) || (buyurtma.price * buyurtma.quantity).toFixed(2)}
                        </div>
                        <div className="text-sm text-gray-600">Jami</div>
                      </div>

                      <button
                        onClick={() => handleRemoveFromBuyurtma(buyurtma.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        title="Buyurtmani bekor qilish"
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
          )}
        </div>
      )}

      {/* DummyJSON Carts Tab */}
      {activeTab === 'dummy' && (
        <div>
          <h2 className="text-2xl font-semibold mb-6">🎯 DummyJSON Namuna Savatlari</h2>
          
          {status === 'loading' ? (
            <div className="text-center py-8">
              <div className="loading-spinner mx-auto mb-4"></div>
              <p>Namuna savatlari yuklanmoqda...</p>
            </div>
          ) : (
            <div className="space-y-6">
              {carts.map(cart => (
                <div key={cart.id} className="bg-white rounded-lg border p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-semibold">Savat #{cart.id}</h3>
                      <p className="text-gray-600">Foydalanuvchi ID: {cart.userId}</p>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">${cart.total}</div>
                      <div className="text-sm text-gray-600">
                        {cart.totalProducts} mahsulot • {cart.totalQuantity} dona
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-semibold mb-3">Savatdagi mahsulotlar:</h4>
                    <div className="space-y-3">
                      {cart.products.map(product => (
                        <div key={product.id} className="flex items-center justify-between py-2 border-b last:border-b-0">
                          <div className="flex items-center gap-3">
                            <img 
                              src={product.thumbnail} 
                              alt={product.title}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div>
                              <div className="font-medium">{product.title}</div>
                              <div className="text-sm text-gray-600">
                                Miqdor: {product.quantity} × ${product.price}
                              </div>
                            </div>
                          </div>
                          <div className="font-semibold text-green-600">
                            ${(product.quantity * product.price).toFixed(2)}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}