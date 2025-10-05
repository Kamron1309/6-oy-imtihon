import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToLike, removeFromLike } from "../redux/like-Slice.js";
import { addToCartLocal } from "../redux/localCartSlice.js";
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

  // Ikkala API strukturasiga moslashtirish
  const getProductImage = () => {
    if (product.images && product.images.length > 0) {
      return product.images[0];
    }
    if (product.image) return product.image;
    if (product.thumbnail) return product.thumbnail;
    return "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=No+Image";
  };

  const getProductTitle = () => {
    return product.title || product.name || "No Title";
  };

  const getProductPrice = () => {
    return product.price || 0;
  };

  const getProductRating = () => {
    return product.rating || 0;
  };

  const getProductBrand = () => {
    return product.brand || "Unknown Brand";
  };

  const getProductDescription = () => {
    return product.description || "No description available";
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden group">
      <Link to={`/product/${product.id}`} className="block relative">
        <img 
          src={getProductImage()} 
          alt={getProductTitle()} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.target.src = "https://via.placeholder.com/300x200/4F46E5/FFFFFF?text=No+Image";
          }}
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
        {product.discount && (
          <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
            -{product.discount}%
          </div>
        )}
      </Link>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-800 line-clamp-2 mb-2 hover:text-indigo-600 transition-colors">
            {getProductTitle()}
          </h3>
        </Link>
        
        <p className="text-sm text-gray-600 mb-2">{getProductBrand()}</p>
        
        <div className="flex items-center justify-between mb-3">
          <div>
            <span className="text-lg font-bold text-green-600">${getProductPrice()}</span>
            {(product.discountPercentage || product.discount) && (
              <span className="text-sm text-gray-500 line-through ml-2">
                ${(getProductPrice() / (1 - (product.discountPercentage || product.discount)/100)).toFixed(2)}
              </span>
            )}
          </div>
          <div className="flex items-center text-sm text-gray-600">
            ⭐ {getProductRating()}
          </div>
        </div>
        
        <p className="text-sm text-gray-600 mb-3 line-clamp-2">
          {getProductDescription()}
        </p>
        
        <button 
          onClick={handleAddToCart}
          className="w-full bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors font-semibold text-sm"
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}