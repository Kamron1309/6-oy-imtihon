import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import ProductCard from "../components/ProductCard";
import SkeletonComponent from "../components/SkeletonComponent";
import { searchProducts, fetchProducts } from "../redux/productSlice";

function Search() {
  const [q, setQ] = useState('');
  const dispatch = useDispatch();
  const { products, status } = useSelector(s => s.productSlice);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const searchQuery = searchParams.get('q');
    if (searchQuery) {
      setQ(searchQuery);
      dispatch(searchProducts(searchQuery));
    }
  }, [location.search, dispatch]);

  const onSearch = (e) => {
    e.preventDefault();
    if(!q.trim()) {
      dispatch(fetchProducts());
      return;
    }
    dispatch(searchProducts(q));
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Mahsulotlarni Qidirish</h2>
      <form onSubmit={onSearch} className="mb-8">
        <div className="flex gap-2 max-w-2xl">
          <input 
            value={q} 
            onChange={e => setQ(e.target.value)} 
            className="border border-gray-300 p-3 rounded-lg flex-1 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Mahsulot nomi, brend yoki kategoriya bo'yicha qidiring..." 
          />
          <button 
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-semibold transition-colors"
          >
            Qidirish
          </button>
        </div>
      </form>
      
      {status === 'loading' ? (
        <SkeletonComponent />
      ) : products.length > 0 ? (
        <div>
          <p className="text-gray-600 mb-4">"{q}" so'rovi bo'yicha {products.length} ta mahsulot topildi</p>
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      ) : q ? (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">🔍</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Hech narsa topilmadi</h3>
          <p className="text-gray-600">Boshqa kalit so'zlar bilan qayta urinib ko'ring</p>
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-gray-400 text-6xl mb-4">👋</div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Qidirishni boshlang</h3>
          <p className="text-gray-600">Qidirmoqchi bo'lgan mahsulot nomini, brendini yoki kategoriyasini kiriting</p>
        </div>
      )}
    </div>
  );
}

export default Search; // Faqat bitta export default