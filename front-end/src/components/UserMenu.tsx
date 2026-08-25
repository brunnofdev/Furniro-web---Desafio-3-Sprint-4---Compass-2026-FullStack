import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import iconProfile from "@assets/iconProfile.svg"; 

export function UserMenu() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleUserClick = () => {
    if (user) {
      setIsOpen(!isOpen);
    } else {
      navigate("/login");
    }
  };

  const handleLogout = () => {
    logout(); 
    setIsOpen(false); 
    navigate("/login"); 
  };

  return (
    <div className="relative flex items-center" ref={menuRef}>
      <button onClick={handleUserClick} className="flex items-center justify-center">
        <img
          src={iconProfile}
          alt="Perfil"
          className="w-6 lg:w-auto cursor-pointer hover:opacity-75 transition-opacity"
        />
      </button>

      {isOpen && user && (
        <div className="absolute right-0 top-full mt-4 w-48 bg-white border border-gray-100 shadow-xl rounded-lg p-4 z-50">
          <p className="text-xs text-gray-400 mb-1 font-poppins">Logged in as:</p>
          <p className="font-semibold text-gray-800 mb-4 truncate font-poppins" title={user.name}>
            {user.name}
          </p>
          <hr className="mb-2 border-gray-100" />
          <button 
            onClick={handleLogout} 
            className="w-full text-left text-red-500 font-medium hover:text-red-700 transition font-poppins"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
}