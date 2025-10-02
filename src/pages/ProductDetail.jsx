// src/pages/ProductDetail.jsx
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/productSlice";
import { addToCartLocal } from "../redux/localCartSlice";
import { addToLike, removeFromLike } from "../redux/likeSlice";
import { addToMarketCart } from "../redux/marketSlice";
import { Link } from "react-router-dom";

export default function ProductDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail, status } = useSelector(s => s.productSlice);
  const { data: likes } = useSelector(s => s.likeSlice);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => { 
    dispatch(fetchProductById(id)); 
  }, [dispatch, id]);

  const isLiked = productDetail ? likes.some(item => item.id === productDetail.id) : false;

  const handleAddToLocalCart = () => {
    for (let i = 0; i < quantity; i++) {
      dispatch(addToCartLocal(productDetail));
    }
    alert(`✅ ${quantity} ta mahsulot local savatga qo'shildi!`);
  };

  const handleAddToMarket = async () => {
    try {
      await dispatch(addToMarketCart({
        ...productDetail,
        quantity: quantity,
        total: productDetail.price * quantity
      })).unwrap();
      alert('✅ Mahsulot marketga muvaffaqiyatli saqlandi!');
    } catch (error) {
      console.error('Error adding to market:', error);
      alert('❌ Marketga saqlashda xatolik yuz berdi');
    }
  };

  const handleAddToBuyurtma = async () => {
    try {
      // Buyurtma API ga qo'shish - agar alohida API bo'lsa
      const response = await fetch('https://68a6b3c3639c6a54e99f8b80.mockapi.io/dustim/buyurtma', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...productDetail,
          quantity: quantity,
          total: productDetail.price * quantity,
          orderedAt: new Date().toISOString(),
          status: 'pending'
        }),
      });
      
      if (response.ok) {
        alert(`✅ ${quantity} ta mahsulot buyurtmaga qo'shildi!`);
      } else {
        throw new Error('Server error');
      }
    } catch (error) {
      console.error('Error adding to buyurtma:', error);
      alert('❌ Buyurtmaga qoshishda xatolik yuz berdi');
    }
  };

  const handleToggleLike = () => {
    if (isLiked) {
      dispatch(removeFromLike(productDetail.id));
    } else {
      dispatch(addToLike(productDetail));
    }
  };

  const incrementQuantity = () => setQuantity(prev => prev + 1);
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1));

  if (status === 'loading') {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-gray-300 h-96 rounded-lg"></div>
            <div className="space-y-4">
              <div className="bg-gray-300 h-8 rounded w-3/4"></div>
              <div className="bg-gray-300 h-4 rounded w-full"></div>
              <div className="bg-gray-300 h-4 rounded w-2/3"></div>
              <div className="bg-gray-300 h-6 rounded w-1/4"></div>
              <div className="bg-gray-300 h-12 rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!productDetail) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <h2 className="text-2xl font-bold text-gray-600 mb-4">Mahsulot topilmadi</h2>
        <Link to="/shop" className="text-blue-600 hover:text-blue-700">
          Do'konga Qaytish
        </Link>
      </div>
    );
  }

  const images = productDetail.images || [productDetail.thumbnail || productDetail.image];

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="flex mb-6 text-sm text-gray-600">
        <Link to="/" className="hover:text-blue-600">Bosh Sahifa</Link>
        <span className="mx-2">/</span>
        <Link to="/shop" className="hover:text-blue-600">Do'kon</Link>
        <span className="mx-2">/</span>
        <span className="text-gray-900">{productDetail.title || productDetail.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Images */}
        <div>
          <div className="bg-white rounded-lg border p-4 mb-4">
            <img 
              src={images[selectedImage]} 
              alt={productDetail.title || productDetail.name}
              className="w-full h-96 object-contain rounded-lg"
            />
          </div>
          
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-2">
              {images.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`border-2 rounded-lg overflow-hidden transition-all ${
                    selectedImage === index ? 'border-blue-600' : 'border-gray-300'
                  }`}
                >
                  <img 
                    src={img} 
                    alt={`${productDetail.title} ${index + 1}`}
                    className="w-full h-20 object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {productDetail.title || productDetail.name}
            </h1>
            <div className="flex items-center gap-4 mb-4">
              {productDetail.rating && (
                <div className="flex items-center gap-1 bg-yellow-100 text-yellow-800 px-3 py-1 rounded-full">
                  <span>⭐</span>
                  <span className="font-semibold">{productDetail.rating}</span>
                </div>
              )}
              <span className="text-gray-600">Brend: {productDetail.brand}</span>
              <span className="text-gray-600">Kategoriya: {productDetail.category}</span>
            </div>
          </div>

          <div className="text-3xl font-bold text-green-600">
            ${productDetail.price}
            {productDetail.discountPercentage && (
              <span className="ml-2 text-sm text-red-600 line-through">
                ${(productDetail.price / (1 - productDetail.discountPercentage/100)).toFixed(2)}
              </span>
            )}
          </div>

          {productDetail.discountPercentage && (
            <div className="bg-red-100 text-red-800 px-3 py-2 rounded-lg inline-block">
              🎉 {Math.round(productDetail.discountPercentage)}% chegirma 
            </div>
          )}

          <p className="text-gray-700 leading-relaxed">
            {productDetail.description}
          </p>

          <div className="grid grid-cols-2 gap-4 text-sm">
            {productDetail.stock !== undefined && (
              <div>
                <strong>Mavjudligi:</strong>{' '}
                <span className={productDetail.stock > 0 ? 'text-green-600' : 'text-red-600'}>
                  {productDetail.stock > 0 ? `Sotuvda (${productDetail.stock})` : 'Tugagan'}
                </span>
              </div>
            )}
            {productDetail.brand && (
              <div>
                <strong>Brend:</strong> {productDetail.brand}
              </div>
            )}
            {productDetail.category && (
              <div>
                <strong>Kategoriya:</strong> {productDetail.category}
              </div>
            )}
          </div>

          {/* Quantity Selector */}
          <div className="flex items-center gap-4">
            <span className="font-semibold">Miqdor:</span>
            <div className="flex items-center gap-3">
              <button
                onClick={decrementQuantity}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                -
              </button>
              <span className="text-xl font-semibold w-8 text-center">{quantity}</span>
              <button
                onClick={incrementQuantity}
                className="w-10 h-10 rounded-full border border-gray-300 flex items-center justify-center hover:bg-gray-50 transition-colors"
              >
                +
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <button
              onClick={handleAddToLocalCart}
              disabled={productDetail.stock === 0}
              className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              Local Savatga ({quantity})
            </button>
            
            <button
              onClick={handleAddToBuyurtma}
              disabled={productDetail.stock === 0}
              className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
              </svg>
              Buyurtma Berish
            </button>

            <button
              onClick={handleAddToMarket}
              disabled={productDetail.stock === 0}
              className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors font-semibold flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              Marketga
            </button>
            
            <button
              onClick={handleToggleLike}
              className={`p-3 rounded-lg border transition-colors flex items-center justify-center ${
                isLiked 
                  ? 'bg-red-500 text-white border-red-500' 
                  : 'bg-white text-gray-700 border-gray-300 hover:bg-red-50 hover:text-red-600'
              }`}
            >
              <svg className="w-6 h-6" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>
          </div>

          {/* Additional Info */}
          <div className="border-t pt-6">
            <h3 className="font-semibold mb-3">Mahsulot Tafsilotlari</h3>
            <ul className="space-y-2 text-sm text-gray-600">
              <li>✅ $50 dan ortiq buyurtmalarda bepul yetkazib berish</li>
              <li>✅ 30 kunlik qaytarish siyosati</li>
              <li>✅ Xavfsiz to'lov tizimi</li>
              <li>✅ 24/7 mijozlar xizmati</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}