import React, { useEffect, useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/productSlice";
import { addToCartLocal } from "../redux/localCartSlice";
import { addToLike, removeFromLike } from "../redux/like-Slice";

export default function ProductDetail(){
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { productDetail, status } = useSelector(s => s.productSlice);
  const { data: wishlist } = useSelector(s => s.likeSlice);
  
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => { 
    dispatch(fetchProductById(id)); 
  }, [dispatch, id]);

  if (status === 'loading') {
    return (
      <div className="container mx-auto py-8">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-200 rounded-xl h-96"></div>
            <div className="space-y-4">
              <div className="bg-gray-200 h-8 rounded"></div>
              <div className="bg-gray-200 h-4 rounded"></div>
              <div className="bg-gray-200 h-6 rounded w-24"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!productDetail) {
    return (
      <div className="container mx-auto py-12 text-center">
        <h2 className="text-3xl font-bold text-gray-600 mb-4">Product Not Found</h2>
        <p className="text-gray-500 mb-8">The product you're looking for doesn't exist.</p>
        <button 
          onClick={() => navigate(-1)}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
        >
          Go Back
        </button>
      </div>
    );
  }

  const isInWishlist = wishlist.find(item => item.id === productDetail.id);
  const images = [productDetail.thumbnail, ...(productDetail.images || [])];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCartLocal(productDetail));
    }
  };

  const handleWishlist = () => {
    if (isInWishlist) {
      dispatch(removeFromLike(productDetail.id));
    } else {
      dispatch(addToLike(productDetail));
    }
  };

  return (
    <div className="container mx-auto py-8">
      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-indigo-600 capitalize">{productDetail.category}</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium line-clamp-1">{productDetail.title}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-xl border border-gray-200 p-4 mb-4">
            <img
              src={images[selectedImage]}
              alt={productDetail.title}
              className="w-full h-96 object-contain rounded-lg"
            />
          </div>
          <div className="flex gap-3 overflow-x-auto pb-2">
            {images.map((image, index) => (
              <button
                key={index}
                onClick={() => setSelectedImage(index)}
                className={`flex-shrink-0 w-20 h-20 border-2 rounded-lg overflow-hidden transition-all ${
                  selectedImage === index 
                    ? "border-indigo-500 ring-2 ring-indigo-200" 
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <img
                  src={image}
                  alt={`${productDetail.title} ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              {productDetail.title}
            </h1>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className={`w-5 h-5 ${
                      i < Math.floor(productDetail.rating)
                        ? "text-yellow-400"
                        : "text-gray-300"
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-gray-600 font-medium">
                  {productDetail.rating} • {productDetail.reviews || 0} reviews
                </span>
              </div>
              
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                productDetail.stock > 0 
                  ? "bg-green-100 text-green-800" 
                  : "bg-red-100 text-red-800"
              }`}>
                {productDetail.stock > 0 ? `${productDetail.stock} in stock` : 'Out of stock'}
              </span>
            </div>

            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-green-600">
                ${productDetail.price}
              </span>
              {productDetail.discountPercentage && (
                <span className="text-xl text-red-500 line-through">
                  ${(productDetail.price / (1 - productDetail.discountPercentage/100)).toFixed(2)}
                </span>
              )}
              {productDetail.discountPercentage && (
                <span className="bg-red-500 text-white px-2 py-1 rounded text-sm font-semibold">
                  Save {Math.round(productDetail.discountPercentage)}%
                </span>
              )}
            </div>
          </div>

          <p className="text-gray-700 text-lg leading-relaxed">
            {productDetail.description}
          </p>

          <div className="space-y-3">
            <div className="flex">
              <span className="font-semibold text-gray-900 w-32">Brand:</span>
              <span className="text-gray-700">{productDetail.brand}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-900 w-32">Category:</span>
              <span className="text-gray-700 capitalize">{productDetail.category}</span>
            </div>
            <div className="flex">
              <span className="font-semibold text-gray-900 w-32">SKU:</span>
              <span className="text-gray-700">#{productDetail.id}</span>
            </div>
          </div>

          {/* Quantity and Actions */}
          <div className="space-y-4 pt-6">
            <div className="flex items-center gap-4">
              <span className="font-semibold">Quantity:</span>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  -
                </button>
                <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
                >
                  +
                </button>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                disabled={productDetail.stock === 0}
                className="flex-1 bg-green-600 text-white py-4 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold text-lg"
              >
                {productDetail.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
              </button>
              
              <button
                onClick={handleWishlist}
                className={`flex items-center justify-center w-14 h-14 border-2 rounded-lg text-lg transition-colors ${
                  isInWishlist 
                    ? "text-red-500 border-red-500 bg-red-50 hover:bg-red-100" 
                    : "text-gray-600 border-gray-300 hover:bg-gray-50"
                }`}
              >
                {isInWishlist ? '❤️' : '🤍'}
              </button>
            </div>
          </div>

          {/* Features */}
          <div className="border-t border-gray-200 pt-6">
            <h3 className="font-semibold text-gray-900 mb-4 text-lg">Product Features</h3>
            <ul className="text-gray-600 space-y-2">
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Free shipping on orders over $50
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                30-day return policy
              </li>
              <li className="flex items-center">
                <svg className="w-5 h-5 text-green-500 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                Secure payment processing
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}