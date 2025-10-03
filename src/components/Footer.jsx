import React from "react";

export default function Footer(){
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container py-6 text-center">
        © {new Date().getFullYear()} ZON.UZ — Demo project
      </div>
    </footer>
  )
}
