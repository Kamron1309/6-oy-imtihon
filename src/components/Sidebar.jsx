import React from "react";
import { Link } from "react-router-dom";

export default function Sidebar(){
  const categories = ['smartphones','laptops','fragrances','skincare','groceries','home-decoration'];
  return (
    <aside className="w-full md:w-64">
      <div className="border rounded p-3 bg-white">
        <h4 className="font-semibold mb-2">Categories</h4>
        <ul className="flex flex-col gap-2">
          {categories.map(c => <li key={c}><Link to={`/category/${c}`}>{c}</Link></li>)}
        </ul>
      </div>
    </aside>
  )
}
