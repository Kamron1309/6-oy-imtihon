import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function Header(){
  const location = useLocation();
  const { data: wishlist } = useSelector(s => s.likeSlice);
  const { data: cart } = useSelector(s => s.localCartSlice);
  const { orders } = useSelector(s => s.orderSlice);

  const navItems = [
    { path: "/", label: "Home" },
    { path: "/shop", label: "Shop" },
    { path: "/wishlist", label: `Wishlist (${wishlist.length})` },
    { path: "/cart", label: `Cart (${cart.length})` },
    { path: "/orders", label: `Orders (${orders.length})` },
    { path: "/search", label: "Search" }
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-4 px-4">
        <Link to="/" className="text-2xl font-bold text-indigo-600">ZON.UZ</Link>
        
        <nav className="flex items-center gap-6">
          {navItems.map(item => (
            <Link 
              key={item.path}
              to={item.path} 
              className={`font-medium transition-colors ${
                location.pathname === item.path 
                  ? "text-indigo-600 border-b-2 border-indigo-600" 
                  : "text-gray-600 hover:text-indigo-500"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}