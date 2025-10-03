import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";
import Sidebar from "../components/Sidebar";

export default function Shop(){
  const dispatch = useDispatch();
  const { products, status } = useSelector(s => s.productSlice);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  return (
    <div className="md:flex gap-6">
      <Sidebar />
      <div className="flex-1 grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {status === 'loading' ? <div>Loading...</div> : products.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
