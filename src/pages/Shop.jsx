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


// import React from "react";
// import { useDispatch } from "react-redux";
// import { incrementQuantity, decrementQuantity, removeItem } from "../../redux/cartSlice";
// import { addToLike, removeFromLike } from "../../redux/like-slice";
// import toast from "react-hot-toast";
// import { Link } from "react-router-dom";

// const ShopCard = (props) => {
//   const { id, thumbnail, title, price, userPrice, count, brand } = props;
//   const dispatch = useDispatch();

//   const handleIncrement = () => {
//     dispatch(incrementQuantity(id));
//     toast.success("Quantity increased");
//   };

//   const handleDecrement = () => {
//     if (count > 1) {
//       dispatch(decrementQuantity(id));
//       toast.success("Quantity decreased");
//     }
//   };

//   const handleRemove = () => {
//     dispatch(removeItem(id));
//     toast.success("Product removed from cart");
//   };

//   const handleToggleLike = () => {
//     // Like funksiyasini qo'shish
//     dispatch(addToLike(props));
//     toast.success("Added to wishlist");
//   };

//   return (
//     <div className="bg-white rounded-xl border border-gray-200 p-6 shadow-sm hover:shadow-md transition-shadow">
//       <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
//         {/* Product Image and Info */}
//         <div className="flex items-start gap-4 flex-1">
//           <Link to={`/product/${id}`} className="shrink-0">
//             <img
//               className="h-24 w-24 object-cover rounded-lg border border-gray-200"
//               src={thumbnail}
//               alt={title}
//             />
//           </Link>
          
//           <div className="flex-1 min-w-0">
//             <Link to={`/product/${id}`}>
//               <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 line-clamp-2 mb-1">
//                 {title}
//               </h3>
//             </Link>
//             {brand && (
//               <p className="text-sm text-gray-500 mb-2">Brand: {brand}</p>
//             )}
//             <p className="text-lg font-bold text-green-600">${price} each</p>
//           </div>
//         </div>

//         {/* Quantity Controls */}
//         <div className="flex items-center justify-between md:justify-end gap-6">
//           <div className="flex items-center gap-3">
//             <button
//               type="button"
//               onClick={handleDecrement}
//               disabled={count <= 1}
//               className={`flex items-center justify-center w-10 h-10 rounded-full border transition-all ${
//                 count <= 1 
//                   ? "border-gray-300 text-gray-400 cursor-not-allowed" 
//                   : "border-blue-600 text-blue-600 hover:bg-blue-50"
//               }`}
//             >
//               <span className="text-xl font-bold">−</span>
//             </button>
            
//             <span className="text-xl font-semibold text-gray-900 min-w-8 text-center">
//               {count}
//             </span>
            
//             <button
//               type="button"
//               onClick={handleIncrement}
//               className="flex items-center justify-center w-10 h-10 rounded-full border border-blue-600 text-blue-600 hover:bg-blue-50 transition-all"
//             >
//               <span className="text-xl font-bold">+</span>
//             </button>
//           </div>

//           {/* Price and Actions */}
//           <div className="flex flex-col items-end gap-3">
//             <div className="text-right">
//               <p className="text-2xl font-bold text-green-600">
//                 ${userPrice}
//               </p>
//               <p className="text-sm text-gray-500">Total</p>
//             </div>
            
//             <div className="flex items-center gap-3">
//               <button
//                 onClick={handleToggleLike}
//                 className="text-gray-500 hover:text-red-500 transition-colors p-2"
//                 title="Add to wishlist"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
//                 </svg>
//               </button>
              
//               <button
//                 onClick={handleRemove}
//                 className="text-gray-500 hover:text-red-500 transition-colors p-2"
//                 title="Remove from cart"
//               >
//                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                   <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
//                 </svg>
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Shop;