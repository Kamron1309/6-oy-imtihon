import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductById } from "../redux/productSlice";
import { addToCartLocal } from "../redux/localCartSlice";
import { addToLike } from "../redux/like-Slice";

export default function ProductDetail(){
  const { id } = useParams();
  const dispatch = useDispatch();
  const { productDetail, status } = useSelector(s => s.productSlice);

  useEffect(() => { dispatch(fetchProductById(id)); }, [dispatch, id]);

  if (status === 'loading' || !productDetail) return <div>Loading...</div>;

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <img src={productDetail.thumbnail || productDetail.image} alt={productDetail.title || productDetail.name} className="w-full h-96 object-cover rounded" />
      <div>
        <h1 className="text-2xl font-bold">{productDetail.title || productDetail.name}</h1>
        <p className="mt-2 text-gray-700">{productDetail.description}</p>
        <div className="mt-4 font-semibold text-xl">${productDetail.price}</div>
        <div className="mt-4 flex gap-2">
          <button onClick={() => dispatch(addToCartLocal(productDetail))} className="px-4 py-2 bg-green-600 text-white rounded">Add to cart</button>
          <button onClick={() => dispatch(addToLike(productDetail))} className="px-3 py-2 border rounded">♥ Wishlist</button>
        </div>
      </div>
    </div>
  );
}
