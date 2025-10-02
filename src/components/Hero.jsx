// src/components/Hero.jsx
import React from "react";
import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="bg-gradient-to-r from-blue-500 to-purple-600 text-white py-16 mb-8">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          ZON.UZ Do'kon — DummyJSON Demo
        </h1>
        <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
          DummyJSON API va MockAPI integratsiyasi bilan zamonaviy e-commerse platformasi. Market va Buyurtma tizimlari bilan.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            to="/shop"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors shadow-lg"
          >
            Xarid Qilishni Boshlash
          </Link>
          <Link
            to="/search"
            className="border border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors"
          >
            Mahsulotlarni Qidirish
          </Link>
        </div>
      </div>
    </section>
  );
}