import React from "react";

export default function Footer(){
  return (
    <footer className="bg-gray-900 text-white mt-12">
      <div className="max-w-7xl mx-auto py-6 text-center">
        <div className="text-xl font-bold mb-2">ZON.UZ</div>
        <p className="text-gray-400">© {new Date().getFullYear()} ZON.UZ — Demo project using MockAPI</p>
        <p className="text-gray-500 text-sm mt-2">All data from MockAPI endpoints</p>
      </div>
    </footer>
  )
}