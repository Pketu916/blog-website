import React from "react";
import AdminHome from "../admin/adminHome";

const Admin = ({ blogs }) => {
  return (
    <div>
      <AdminHome blogs={blogs} />
    </div>
  );
};

export default Admin;
