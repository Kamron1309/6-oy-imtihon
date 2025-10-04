import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import { Link } from "react-router-dom";

export default function Home(){
  const dispatch = useDispatch();
  const { products, status } = useSelector(s => s.productSlice);

  useEffect(() => { 
    dispatch(fetchProducts()); 
  }, [dispatch]);

  const featuredProducts = products.slice(0, 8);

  return (
    <div>
      <Hero />
      
      <div className="container mx-auto py-12">
        {/* Featured Products */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900">Featured Products</h2>
            <Link to="/shop" className="text-indigo-600 hover:text-indigo-700 font-semibold">
              View All Products →
            </Link>
          </div>

          {status === 'loading' ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-gray-200 rounded-xl h-80 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {featuredProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>

        {/* Categories Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Popular Categories</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {['smartphones', 'laptops', 'fragrances', 'skincare', 'groceries', 'home-decoration'].map(category => (
              <Link 
                key={category}
                to={`/category/${category}`}
                className="bg-white border border-gray-200 rounded-lg p-4 text-center hover:shadow-md transition-shadow hover:border-indigo-300 group"
              >
                <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-3 group-hover:bg-indigo-200 transition-colors">
                  <span className="text-lg">📱</span>
                </div>
                <span className="font-medium text-gray-800 capitalize">
                  {category.replace('-', ' ')}
                </span>
              </Link>
            ))}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-8 text-white text-center">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold mb-2">{products.length}+</div>
              <div className="text-indigo-100">Products Available</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">100%</div>
              <div className="text-indigo-100">Secure Payment</div>
            </div>
            <div>
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-indigo-100">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}