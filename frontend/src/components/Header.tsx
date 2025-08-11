import type { NavLink } from "@/types/types";
import { Link, useLocation, useNavigate } from "react-router-dom";
import UserDropdown from "./UserDropdown";

const navLinks: NavLink[] = [
    { label: "Home", path: "/home" },
    { label: "Minhas Iniciativas", path: "/my-initiatives" },
    { label: "Notícias", path: "/news" },
    { label: "Triagem", path: "/screening" }
];

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate();

    const goToCreateIniciative = () => {
        navigate("/create-initiative");
    }
  
    return (
        <header className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-20">
            <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
                <div className="flex items-center ">
                    <img src="/images/logo-inithub.svg" alt="Innovation Hub Logo" className="h-10" />
                </div>
  
                <nav className="flex space-x-6">
                    {navLinks.map((link) => {
                        const isActive = location.pathname === link.path;
                        return (
                        <Link
                            key={link.path}
                            to={link.path}
                            className={`text-gray-600 text-sm font-medium hover:text-gray-900 transition-colors duration-200
                            ${isActive ? "font-bold text-gray-800" : ""}
                            `}
                        >
                            {link.label}
                        </Link>
                        );
                    })}
                </nav>

                
                <div className="flex items-center space-x-3">
                    <button
                        className="text-white text-sm px-6 py-3 rounded-lg font-medium flex items-center space-x-2 shadow-sm bg-green-600 hover:bg-green-700 transition-colors duration-200"
                        onClick={goToCreateIniciative}
                    >
                        + Nova Iniciativa
                    </button>
                    
                    <UserDropdown />
                </div>
            </div>
      </header>
    );
};

export default Header;
