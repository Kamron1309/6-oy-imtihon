import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { searchProducts } from "../redux/productSlice";

export default function Search(){
  const [query, setQuery] = useState('');
  const dispatch = useDispatch();
  const { products, status } = useSelector(s => s.productSlice);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    dispatch(searchProducts(query));
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-2">Search Products</h1>
      <p className="text-gray-600 mb-8">Find your favorite products from our catalog</p>

      {/* Search Form */}
      <form onSubmit={handleSearch} className="mb-8">
        <div className="flex gap-2 max-w-2xl">
          <input 
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search for products, brands, categories..."
            className="flex-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
          <button 
            type="submit"
            className="bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors font-semibold whitespace-nowrap"
          >
            Search
          </button>
        </div>
      </form>

      {/* Search Results */}
      {status === 'loading' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
          ))}
        </div>
      ) : products.length > 0 ? (
        <div>
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">
              Search Results for "{query}"
            </h2>
            <span className="text-gray-600">{products.length} products found</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      ) : query ? (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">No products found</h3>
          <p className="text-gray-500 mb-6">
            No results found for "<span className="font-semibold">{query}</span>". Try different keywords.
          </p>
          <div className="space-y-2 text-sm text-gray-600">
            <p>Try searching for:</p>
            <div className="flex gap-2 justify-center flex-wrap">
              {['iphone', 'laptop', 'perfume', 'skincare', 'groceries'].map(keyword => (
                <button
                  key={keyword}
                  onClick={() => setQuery(keyword)}
                  className="bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded transition-colors"
                >
                  {keyword}
                </button>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
          <h3 className="text-2xl font-semibold text-gray-600 mb-4">Start Searching</h3>
          <p className="text-gray-500">Enter a search term above to find products.</p>
        </div>
      )}
    </div>
  );
}