import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ProductCard, Sidebar, SkeltonComponent } from "../components";
import { fetchProducts } from "../redux/productSlice";

export default function Shop(){
  const dispatch = useDispatch();
  const { products, status } = useSelector(s => s.productSlice);

  useEffect(() => { dispatch(fetchProducts()); }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="md:flex gap-6">
        <Sidebar />
        <div className="flex-1">
          <h2 className="text-2xl font-bold mb-6">Barcha mahsulotlar</h2>
          {status === 'loading' ? <SkeltonComponent /> : 
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map(p => <ProductCard key={p.id} product={p} />)}
            </div>
          }
        </div>
      </div>
    </div>
  )
}