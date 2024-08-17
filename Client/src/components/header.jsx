import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Logo from "../assets/img/Logo.png";
import { FaSignOutAlt } from "react-icons/fa";

export function Nav() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar
      fluid
      className="bg-gradient-to-r from-black via-[#007a3d] to-[#ce1126] text-white shadow-md sticky top-0 z-50 "
    >
      <Link to="/">
        <img src={Logo} alt="انتخاباتي" className="w-full h-20 object-cover" />
      </Link>
      <div className="flex md:order-2 space-x-4">
        {isAuthenticated ? (
          <Button
            onClick={handleLogout}
            className="bg-red-600 hover:bg-red-700 text-white p-2 rounded-full transition-colors duration-300 mr-32"
          >
            <FaSignOutAlt size={20} />
          </Button>
        ) : (
          <Button
            as={Link}
            to="/login-with-password"
            className="bg-green-600 hover:bg-green-700 text-white transition-colors duration-300 mr-32"
          >
            تسجيل الدخول
          </Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <div className="flex flex-col md:flex-row md:space-x-6 ">
          <Navbar.Link
            as={Link}
            to="/votinglist"
            className="text-white hover:text-gray-300 ml-5 transition-colors duration-300"
          >
            الانتخابات
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/Electionresult"
            className="text-white hover:text-gray-300 transition-colors duration-300"
          >
            نتائج الانتخابات
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/about"
            className="text-white hover:text-gray-300 transition-colors duration-300"
          >
            إعرف أكثر
          </Navbar.Link>
          <Navbar.Link
            as={Link}
            to="/contact"
            className="text-white hover:text-gray-300 transition-transform duration-200 hover:scale-105"
          >
            تواصل معنا
          </Navbar.Link>
        </div>
      </Navbar.Collapse>
    </Navbar>
  );
}
