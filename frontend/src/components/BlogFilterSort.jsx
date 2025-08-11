import React, { useState, useEffect } from "react";

const BlogFilterSort = ({ blogs, onUpdate }) => {
  const [search, setSearch] = useState("");
  const [selectedTag, setSelectedTag] = useState("All");
  const [sortBy, setSortBy] = useState("latest");

  const tags = ["All", ...new Set(blogs.flatMap(blog => blog.tags))];

  useEffect(() => {
    let filtered = [...blogs];

    // Search filter
    if (search.trim() !== "") {
      filtered = filtered.filter(blog =>
        blog.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Tag filter
    if (selectedTag !== "All") {
      filtered = filtered.filter(blog => blog.tags.includes(selectedTag));
    }

    // Sort
    if (sortBy === "latest") {
      filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    } else if (sortBy === "oldest") {
      filtered.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
    } else if (sortBy === "title") {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    // Update the filtered list
    onUpdate(filtered);
  }, [search, selectedTag, sortBy, blogs, onUpdate]);

  return (
    <div className="mb-6 flex flex-col md:flex-row md:items-center gap-4">
      {/* Search */}
      <input
        type="text"
        placeholder="Search by title..."
        value={search}
        onChange={e => setSearch(e.target.value)}
        className="border p-2 rounded-md w-full md:w-1/3"
      />

      {/* Filter by Tag */}
      <select
        value={selectedTag}
        onChange={e => setSelectedTag(e.target.value)}
        className="border p-2 rounded-md"
      >
        {tags.map(tag => (
          <option key={tag} value={tag}>
            {tag}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={sortBy}
        onChange={e => setSortBy(e.target.value)}
        className="border p-2 rounded-md"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
        <option value="title">Title A-Z</option>
      </select>
    </div>
  );
};

export default BlogFilterSort;
