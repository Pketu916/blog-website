import React from "react";

const BlogTable = ({ blogs, onEdit, onDelete }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200 rounded-md shadow-sm">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="px-4 py-3 text-left">Image</th>
            <th className="px-4 py-3 text-left">Title</th>
            <th className="px-4 py-3 text-left">Tags</th>
            <th className="px-4 py-3 text-left">Date</th>
            <th className="px-4 py-3 text-left">Actions</th>
          </tr>
        </thead>
        <tbody>
          {blogs.length === 0 ? (
            <tr>
              <td colSpan="5" className="px-4 py-4 text-center text-gray-500">
                No blogs available.
              </td>
            </tr>
          ) : (
            blogs.map((blog) => (
              <tr key={blog._id} className="border-t border-gray-100">
                <td className="px-4 py-3">
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-16 h-10 object-cover rounded"
                  />
                </td>
                <td className="px-4 py-3">{blog.title}</td>
                <td className="px-4 py-3">
                  {Array.isArray(blog.tags)
                    ? blog.tags.join(", ")
                    : blog.tags || ""}
                </td>

                <td className="px-4 py-3">
                  {new Date(blog.date).toLocaleDateString()}
                </td>
                <td className="px-4 py-3 space-x-2">
                  <button
                    onClick={() => onEdit(blog)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => onDelete(blog._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default BlogTable;
