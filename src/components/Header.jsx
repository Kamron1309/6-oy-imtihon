import React from "react";
import { Link } from "react-router-dom";

export default function Header(){
  return (
    <header className="bg-white shadow-sm">
      <div className="container flex items-center justify-between py-4">
        <Link to="/" className="text-2xl font-bold">ZON.UZ</Link>
        <nav className="flex items-center gap-4">
          <Link to="/shop">Shop</Link>
          <Link to="/wishlist">Wishlist</Link>
          <Link to="/cart">Cart</Link>
          <Link to="/search">Search</Link>
        </nav>
      </div>
    </header>
  )
}
