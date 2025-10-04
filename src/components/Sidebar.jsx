import React from "react";
import { Link, useLocation } from "react-router-dom";

export default function Sidebar(){
  const location = useLocation();
  
  const categories = [
    'smartphones',
    'laptops', 
    'fragrances',
    'skincare',
    'groceries',
    'home-decoration',
    'furniture',
    'tops',
    'womens-dresses',
    'mens-shirts'
  ];

  const formatCategoryName = (name) => {
    return name.split('-').map(word => 
      word.charAt(0).toUpperCase() + word.slice(1)
    ).join(' ');
  };

  return (
    <aside className="w-full md:w-64 shrink-0">
      <div className="bg-white border border-gray-200 rounded-lg p-4 sticky top-24">
        <h4 className="font-semibold text-lg mb-4 text-gray-800">Categories</h4>
        <ul className="space-y-2">
          <li>
            <Link 
              to="/shop"
              className={`block px-3 py-2 rounded-lg transition-colors ${
                location.pathname === '/shop' 
                  ? 'bg-indigo-100 text-indigo-700 font-medium' 
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              All Products
            </Link>
          </li>
          {categories.map(category => (
            <li key={category}>
              <Link 
                to={`/category/${category}`}
                className={`block px-3 py-2 rounded-lg transition-colors ${
                  location.pathname === `/category/${category}` 
                    ? 'bg-indigo-100 text-indigo-700 font-medium' 
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                {formatCategoryName(category)}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  )
}