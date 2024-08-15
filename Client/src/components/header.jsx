import { Button, Navbar } from "flowbite-react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Adjust the import based on your file structure
import Logo from "../assets/img/Logo.jpg.png";
export function Nav() {
  const { isAuthenticated, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  return (
    <Navbar fluid rounded className="bg-[#CDF0EA]">
      <Link to="/">
        <img src={Logo} alt="انتخاباتي" className="w-full h-20 object-cover" />
      </Link>
      <div className="flex md:order-2">
        {isAuthenticated ? (
          <Button
            onClick={handleLogout}
            className="bg-red-500 hover:!bg-red-700 text-white"
          >
            تسجيل خروج
          </Button>
        ) : (
          <Button as={Link} to="/login-with-password">
            تسجيل الدخول
          </Button>
        )}
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link as={Link} to="/" className="ml-8 text-black" href="#">
          الانتخابات
        </Navbar.Link>
        <Navbar.Link as={Link} to="/" className="text-black">
          نتائج الانتخابات
        </Navbar.Link>
        <Navbar.Link as={Link} to="/" className="text-black">
          إعرف أكثر
        </Navbar.Link>
        <Navbar.Link
          as={Link}
          to="/contact"
          className="transition-transform duration-200 hover:scale-105 text-l"
        >
          تواصل معنا
        </Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );
}
