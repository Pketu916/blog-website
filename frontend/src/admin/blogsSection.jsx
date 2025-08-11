import React, { useState } from "react";
import BlogFilterSort from "../components/BlogFilterSort";
import BlogTable from "./blogTable";

export const BlogsSection = ({ blogs, onDelete, onEdit }) => {
  const [filteredBlogs, setFilteredBlogs] = useState(blogs);

  return (
    <>
      <BlogFilterSort blogs={blogs} onUpdate={setFilteredBlogs} />
      <BlogTable
        blogs={filteredBlogs}
        onDelete={onDelete}
        onEdit={onEdit}
      />
    </>
  );
};

export default BlogsSection;
