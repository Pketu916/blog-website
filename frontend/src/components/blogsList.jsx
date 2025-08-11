// BlogsList.jsx
import React, { useState } from "react";
import BlogCard from "./UI/BlogCard";
import BlogFilterSort from "./BlogFilterSort";

const BlogsList = ({ blogs }) => {
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  if (!blogs || blogs.length === 0) {
    return (
      <>
        <p className="text-center text-gray-500 mt-10">No blogs available.</p>
      </>
    );
  }

  return (
    <div>
      <BlogFilterSort blogs={blogs} onUpdate={setFilteredBlogs} />

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {filteredBlogs.length > 0 ? (
          filteredBlogs.map((blog) => <BlogCard key={blog._id} blog={blog} />)
        ) : (
          <p className="col-span-full text-center text-gray-500">
           Oops! No blogs available according to your filter.

          </p>
        )}
      </div>
    </div>
  );
};

export default BlogsList;
