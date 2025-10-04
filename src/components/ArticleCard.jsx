import React from "react";

const ArticleCard = ({ title, description, image }) => {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg p-4 transition-shadow">
      <img src={image} alt={title} className="w-full h-48 object-cover rounded mb-3" />
      <h3 className="font-semibold text-lg mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

export default ArticleCard;