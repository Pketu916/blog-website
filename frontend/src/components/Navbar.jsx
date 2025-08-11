import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logoutAdmin } from "../features/auth/adminSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adminState = useSelector((state) => state.admin );
    const { admin } = useSelector((state) => state.auth);

  const handleLogout = () => {
    localStorage.removeItem("admin");
    dispatch(logoutAdmin());
    navigate("/login");
  };

  return (
    <div className="bg-emerald-600">
      <div className="container">
        <nav className="flex justify-between items-center p-4  text-white">
          <h1 className="text-xl font-bold">Blogs</h1>
          <div className="space-x-4">
            <Link to="/" className="hover:underline">
              Home
            </Link>
            <Link to="/admin" className="hover:underline">
              Admin
            </Link>
            {!admin ? (
              <>
                <Link to="/login" className="hover:underline">
                  Login
                </Link>
                <Link to="/signup" className="hover:underline">
                  Sign Up
                </Link>
              </>
            ) : (
              <button onClick={handleLogout} className="hover:underline">
                Logout
              </button>
            )}
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
