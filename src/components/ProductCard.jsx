import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToLike, removeFromLike } from "../redux/like-Slice";
import { addToCartLocal } from "../redux/localCartSlice";
import { useSelector } from "react-redux";

export default function ProductCard({ product }){
  const dispatch = useDispatch();
  const { data: wishlist } = useSelector(s => s.likeSlice);
  
  const isInWishlist = wishlist.find(item => item.id === product.id);
  
  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromLike(product.id));
    } else {
      dispatch(addToLike(product));
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    dispatch(addToCartLocal(product));
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block relative">
        <img 
          src={product.thumbnail} 
          alt={product.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-3 right-3">
          <button 
            onClick={handleWishlist}
            className={`p-2 rounded-full backdrop-blur-sm transition-all ${
              isInWishlist 
                ? "bg-red-500 text-white" 
                : "bg-white/80 text-gray-600 hover:bg-white"
            }`}
          >
            {isInWishlist ? "❤️" : "🤍"}
          </button>
        </div>
        {product.discountPercentage && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            -{Math.round(product.discountPercentage)}%
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-indigo-600 transition-colors">
            {product.title}
          </h3>
        </Link>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-green-600">${product.price}</span>
            {product.discountPercentage && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${(product.price / (1 - product.discountPercentage/100)).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            ⭐ {product.rating}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex gap-2">
          <button 
            onClick={handleAddToCart}
            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  )
}