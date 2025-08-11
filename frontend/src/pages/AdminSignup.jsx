import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { signupAdmin } from "../features/auth/adminSlice";
import { useNavigate } from "react-router-dom";

function AdminSignup() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error, admin } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({ username: "", password: "" });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupAdmin(formData));
  };

  // after user login or sign up 
useEffect(() => {
  if (admin) {
    navigate("/admin"); 
  }
}, [admin, navigate]);


  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4 text-center">Admin Signup</h2>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="username"
          placeholder="Username"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
          disabled={loading}
        >
          {loading ? "Signing up..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}

export default AdminSignup;
