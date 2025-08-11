import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { useEffect, useState } from "react";
import "./App.css";
import Home from "./pages/home";
import Admin from "./pages/admin";
import { fetchBlogs } from "./http";
import AdminLogin from "./pages/AdminLogin";
import AdminSignup from "./pages/AdminSignup";
import Navbar from "./components/Navbar"; 
import { useSelector } from "react-redux"; 

const App = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchBlogs();
      setBlogs(data);
    };
    fetchData();
  }, []);

  return (
    <Router>
      <AppWithNavbar blogs={blogs} />
    </Router>
  );
};

const AppWithNavbar = ({ blogs }) => {

  const location = useLocation();
  const { admin } = useSelector((state) => state.auth);

  const hideNavbar = ["/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNavbar && <Navbar />}
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route path="/signup" element={<AdminSignup />} />
        <Route path="/" element={<Home blogs={blogs} />} />
        <Route
          path="/admin"
          element={admin ? <Admin blogs={blogs} /> : <AdminLogin />} // ⬅️ Protect this route
        />
      </Routes>
    </>
  );
};

export default App;
