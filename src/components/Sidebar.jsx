// src/components/Sidebar.jsx
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchProductsByCategory } from "../redux/productSlice";

export default function Sidebar() {
  const dispatch = useDispatch();
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('https://dummyjson.com/products/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback categories
        setCategories([
          'smartphones', 'laptops', 'fragrances', 'skincare', 
          'groceries', 'home-decoration', 'furniture', 'tops'
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (category) => {
    dispatch(fetchProductsByCategory(category));
  };

  if (loading) {
    return (
      <aside className="w-full md:w-64">
        <div className="border rounded p-4 bg-white shadow-sm">
          <h4 className="font-semibold mb-3 text-gray-900">Kategoriyalar</h4>
          <div className="space-y-2">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="h-6 bg-gray-200 rounded animate-pulse"></div>
            ))}
          </div>
        </div>
      </aside>
    );
  }

  return (
    <aside className="w-full md:w-64">
      <div className="border rounded p-4 bg-white shadow-sm sticky top-24">
        <h4 className="font-semibold mb-3 text-lg text-gray-900">📁 Kategoriyalar</h4>
        <ul className="space-y-2">
          {categories.map((category, index) => (
            <li key={index}>
              <Link 
                to={`/category/${typeof category === 'string' ? category : category.slug}`}
                onClick={() => handleCategoryClick(typeof category === 'string' ? category : category.slug)}
                className="block py-2 px-3 text-gray-700 hover:bg-blue-50 hover:text-blue-600 rounded-lg transition-colors capitalize"
              >
                {typeof category === 'string' ? category : category.name}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}