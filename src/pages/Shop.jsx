import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice.js";
import ProductCard from "../components/ProductCard.jsx";
import Sidebar from "../components/Sidebar.jsx";

export default function Shop(){
  const dispatch = useDispatch();
  const { products, status, apiSource } = useSelector(s => s.productSlice);

  useEffect(() => { 
    dispatch(fetchProducts()); 
  }, [dispatch]);

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

      <div className="flex flex-col md:flex-row gap-8">
        {/* Sidebar */}
        <Sidebar />
        
        {/* Main Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">All Products</h1>
              {status === 'succeeded' && (
                <p className="text-gray-600">{products.length} products available</p>
              )}
            </div>
            
            {/* Sort Options */}
            <select className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500">
              <option>Sort by: Featured</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
              <option>Rating: High to Low</option>
            </select>
          </div>

          {/* Products Grid */}
          {status === 'loading' ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {[...Array(12)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}