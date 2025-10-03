import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { searchProducts } from "../redux/productSlice";

export default function Search(){
  const [q, setQ] = useState('');
  const dispatch = useDispatch();
  const { products, status } = useSelector(s => s.productSlice);

  const onSearch = (e) => {
    e.preventDefault();
    if(!q) return;
    dispatch(searchProducts(q));
  }

  return (
    <div>
      <h2 className="text-2xl mb-4">Search</h2>
      <form onSubmit={onSearch} className="mb-4 flex gap-2">
        <input value={q} onChange={e => setQ(e.target.value)} className="border p-2 rounded flex-1" placeholder="Search products..." />
        <button className="px-4 py-2 bg-indigo-600 text-white rounded">Search</button>
      </form>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {status === 'loading' ? <div>Loading...</div> : products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
