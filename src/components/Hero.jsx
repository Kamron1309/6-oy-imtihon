import React from "react";
import { Link } from "react-router-dom";

export default function Hero(){
  return (
    <section className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white py-16 mb-8">
      <div className="container mx-auto text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to ZON.UZ</h1>
        <p className="text-xl opacity-90 mb-6 max-w-2xl mx-auto">
          Discover amazing products at great prices. Shop with confidence and enjoy fast delivery.
        </p>
        <div className="flex gap-4 justify-center">
          <Link 
            to="/shop" 
            className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
          >
            Start Shopping
          </Link>
          <Link 
            to="/search" 
            className="border-2 border-white text-white px-6 py-3 rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition-colors"
          >
            Search Products
          </Link>
        </div>
      </div>
    </section>
  )
}