import React, { useEffect, useState } from "react";
import { createBlog } from "../http";

const BlogForm = ({ handleSubmitForm, intialData }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    tags: "",
    image: "",
  });

  useEffect(() => {
    setFormData(intialData);
  }, [intialData]);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const blogData = {
      ...formData,
      tags: Array.isArray(formData.tags)
        ? formData.tags.map((tag) => tag.trim()) // already an array (edit case)
        : formData.tags.split(",").map((tag) => tag.trim()), // string (new blog case)
      date: new Date().toISOString(),
    };

    handleSubmitForm(blogData);

    setFormData({ title: "", content: "", tags: "", image: "" });
    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white  rounded-md   max-w-2xl mx-auto"
    >
      {/* <h2 className="text-xl font-semibold">Add New Blog</h2> */}

      <div>
        <label className="block font-medium">Title</label>
        <input
          name="title"
          type="text"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Content</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          rows="3"
          required
        />
      </div>

      <div>
        <label className="block font-medium">Tags (comma separated)</label>
        <input
          name="tags"
          type="text"
          value={formData.tags}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label className="block font-medium">Image URL</label>
        <input
          name="image"
          type="text"
          value={formData.image}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 mt-3 rounded-md"
        >
          {intialData._id ? "Update" : "Add Blog"}
        </button>
      </div>
    </form>
  );
};

export default BlogForm;
