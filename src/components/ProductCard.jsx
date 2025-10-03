import React from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToLike } from "../redux/likeSlice";
import { addToCartLocal } from "../redux/localCartSlice";

export default function ProductCard({ product }){
  const dispatch = useDispatch();
  return (
    <div className="border rounded p-3 shadow-sm flex flex-col">
      <Link to={`/product/${product.id}`} className="block mb-2">
        <img src={product.thumbnail || product.image} alt={product.title || product.name} className="w-full h-40 object-cover rounded" />
      </Link>
      <div className="flex-1">
        <h3 className="font-semibold">{product.title || product.name}</h3>
        <p className="text-sm text-gray-600">{product.brand || product.category}</p>
      </div>
      <div className="mt-2 flex items-center justify-between">
        <div className="font-bold">${product.price}</div>
        <div className="flex gap-2">
          <button onClick={() => dispatch(addToCartLocal(product))} className="px-3 py-1 bg-green-600 text-white rounded">Add</button>
          <button onClick={() => dispatch(addToLike(product))} className="px-2 py-1 border rounded">♥</button>
        </div>
      </div>
    </div>
  )
}
