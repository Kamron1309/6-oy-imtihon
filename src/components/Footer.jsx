// src/components/Footer.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">🛍️ ZON.UZ</h3>
            <p className="text-gray-400">
              DummyJSON API va MockAPI integratsiyasi bilan ishlaydigan zamonaviy e-commerse demo loyihasi.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Tezkor Havolalar</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/" className="hover:text-white transition-colors">Bosh Sahifa</Link></li>
              <li><Link to="/shop" className="hover:text-white transition-colors">Do'kon</Link></li>
              <li><Link to="/search" className="hover:text-white transition-colors">Qidirish</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Hisob</h4>
            <ul className="space-y-2 text-gray-400">
              <li><Link to="/cart" className="hover:text-white transition-colors">Savatlar</Link></li>
              <li><Link to="/wishlist" className="hover:text-white transition-colors">Sevimlilar</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">API Lar</h4>
            <ul className="space-y-2 text-gray-400">
              <li><a href="https://dummyjson.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">DummyJSON</a></li>
              <li><a href="https://mockapi.io" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">MockAPI</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400">
          <p>© {new Date().getFullYear()} ZON.UZ — Demo Loyiha. O'quv maqsadlarida qurilgan.</p>
        </div>
      </div>
    </footer>
  );
}