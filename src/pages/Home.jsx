import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Hero from "../components/Hero";
import ProductCard from "../components/ProductCard";
import SkeletonComponent from "../components/SkeletonComponent";
import { fetchProducts } from "../redux/productSlice";

function Home() {
  const dispatch = useDispatch();
  const { products, status } = useSelector(s => s.productSlice);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  return (
    <div>
      <Hero />
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Tavsiya etilgan mahsulotlar</h2>
        {status === 'loading' ? <SkeletonComponent /> : 
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.slice(0, 12).map(p => <ProductCard key={p.id} product={p} />)}
          </div>
        }
      </section>
    </div>
  );
}

export default Home; // Faqat bitta export default