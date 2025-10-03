import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import { fetchProducts } from "../redux/productSlice";

export default function Category(){
  const { name } = useParams();
  const dispatch = useDispatch();
  const { products, status } = useSelector(s => s.productSlice);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  const filtered = products.filter(p => p.category === name);

  return (
    <div>
      <h2 className="text-2xl mb-4">Category: {name}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {status === 'loading' ? <div>Loading...</div> : filtered.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </div>
  )
}
