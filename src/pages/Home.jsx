import React, { useEffect } from "react";
import Hero from "../components/Hero";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../redux/productSlice";
import ProductCard from "../components/ProductCard";

export default function Home(){
  const dispatch = useDispatch();
  const { products, status } = useSelector(s => s.productSlice);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  return (
    <div>
      <Hero />
      <section className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {status === 'loading' ? <div>Loading...</div> : products.map(p => <ProductCard key={p.id} product={p} />)}
      </section>
    </div>
  )
}
