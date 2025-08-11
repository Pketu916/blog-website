// BlogCard.jsx
import React from "react";

  const BlogCard = ({ blog }) => {
    const { title, content, tags, image, date } = blog;

    return (
      <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
        <img src={image} alt={title} className="w-full h-60 object-cover" />
        <div className="p-6">
          <h2 className="text-2xl font-bold mb-2">{title}</h2>
          <p className="text-gray-500 text-sm mb-4">{new Date(date).toLocaleDateString()}</p>
          <p className="text-gray-700 mb-4">
            {content.substring(0, 150)}...
          </p>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    );
  };

  export default BlogCard;
