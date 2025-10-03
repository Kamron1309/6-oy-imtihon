import React from "react";

const ArticleCard = ({ title, description, image }) => {
  return (
    <div className="border rounded-lg shadow hover:shadow-lg p-4">
      <img src={image} alt={title} className="rounded mb-2" />
      <h3 className="font-semibold">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default ArticleCard;
