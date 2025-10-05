import React, { useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard.jsx";
import { fetchProducts } from "../redux/productSlice.js";

export default function Category(){
  const { name } = useParams();
  const dispatch = useDispatch();
  const { products, status, apiSource } = useSelector(s => s.productSlice);

  useEffect(() => { 
    dispatch(fetchProducts()); 
  }, [dispatch]);

  // MockAPI da kategoriya bo'yicha filtrlash
  const filteredProducts = products.filter(p => 
    p.category?.toLowerCase() === name?.toLowerCase() || 
    p.name?.toLowerCase().includes(name?.toLowerCase()) ||
    p.title?.toLowerCase().includes(name?.toLowerCase())
  );

  const formattedName = name?.replace(/-/g, " ");

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      {/* API Status */}
      <div className="mb-6">
        <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
          apiSource === 'mockapi' 
            ? 'bg-green-100 text-green-800' 
            : 'bg-blue-100 text-blue-800'
        }`}>
          Data Source: {apiSource === 'mockapi' ? 'MockAPI' : 'DummyJSON'}
        </span>
      </div>

      {/* Breadcrumb */}
      <nav className="flex items-center space-x-2 text-sm text-gray-500 mb-8">
        <Link to="/" className="hover:text-indigo-600">Home</Link>
        <span>/</span>
        <Link to="/shop" className="hover:text-indigo-600">Shop</Link>
        <span>/</span>
        <span className="text-gray-900 font-medium capitalize">{formattedName}</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2 capitalize">{formattedName}</h1>
        {status === 'succeeded' && (
          <p className="text-gray-600">{filteredProducts.length} products found</p>
        )}
      </div>

      {/* Products Grid */}
      {status === 'loading' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
          ))}
        </div>
      ) : filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">No products found</h3>
          <p className="text-gray-500 mb-6">No products available in this category.</p>
          <Link to="/shop" className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors">
            Back to Shop
          </Link>
        </div>
      )}
    </div>
  );
}