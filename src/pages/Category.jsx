import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ProductCard from "../components/ProductCard";
import SkeltonComponent from "../components/SkeltonComponent";
import { fetchProductsByCategory } from "../redux/productSlice";

export default function Category(){
  const { name } = useParams();
  const dispatch = useDispatch();
  const { products, status } = useSelector(s => s.productSlice);

  useEffect(() => { 
    if (name) {
      dispatch(fetchProductsByCategory(name));
    }
  }, [dispatch, name]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6 capitalize">Kategoriya: {name?.replace('-', ' ')}</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {status === 'loading' ? <SkeltonComponent /> : 
         products.length > 0 ? products.map(p => <ProductCard key={p.id} product={p} />) :
         <p className="text-gray-600 col-span-full text-center py-8">Ushbu kategoriyada mahsulot topilmadi</p>
        }
      </div>
    </div>
  )
}