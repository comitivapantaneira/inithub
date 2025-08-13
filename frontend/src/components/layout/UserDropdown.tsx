import { useEffect, useState, useRef } from "react";
import { ChevronDown, User, Settings, LogOut } from "lucide-react";

const UserDropdown = () => {
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
      setUserDropdownOpen(false);
    }
  };

  useEffect(() => {
    if (userDropdownOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userDropdownOpen]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button 
        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
        className="flex items-center space-x-2 p-1 rounded-lg hover:bg-gray-100 transition-colors"
      >
        <div className="w-8 h-8 bg-gray-500 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">JD</span>
        </div>
        <ChevronDown
          className={`w-4 h-4 text-gray-500 transition-transform duration-200 ${
            userDropdownOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      {userDropdownOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg border border-gray-200 py-1 z-50">
          <div className="px-4 py-3 border-b border-gray-100">
            <p className="text-sm font-medium text-gray-900">John Doe</p>
            <p className="text-sm text-gray-500">john.doe@company.com</p>
            <p className="text-xs text-gray-400">Product Manager</p>
          </div>

          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
            <User className="w-4 h-4" />
            <span>Profile</span>
          </button>

          <button className="w-full px-4 py-2 text-left text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2">
            <Settings className="w-4 h-4" />
            <span>Configurar Organização</span>
          </button>

          <div className="border-t border-gray-100 mt-1 pt-1">
            <button className="w-full px-4 py-2 text-left text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2">
              <LogOut className="w-4 h-4" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDropdown;
