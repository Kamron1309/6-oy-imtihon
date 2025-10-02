// src/components/ProductCard.jsx
import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addToLike, toggleLike } from "../redux/likeSlice";
import { addToCartLocal, addToMarketAPI, addToBuyurtmaAPI } from "../redux/localCartSlice";

export default function ProductCard({ product }) {
  const dispatch = useDispatch();
  const { data: likes } = useSelector(s => s.likeSlice);
  
  const isLiked = likes.some(item => item.id === product.id);

  const handleAddToLocalCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCartLocal(product));
  };

  const handleAddToMarket = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await dispatch(addToMarketAPI(product)).unwrap();
      alert('✅ Mahsulot marketga muvaffaqiyatli qo\'shildi!');
    } catch (error) {
      console.error('Error adding to market:', error);
      alert('❌ Marketga qo\'shishda xatolik yuz berdi');
    }
  };

  const handleAddToBuyurtma = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    try {
      await dispatch(addToBuyurtmaAPI({
        ...product,
        quantity: 1,
        productName: product.title || product.name,
        productPrice: product.price,
        productImage: product.thumbnail || product.image
      })).unwrap();
      alert('✅ Buyurtmaga muvaffaqiyatli qo\'shildi!');
    } catch (error) {
      console.error('Error adding to buyurtma:', error);
      alert('❌ Buyurtmaga qo\'shishda xatolik yuz berdi');
    }
  };

  const handleToggleLike = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(toggleLike(product));
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-full fade-in">
      <Link to={`/product/${product.id}`} className="block mb-3 flex-1">
        <div className="relative">
          <img 
            src={product.thumbnail || product.image} 
            alt={product.title || product.name} 
            className="w-full h-48 object-cover rounded-lg mb-3"
          />
          {product.discountPercentage && (
            <span className="absolute top-2 left-2 bg-red-600 text-white px-2 py-1 rounded text-sm font-semibold">
              -{Math.round(product.discountPercentage)}%
            </span>
          )}
          <button
            onClick={handleToggleLike}
            className={`absolute top-2 right-2 p-2 rounded-full transition-colors ${
              isLiked 
                ? 'bg-red-500 text-white' 
                : 'bg-white/90 text-gray-600 hover:bg-red-500 hover:text-white'
            }`}
          >
            <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
        
        <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
          {product.title || product.name}
        </h3>
        <p className="text-sm text-gray-600 mb-2">{product.brand}</p>
        <p className="text-xs text-gray-500 line-clamp-2 mb-3">
          {product.description}
        </p>
      </Link>

      <div className="mt-auto">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-green-600">
              ${product.price}
            </span>
            {product.discountPercentage && (
              <span className="text-sm text-gray-500 line-through">
                ${(product.price / (1 - product.discountPercentage/100)).toFixed(2)}
              </span>
            )}
          </div>
          {product.rating && (
            <div className="flex items-center gap-1 text-sm bg-yellow-100 text-yellow-800 px-2 py-1 rounded">
              ⭐ {product.rating}
            </div>
          )}
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button 
            onClick={handleAddToLocalCart}
            className="bg-green-600 text-white py-2 px-3 rounded-lg hover:bg-green-700 transition-colors text-sm font-semibold"
          >
            Savatga
          </button>
          <button 
            onClick={handleAddToBuyurtma}
            className="bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-semibold"
          >
            Buyurtma
          </button>
          <button 
            onClick={handleAddToMarket}
            className="col-span-2 bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors text-sm font-semibold"
          >
            Marketga Saqlash
          </button>
        </div>
      </div>
    </div>
  );
}