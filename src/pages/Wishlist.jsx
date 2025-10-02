// src/pages/Wishlist.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import { clearLikes } from "../redux/likeSlice";

export default function Wishlist() {
  const { data } = useSelector(s => s.likeSlice);
  const dispatch = useDispatch();

  const handleClearWishlist = () => {
    if (window.confirm('Sevimlilar ro\'yxatini tozalashni tasdiqlaysizmi?')) {
      dispatch(clearLikes());
      alert('✅ Sevimlilar ro\'yxati tozalandi!');
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold">❤️ Mening Sevimlilarim</h1>
          <p className="text-gray-600 mt-1">
            {data.length} {data.length === 1 ? 'ta mahsulot' : 'ta mahsulot'} saqlangan
          </p>
        </div>
        
        {data.length > 0 && (
          <button
            onClick={handleClearWishlist}
            className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            🗑️ Ro'yxatni Tozalash
          </button>
        )}
      </div>

      {data.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-lg border-2 border-dashed border-gray-300">
          <div className="text-gray-400 mb-4">
            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-600 mb-2">Sevimlilar ro'yxatingiz bo'sh</h3>
          <p className="text-gray-500 mb-6 max-w-md mx-auto">
            Sevimli mahsulotlaringizni shu yerda saqlang va ularni keyinroq savatga qo'shish uchun osongina toping.
          </p>
          <Link
            to="/shop"
            className="inline-flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            🔍 Mahsulotlarni Ko'rish
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {data.map(product => (
            <div key={product.id} className="relative">
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}