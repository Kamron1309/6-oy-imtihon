import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCarts, fetchCartByUser } from "../redux/cartSlice";
import { removeFromCartLocal, changeQty } from "../redux/localCartSlice";

export default function Cart(){
  const dispatch = useDispatch();
  const { carts, userCarts, status } = useSelector(s => s.cartSlice);
  const localCart = useSelector(s => s.localCartSlice.data);

  useEffect(() => { dispatch(fetchCarts()); }, [dispatch]);

  return (
    <div>
      <h2 className="text-2xl mb-4">Carts from DummyJSON (all)</h2>
      {status === 'loading' ? <div>Loading...</div> : carts.map(c => (
        <div key={c.id} className="border rounded p-3 mb-3">
          <div className="font-semibold">Cart #{c.id} — User {c.userId}</div>
          <div>Total products: {c.totalProducts} — Quantity: {c.totalQuantity} — Total: ${c.total}</div>
          <ul className="mt-2">
            {c.products.map(p => <li key={p.id}>{p.title} — qty {p.quantity} — price ${p.price}</li>)}
          </ul>
        </div>
      ))}

      <h2 className="text-2xl mt-6 mb-4">Local Cart (your adds)</h2>
      {localCart.length === 0 ? <p>No items in local cart</p> : (
        <div className="space-y-3">
          {localCart.map(item => (
            <div key={item.id} className="flex items-center justify-between border p-3 rounded">
              <div>
                <div className="font-semibold">{item.title || item.name}</div>
                <div className="text-sm text-gray-600">${item.price}</div>
              </div>
              <div className="flex items-center gap-2">
                <input type="number" value={item.qty} min="1" onChange={(e) => dispatch(changeQty({ id: item.id, qty: Number(e.target.value)}))} className="w-16 border rounded p-1" />
                <button onClick={() => dispatch(removeFromCartLocal(item.id))} className="text-red-600">Remove</button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
