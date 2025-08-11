import React, { useEffect, useState } from "react";
import BlogTable from "./blogTable";
import Modal from "../components/UI/Modal";
import { createBlog, deleteBlog, updateBlog } from "../http";
import BlogForm from "./blogForm";
import BlogsSection from "./blogsSection";

const AdminHome = ({ blogs }) => {
  const [blogsData, setBlogsData] = useState(blogs);
  const [showConfirmModal, setshowConfirmModal] = useState(false);
  const [showAddBlogModal, setShowAddBlogModal] = useState(false);
  const [deleteBlogId, setDeleteBlogId] = useState(null);
  const [formIntialData, setFormIntialData] = useState({
    title: "",
    content: "",
    tags: "",
    image: "",
  });

  useEffect(() => {
    setBlogsData(blogs);
  }, [blogs]);

  const handleConfirm = (id) => {
    setshowConfirmModal(true);
    setDeleteBlogId(id);
  };

  const onDelete = () => {
    setshowConfirmModal(false);
    setDeleteBlogId(null);
    deleteBlog(deleteBlogId);
    setBlogsData(blogsData.filter((blog) => blog._id !== deleteBlogId));
  };

  const handleCancle = () => {
    setshowConfirmModal(false);
    setDeleteBlogId(null);
  };

  const handleSubmitForm = async (formData) => {
    try {
      if (formData._id) {
        const updatedBlog = await updateBlog(formData);
        if (updatedBlog) {
          setBlogsData((prev) =>
            prev.map((blog) => (blog._id === formData._id ? updatedBlog : blog))
          );
        }
      } else {
        const newBlog = await createBlog(formData);
        if (newBlog) {
          setBlogsData((prev) => [newBlog, ...prev]);
        }
      }
      setFormIntialData({
        title: "",
        content: "",
        tags: "",
        image: "",
      });
      setShowAddBlogModal(false);
    } catch (error) {
      console.error("Failed to submit blog:", error);
    }
  };

  const handleEdit = (blog) => {
    setShowAddBlogModal(true);
    setFormIntialData(blog);
  };

  return (
    <div className="container">
      <div className="mx-3 my-6 flex justify-end">
        <button
          onClick={() => setShowAddBlogModal(true)}
          className="text-xl bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded"
        >
          +add blog
        </button>
      </div>
      <BlogsSection
        blogs={blogsData}
        onDelete={handleConfirm}
        onEdit={handleEdit}
      />
      {/* <BlogTable
        blogs={blogsData}
        onDelete={handleConfirm}
        onEdit={handleEdit}
      /> */}
      <Modal
        isOpen={showConfirmModal}
        onClose={() => setshowConfirmModal(false)}
        title="Are you sure you want to delete Blog?"
      >
        <div className="flex gap-2 w-full justify-end">
          <button
            onClick={handleCancle}
            className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-sm"
          >
            cancel
          </button>
          <button
            onClick={onDelete}
            className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-sm"
          >
            Delete
          </button>
        </div>
      </Modal>

      <Modal
        isOpen={showAddBlogModal}
        onClose={() => setShowAddBlogModal(false)}
        title="Add New Blog"
      >
        <BlogForm
          handleSubmitForm={handleSubmitForm}
          intialData={formIntialData}
        />
      </Modal>
    </div>
  );
};

export default AdminHome;
