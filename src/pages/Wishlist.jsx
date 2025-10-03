import React from "react";
import { useSelector, useDispatch } from "react-redux";
import ProductCard from "../components/ProductCard";
import { removeFromLike } from "../redux/like-Slice";

export default function Wishlist(){
  const { data } = useSelector(s => s.likeSlice);
  const dispatch = useDispatch();

  return (
    <div>
      <h2 className="text-2xl mb-4">Wishlist</h2>
      {data.length === 0 ? <p>No wishlist items</p> : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {data.map(p => (
            <div key={p.id} className="border rounded p-3">
              <ProductCard product={p} />
              <button onClick={() => dispatch(removeFromLike(p.id))} className="mt-2 text-red-600">Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
